const express=require('express')
const updateProfileRoute=express.Router()
const {updateProfile}=require('../controllers/updateProfileController')

updateProfileRoute.put('/updateProfile',updateProfile)

module.exports=updateProfileRoute