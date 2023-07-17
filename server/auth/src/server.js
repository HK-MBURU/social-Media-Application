const express=require('express')
require('dotenv').config()
const crypto=require('crypto')
const session=require("express-session")
const {v4}=require("uuid")


const app=express()
app.use(express.json())

const oneDay=60*60*1000*24
app.use(session({
    secret:process.env.SECRET,
    saveUninitialized:false,
    genid:()=>v4(),
    resave:true,
    cookie:{
        httpOnly:true,
        // secure:true,
        maxAge:oneDay
        
    }

}))

app.get("/login/:username/:pass",(req,res)=>{
    const{username,pass}=req.params;
    console.log(req.session);
    if (username && pass) {
        req.session.authorized=true
        req.session.user=username
        
    } res.json(req.session)

})


const signUpRouter=require('./routes/signupRoute')
const loginRouter=require('./routes/loginRoute')
const sendMailRoute = require('./routes/sendMailRoute')
const verifySignupTokenRouter=require('./routes/verifySignupTokenRoute')
app.get('/',(req,res)=>{
    console.log(req.session);
    const authorized=req.session?.authorized
    if (authorized) {
        res.send("Hello welcome to my fantastic social media application")
    }else{
        res.status(401).json({
            success:false,
            message:"login to access this page"
        })
    }
    
})
app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.send("logout succesfuly")

})
app.use(signUpRouter)
app.use(loginRouter)
app.use(sendMailRoute)
app.use(verifySignupTokenRouter)


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