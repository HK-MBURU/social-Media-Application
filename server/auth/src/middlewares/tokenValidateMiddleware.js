const {tokenVerifier}=require("../utils/tokens")
async function tokenValidateMiddleware(req,res,next){
    let token= req.headers['authorization']?.split(" ")[1]
    console.log(token);
    try {
        if(!token)return next({status:400,message:"Token not provided"})

        let user=await tokenVerifier(token)

        if(user.roles==='admin'){
            req.user=user
            next()
        }
    } catch (error) {
        next({status:401,message: error.message})
        
    }
}
module.exports=tokenValidateMiddleware