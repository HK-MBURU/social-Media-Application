const express=require('express')
require('dotenv').config()
const crypto=require('crypto')


const app=express()
app.use(express.json())

const signUpRouter=require('./src/routes/signupRoute')
const loginRouter=require('./src/routes/loginRoute')
const {getPostsRouter,likePostRouter,commentPostRouter,replyCommentRouter}=require('./src/routes/postsRoutes')
const sendMailRoute = require('./src/routes/sendMailRoute')
const verifySignupTokenRouter=require('./src/routes/verifySignupTokenRoute')
const getUserProfileRoute=require('./src/routes/getUserProfileRoute')
const updateProfileRoute=require('./src/routes/updateUserProfileRoute')

app.get('/',(req,res)=>{
    res.send("Hello welcome to my fantastic social media application")
})
app.use(signUpRouter)
app.use(loginRouter)
app.use(getPostsRouter)
app.use(sendMailRoute)
app.use(verifySignupTokenRouter)
app.use(getUserProfileRoute)
app.use(likePostRouter)
app.use(commentPostRouter)
app.use(replyCommentRouter)
app.use(updateProfileRoute)


app.use("*",(req,res,next)=>{
    const error=new Error("Route not found")
    next({
        status:404,
        message:error

    })
})
app.use((error,req,res,next)=>{
    res.status(error.status).json(error.message.message)
})


const port=process.env.PORT ||4000

app.listen(port,()=>console.log(`Server running on port : ${port}`))