const mssql= require("mssql")
const config=require("../config/config")

async function updateProfile(req,res){
    // const user=req.body
    let {userName,fullNames,email,imgUrl,bio}=req.body

    // console.log(userName,fullNames,email,imgUrl,bio);
    try {
        let sql=await mssql.connect(config)
    if(sql.connected){
        let results=await sql.query`EXEC UpdateUserProfile
        @userName=${userName},
        @fullNames=${fullNames},
        @email=${email},
        @imgUrl=${imgUrl},
        @bio=${bio}`;

        let affectedRows=await results.rowsAffected[0] 

        if(affectedRows>0){
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