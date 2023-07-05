const mssql = require("mssql");
const config = require("../config/config");
const bcrypt = require("bcrypt");

async function login(req, res) {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  //   console.log(res.json({ phone: phoneNumber }));

  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let results = await sql
        .request()
        .input("phoneNumber", phoneNumber)
        .execute("users.getUserByPhone");

      let user = results.recordset[0];

      if (user) {
        let passwordMatch = await bcrypt.compare(password, user.hashedPwd);
        // console.log(passwordMatch);

        passwordMatch
          ? res.json({ success: true, message: "Logged in succesfully" })
          : res.status(401).json({
              success: false,
              message: "wrong password",
            });
      } else {
        res.status(404);
        res.json({
          success: false,
          message:
            "User with the given phone number does not exist please sign up",
        });
      }
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } catch (error) {
    console.error(error)
  }
}
module.exports = { login };
