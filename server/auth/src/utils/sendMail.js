const { createTransport } = require("nodemailer");
const emailConfig = require("../config/emailConfig");

const messageOptions = (email,token)=>({
  to: email,
  from: process.env.EMAIL_USER,
  subject: "Verify your email address to complete your registration",
  text: `Welcome to HK Social media application where everything is possible with my technology.
  To activate your account, please click on this link:htt://localhost:4040/verify/${token}`,
  html:`<p>Welcome to HK Social Mediaapplication where everthing is possible with tecnology. </p>
  <p></p>to activate your account, please click on this link: </p>
  <a
  href="http://localhost:4040/verify/${token}">http://localhost:4040/verify/${token}</a>`
})
const transporter = createTransport(emailConfig);

async function sendMail(email,token) {
  try {
    let results = await transporter.sendMail(messageOptions(email,token));
    console.log(results);
  } catch (error) {
    console.log(error);
  }
}
module.exports = sendMail;
