const mssql = require("mssql");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const { newUserValidator } = require("../validataors/newUserValidator");
const sendMail=require('../utils/sendMail')
const crypto=require('crypto')

async function signUp(req, res) {
 
  const user=req.body
  
 
  let registrationDate=new Date();

  try {
    let {value}=newUserValidator(user)

    let hashedPwd = await bcrypt.hash(user.password, 8);
    
    let sql = await mssql.connect(config);

    // generate token
    const token=crypto.randomBytes(48).toString('base64').replace(/\//g,'_').replace(/\+/g,'-')
    const expires=Date.now()+3600000

    if (sql.connected) {
      const results =await sql
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
        .input("token",token)
        .input("expires",expires)
        .execute("users.InsertUserData");
        
        // send email
        await sendMail(value.email,token)
      
        res.json({
        success: true,
        message: "A verification email has been sent toyour email address",
      });
    } else {
      res.status(500).send("Internal server error");
    }
  } catch (err) {
        res.status(500).send(err.message);
  }
}

module.exports = { signUp };
