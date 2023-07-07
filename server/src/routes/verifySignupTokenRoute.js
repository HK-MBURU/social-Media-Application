const express=require('express')
const verifySignupTokenRouter=express.Router()
const { verifySignUpToken } = require("../utils/tokens");


verifySignupTokenRouter.get("/verify/:token",verifySignUpToken,(req,res)=>{
    res.send("Verification succesful welcome to ur application")
})
module.exports=verifySignupTokenRouter
