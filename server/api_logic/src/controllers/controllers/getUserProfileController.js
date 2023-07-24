const mssql=require("mssql")
const config=require("../../config/config")


async function getUserProfile(req,res){
    const{session}=req
    let phoneNumber=session.user
    console.log(phoneNumber);
    // console.log(userName);
    let sql= await mssql.connect(config)
    if (sql.connected) {
        let results= await sql.query`EXEC GetUserProfile @phoneNumber=${phoneNumber}`

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