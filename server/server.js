const express=require('express')
require('dotenv').config()


const app=express()
app.use(express.json())

const signUpRouter=require('./src/routes/signupRoute')
const loginRouter=require('./src/routes/loginRoute')
const postRouter=require('./src/routes/postsRoutes')

app.get('/',(req,res)=>{
    res.send("Hello welcome to my fantastic social media application")
})
app.use(signUpRouter)
app.use(loginRouter)
app.use(postRouter)


const port=process.env.PORT ||4000

app.listen(port,()=>console.log(`Server running on port : ${port}`))