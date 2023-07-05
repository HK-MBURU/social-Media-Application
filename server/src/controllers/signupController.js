const mssql = require("mssql");
const config = require("../config/config");
const bcrypt = require("bcrypt");

async function signUp(req, res) {
  const {
    fullNames,
    userName,
    email,
    password,
    phoneNumber,
    imgUrl,
    bio,
    location,
    confirmPassword,
  } = req.body;

  if (
    !fullNames ||
    !userName ||
    !email ||
    !password ||
    !phoneNumber ||
    !imgUrl ||
    !bio ||
    !location ||
    !confirmPassword
  ) {
    return res.status(400).json({ message: "All fields should be filled" });
  }
  let hashedPwd = await bcrypt.hash(password, 8);
  let registrationDate=new Date();

  try {
    let hashedPwd = await bcrypt.hash(password, 8);
    
    let sql = await mssql.connect(config);

    if (sql.connected) {
      const results = sql
        .request()
        .input("fullNames", fullNames)
        .input("userName", userName)
        .input("email", email)
        .input("hashedPwd", hashedPwd)
        .input("phoneNumber", phoneNumber)
        .input("imgUrl", imgUrl)
        .input("bio", bio)
        .input("location", location)
        .input("registrationDate", registrationDate)
        .execute("users.InsertUserData");
      

      res.json({
        success: true,
        message: "User Registered succesfully proceed to login",
      });
    } else {
      res.status(500).send("Internal server error");
    }
  } catch (err) {
    console.error(err);

    res.status(500).send("Internal server error");
  }
}

module.exports = { signUp };
