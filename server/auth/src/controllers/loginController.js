const session=require('express-session')
const getUser = require("../utils/getUser");
const express=require("express")
const bcrypt=require("bcrypt")

const app=express()
app.use(express.json())
const oneDay=60*60*1000*24

app.use(
  session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  genid:()=>v4(),
  cookie:{
    httpOnly:true,
    // secure:true
    maxAge:oneDay,
  },
}))

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
          req.session.authorized=true;
          
          req.session.user=phoneNumber
          res.json({ success: true, message: "Logged in succesfully"});
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
const logout=(req,res)=>{
  try {
    req.session.destroy()
  res.json({
    status:"logut succesfully"
  })
  } catch (error) {
    console.log(error);
  }
}
module.exports = { login ,logout};
