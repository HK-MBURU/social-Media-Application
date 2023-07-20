const mssql = require("mssql");
const bcrypt = require("bcrypt");
const { newUserValidator } = require("../validataors/newUserValidator");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
const {app}=require("../server")

async function signUp(req, res) {

  const user = req.body;

  let registrationDate = new Date();

  try {
    let { value } = newUserValidator(user);

    let hashedPwd = await bcrypt.hash(user.password, 8);

    let pool=req.pool

    const token = crypto
      .randomBytes(48)
      .toString("base64")
      .replace(/\//g, "_")
      .replace(/\+/g, "-");
    const expires = Date.now() + 3600000;

    if (pool.connected) {
      const results = await pool
        .request()
        .input("fullNames", value.fullNames)
        .input("userName", value.userName)
        .input("email", value.email)
        .input("hashedPwd", hashedPwd)
        .input("phoneNumber", value.phoneNumber)
        .input("imgUrl", value.imgUrl)
        .input("bio", value.bio)
        .input("location", value.location)
        .input("registrationDate", registrationDate)
        .input("token", token)
        .input("expires", expires)
        .execute("users.InsertUserData");

      const rowsAffected = results.rowsAffected[0];

      // send email
      req.session.authorize=true
      let phoneNumber=value.phoneNumber
      req.session.user= phoneNumber
      await sendMail(value.email, token);

      res.json({
        success: true,
        message: "A verification email has been sent toyour email address",
      });
    } else {
      res.status(500).send("Internal server error not connecting to db");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function changePassword(req, res) {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const {pool}=app.locals.pool

    if (pool.connected) {
      const request=pool.request()
      request.input("userId",mssql.Int,userId)
      const result = await request.query("[dbo].[GetUserPasswordById] @userId=@userId");

      const user = result.recordset[0];

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      // Compare the provided current password with the stored hashed password
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.hashedPwd
      );

      if (!passwordMatch) {
        res.status(401).json({
          success: false,
          message: "Current password is incorrect",
        });
        return;
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 8);

      // Update the user's password in the database
      const updateRequest=sql.request()
      updateRequest.input("userId", mssql.Int, userId)
      updateRequest.input("newPassword", mssql.VarChar(255), hashedNewPassword)
      await updateRequest.query("EXEC [dbo].[ChangePassword] @userId=@userId, @newPassword=@newPassword" );

      res.json({
        success: true,
        message: "Password changed successfully",
      });
    } else {
      res.status(500).send("Internal server error");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

module.exports = { signUp, changePassword };
