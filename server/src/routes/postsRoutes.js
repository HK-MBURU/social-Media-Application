const express=require('express')
const getPostsRouter=express.Router()
const likePostRouter=express.Router()
const commentPostRouter=express.Router()
const replyCommentRouter=express.Router()

const{getPosts,likePost,commentPost,replyComment}=require('../controllers/postsController1')

getPostsRouter.post('/getPosts',getPosts)
likePostRouter.get('/like',likePost)
commentPostRouter.post('/comment',commentPost)
replyCommentRouter.post('reply',replyComment)

module.exports={getPostsRouter,likePostRouter,commentPostRouter,replyCommentRouter}