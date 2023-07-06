const {createTransport}=require('nodemailer')
const emailConfig = require('../config/emailConfig')

const messageOptions={
    to:"haronkiarii@gmail.com",
    from:process.env.EMAIL_USER,
    subject:"Signup Succesful to our Social media application",
    text:"Welcome to HK Social media application where everything is possible with my technology.",
}
const transporter=createTransport(emailConfig)

async function sendMail(){
    try {
        let results=await transporter.sendMail(messageOptions)
        console.log(results);       
    } catch (error) {
        console.log(error);
    }
}
module.exports=sendMail