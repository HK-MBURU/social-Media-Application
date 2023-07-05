const express=require('express')
const getPostsRouter=express.Router()
const{getPosts}=require('../controllers/postsController')

getPostsRouter.post('/getPosts',getPosts)

module.exports=getPostsRouter