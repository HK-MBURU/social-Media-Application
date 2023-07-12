const express=require('express')
const getUserProfileRoute=express.Router()
const {getUserProfile} =require ('../controllers/getUserProfileController')

getUserProfileRoute.get('/profile',getUserProfile)
module.exports=getUserProfileRoute