const express=require('express')
const loginRouter=express.Router()
const{ login, logout }=require('../controllers/loginController')

loginRouter.post('/login',login)
loginRouter.post('/logout',logout)


module.exports=loginRouter