const axios=require ("axios")
const authorize=async(req,res,next)=>{
    const token=req.headers["authorization"]?.split(" ")[1]
    try {
        let response=await axios.get('http://localhost:4040/login/authorize',{headers:{authorization:`Bearer ${token}`}})
        let user=response.data
        if(user){
            next()
        }
        
    } catch (error) {
        res.status(401).json(error.message);
        
    }
    
}
module.exports={authorize}