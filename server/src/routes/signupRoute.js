const express=require('express')
const signUpRouter=express.Router()
const {signUp}=require('../controllers/signupController')

signUpRouter.post('/signup',signUp)

module.exports=signUpRouter