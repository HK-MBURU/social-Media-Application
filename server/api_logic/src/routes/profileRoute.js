const express=require('express')
const profile=express.Router()
const {updateProfile}=require('../controllers/controllers/updateProfileController')
const {getUserProfile} =require ('../controllers/controllers/getUserProfileController')

profile.put('/updateProfile',updateProfile)
profile.get('/profile',getUserProfile)

module.exports=profile
