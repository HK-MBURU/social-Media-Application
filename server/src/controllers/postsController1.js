const mssql=require('mssql')
const config=require('../config/config')

async function likePost(req,res){
    let {postId,userId}=req.body
    try {
        let sql=await mssql.connect(config)
    if(sql.connected){
        let results=await sql.query(`EXECUTE insert_like @post_id = ${postId}, @user_id = ${userId}`)
        let like=results.recordset

        res.json({
            success:true,
            message:"liked succesfully  ",
            results:like
        })
    }
    else{
        res.status(500).send("Internal server error")
    }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
        
    }
    


}

async function commentPost(req,res){
    let {postId,userId,content}=req.body
    let sql=await mssql.connect(config)
    if(sql.connected){
        let results=await sql.query(`EXECUTE insert_comment @post_id = ${postId}, @user_id = ${userId},@content=${content}`)
        let like=results.recordset

        res.json({
            success:true,
            message:"Commented succesfully succesfully  ",
            results:like
        })
    }
    else{
        res.status(500).send("Internal server error")
    }


}

async function replyComment(req,res){
    let {commentId,userId,content}=req.body
    let sql=await mssql.connect(config)
    if(sql.connected){
        let results=await sql.query(`EXECUTE InsertCommentReply @commentId = ${commentId}, @user_id = ${userId},@content=${content}`)
        let reply=results.recordset

        res.json({
            success:true,
            message:"replied succesfully succesfully  ",
            results:reply
        })
    }
    else{
        res.status(500).send("Internal server error")
    }

}

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
module.exports={getPosts,likePost,commentPost,replyComment}