const sendMail = require('../utils/sendMail')

const sendMailRoute=require('express').Router()

sendMailRoute.post('/email',(req,res)=>{
    sendMail()
    res.send("Emailsent please check the console")
})
module.exports=sendMailRoute