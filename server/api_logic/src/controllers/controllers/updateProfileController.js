const mssql= require("mssql")
const config=require("../../config/config")

async function updateProfile(req,res){
    let userPhone=request.session.user
    
    let {userName,fullNames,email,imgUrl,bio}=req.body

    
    try {
        let sql=await mssql.connect(config)
    if(sql.connected){
        let results=await sql.query`EXEC UpdateUserProfile
        @phoneNumber=${userPhone}
        @userName=${userName},
        @fullNames=${fullNames},
        @email=${email},
        @imgUrl=${imgUrl},
        @bio=${bio}`;

        if(results.rowsAffected && results.rowsAffected.length>0 && results.rowsAffected[0]>0){
            res.json({
                success:true,
            message:'Profile updated succesfully'

            })
        }else{
            res.status(400).json({
                success:false,
                message:"No rows affected "
            })
        }

        
    }else{
        res.status(500).send("internal server error")
    }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
        
    }

    

}
module.exports={updateProfile}