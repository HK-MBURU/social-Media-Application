const mssql = require("mssql");
const config = require("../config/config");
const bcrypt = require("bcrypt");

const getUser = require("../utils/getUser");
const { tokenGenerator, tokenVerifier } = require("../utils/tokens");

async function login(req, res) {
  let token = req.headers["authorization"].split(" ")[1];
  let user = await tokenVerifier(token);

  if (user.roles==="user") {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
      let user = await getUser(phoneNumber);

      if (user) {
        let passwordMatch = await bcrypt.compare(password, user.hashedPwd);
        if (passwordMatch) {
          let token = await tokenGenerator({
            phoneNumber: user.phoneNumber,
            roles: "user",
          });

          res.json({ success: true, message: "Logged in succesfully", token });
        } else {
          res.status(401).json({ success: false, message: "wrong password" });
        }
      } else {
        res.status(404).json({
          success: false,
          message:
            "User with the given phone number does not exist please sign up",
        });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
  }
}
module.exports = { login };
