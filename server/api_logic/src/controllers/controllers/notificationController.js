const mssql=require("mssql")
const config=require("../../config/config")


async function getNotifications(req,res){
    const{session}=req
    let phoneNumber=session.user
    console.log(phoneNumber);
    // console.log(userName);
    let sql= await mssql.connect(config)
    if (sql.connected) {
        let results= await sql.query`EXEC GetNotificationsByPhoneNumber @phoneNumber=${phoneNumber}`

        let notifications =results.recordsets[0]
        // let userProfile=JSON.stringify(results.recordset)

        res.json({
            success:true,
            message:"Notifications fetched succesfully",
            results:notifications
        })
        // console.log(userProfile);
    }else{
        res.status(500).send("Internal server error")
    }



}

module.exports={getNotifications}