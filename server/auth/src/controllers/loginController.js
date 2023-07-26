const session = require("express-session");
const getUser = require("../utils/getUser");
const express = require("express");
const bcrypt = require("bcrypt");
// const { config } = require('dotenv');
const mssql = require("mssql");
const config = require("../config/config");

const app = express();
app.use(express.json());
const oneDay = 60 * 60 * 1000 * 24;

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    genid: () => v4(),
    cookie: {
      httpOnly: true,
      // secure:true
      maxAge: oneDay,
    },
  })
);

async function login(req, res) {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    let user = await getUser(phoneNumber);

    if (user) {
      let passwordMatch = await bcrypt.compare(password, user.hashedPwd);
      if (passwordMatch) {
        // console.log(req.session);
        req.session.authorized = true;

        req.session.user = phoneNumber;
        console.log(req.session.user);

        res.json({ success: true, message: "Logged in succesfully" });
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
}
const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.json({
      status: "logut succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};
const checkUserProfile = async (req, res) => {
  let phoneNumber = req.session.user;

  try {
    let sql = await mssql.connect(config);

    if (sql.connected) {
      // let p_status
      console.log("thisis the phone ", phoneNumber);

      const result = sql.request()
      .input("p_phoneNumber", mssql.VarChar(50), phoneNumber)
      .output("p_status", mssql.VarChar(20))
      .execute("CheckUserProfile")
      
      res.send((await result).output);
    } else {
      res.status(500).send("Internal server error not connecting to db");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = { login, logout, checkUserProfile };
