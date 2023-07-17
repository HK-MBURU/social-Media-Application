const express=require('express')
const user=express.Router()
const{deleteAccount,follow, unfollow, getFollowing, searchUserByUsername}=require('../controllers/controllers/userController')

user.delete('/delete',deleteAccount)
user.post('/follow',follow)
user.post('/unfollow',unfollow)
user.post('/followers',getFollowing)
user.get('/searchUser/:userName',searchUserByUsername)

module.exports=user