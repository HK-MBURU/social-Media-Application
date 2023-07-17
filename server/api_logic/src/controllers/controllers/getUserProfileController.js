const mssql=require("mssql")
const config=require("../../config/config")


async function getUserProfile(req,res){
    const user=req.body
    let userName=user.userName
    // console.log(userName);
    let sql= await mssql.connect(config)
    if (sql.connected) {
        let results= await sql.query`EXEC GetUserProfile @userName=${userName}`

        let userProfile =results.recordset
        // let userProfile=JSON.stringify(results.recordset)

        res.json({
            success:true,
            message:"profile fetched succesfully",
            results:userProfile
        })
        // console.log(userProfile);
    }else{
        res.status(500).send("Internal server error")
    }



}

module.exports={getUserProfile}