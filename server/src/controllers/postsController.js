const mssql=require('mssql')
const config=require('../config/config')

async function getPosts(req,res){
    let sql=await mssql.connect(config)
    if(sql.connected){
        let results=await sql.query('SELECT * FROM users.posts')
        let posts=results.recordset

        res.json({
            success:true,
            message:"posts fetched succesfully",
            results:posts
        })
    }
    else{
        res.status(500).send("Internal server error")
    }

}
module.exports={getPosts}