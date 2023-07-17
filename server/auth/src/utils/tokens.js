const jwt=require('jsonwebtoken')
require('dotenv').config()

const tokenGenerator=async(data)=>{
    return jwt.sign(data,process.env.SECRET,{expiresIn:'1h'})

}
function tokenVerifier(token){
    return jwt.verify(token,process.env.SECRET)
}
 function verifySignUpToken(req,res,next){
    const token=req.params.token;
    const generatedToken=crypto.randomBytes(48).toString('base64').replace(/\//g,'_').replace(/\+/g,'-')

    const valid=token===generatedToken

    if(valid){
        next()
    }else{
        res.status(401).send("Invalid token")
    }
 }

module.exports={tokenGenerator,tokenVerifier,verifySignUpToken}