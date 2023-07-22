const express=require('express')
require('dotenv').config()
const session=require("express-session")
const {createClient}=require("redis")
const RedisStore=require("connect-redis").default
const { v4 } = require("uuid");
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials:true,
        optionsSuccessStatus:200
    }
))
const redisClient=createClient()

redisClient.connect()

const redis_store=new RedisStore({client:redisClient,prefix:""})
const sessionSecret=process.env.SECRET
const oneDay=60*60*1000*24
const authMiddleware=require('./middlewares/authMiddleware')
app.use(session(
    {
        store:redis_store,
        secret:sessionSecret,
        resave:false,
        saveUninitialized:false,
        genid:()=>v4(),
        resave:false
    }
))
// 
app.use((req,res,next)=>{
    req.redisClient=redisClient
    next()
})
app.use((error,req,res,next)=>{
    res.status(error.status ||500).json({message:error.message})
})
app.use(authMiddleware)

const postRouter=require('./routes/postsRoutes')


const profile=require('./routes/profileRoute')
const  user=require('./routes/userRoutes')
const { error } = require('console')
app.get('/',(req,res)=>{
    res.send("social media application ok")
})

app.use(postRouter)
app.use(profile)
// let phone=request.session.user
// console.log(phone);
app.use(user)


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


const port=process.env.PORT ||5000

app.listen(port,()=>console.log(`Server running on port : ${port}`))