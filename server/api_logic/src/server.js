const express=require('express')
require('dotenv').config()

const crypto=require('crypto')


const app=express()
app.use(express.json())



const postRouter=require('./routes/postsRoutes')

const profile=require('./routes/profileRoute')
const  user=require('./routes/userRoutes')
app.get('/',(req,res)=>{
    res.send("social media application ok")
})

app.use(postRouter)
app.use(profile)
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