require("dotenv").config()

const emailConfig={
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PWD
    }
}
module.exports=emailConfig