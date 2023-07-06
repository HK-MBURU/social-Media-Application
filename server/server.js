const express=require('express')
require('dotenv').config()


const app=express()
app.use(express.json())

const signUpRouter=require('./src/routes/signupRoute')
const loginRouter=require('./src/routes/loginRoute')
const postRouter=require('./src/routes/postsRoutes')
const sendMailRoute = require('./src/routes/sendMailRoute')

app.get('/',(req,res)=>{
    res.send("Hello welcome to my fantastic social media application")
})
app.use(signUpRouter)
app.use(loginRouter)
app.use(postRouter)
app.use(sendMailRoute)

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