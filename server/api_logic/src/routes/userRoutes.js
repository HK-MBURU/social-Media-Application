const express=require('express')
const user=express.Router()
const{deleteAccount,follow, unfollow, getFollowing, searchUser,getUserByUsername,getAllUsers}=require('../controllers/controllers/userController')
const{getNotifications}=require('../controllers/controllers/notificationController')
user.delete('/delete',deleteAccount)
user.post('/follow',follow)
user.post('/unfollow',unfollow)
user.post('/followers',getFollowing)
user.get('/searchUser',searchUser)
user.get('/getUser/:userName',getUserByUsername)
user.get('/getNotifications',getNotifications)
user.get('/getAll',getAllUsers)

module.exports=user