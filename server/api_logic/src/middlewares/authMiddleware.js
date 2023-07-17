const authMiddleware=(req,res,next)=>{
    console.log(req.session);
    const authorized=req.session?.authorized
    

    if(authorized){
        next()        
    }else{
    return res.status(401).send('unauthorized')
    }
   
}
module.exports=authMiddleware