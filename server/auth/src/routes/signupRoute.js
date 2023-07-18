const express=require('express')
const signUpRouter=express.Router()
const {signUp, changePassword}=require('../controllers/signupController')

signUpRouter.post('/signup',signUp)
signUpRouter.post('/changepwd',changePassword)


module.exports=signUpRouter