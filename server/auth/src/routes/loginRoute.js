const express=require('express')
const loginRouter=express.Router()
const{ login, logout,checkUserProfile }=require('../controllers/loginController')

loginRouter.post('/login',login)
loginRouter.post('/logout',logout)
loginRouter.get('/checkDetails',checkUserProfile)


module.exports=loginRouter