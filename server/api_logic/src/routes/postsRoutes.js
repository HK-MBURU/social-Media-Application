const express=require('express')
const postRouter=express.Router()
// const authMiddleware=require('../middlewares/authMiddleware')



const{getPosts,likePost,commentPost,replyComment}=require('../controllers/controllers/postsController1')

postRouter.post('/getPosts',getPosts)
postRouter.post('/like',likePost)
postRouter.post('/comment',commentPost)
postRouter.post('/reply',replyComment)

module.exports=postRouter