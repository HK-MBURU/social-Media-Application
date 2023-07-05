const express=require('express')
const loginRouter=express.Router()
const{ login }=require('../controllers/loginController')

loginRouter.post('/login',login)

module.exports=loginRouter