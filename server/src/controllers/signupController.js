const mssql = require("mssql");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const { newUserValidator } = require("../validataors/newUserValidator");

async function signUp(req, res) {
 
  const user=req.body
  
 
  let registrationDate=new Date();

  try {
    let {value}=newUserValidator(user)

    let hashedPwd = await bcrypt.hash(user.password, 8);
    
    let sql = await mssql.connect(config);

    if (sql.connected) {
      const results = sql
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
        .execute("users.InsertUserData");
      

      
        res.json({
        success: true,
        message: "User Registered succesfully proceed to login",
      });
    } else {
      res.status(500).send("Internal server error");
    }
  } catch (err) {
        res.status(500).send(err.message);
  }
}

module.exports = { signUp };
