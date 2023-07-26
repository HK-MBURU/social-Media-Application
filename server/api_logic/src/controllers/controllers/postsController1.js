const mssql=require('mssql')
const config=require('../../config/config')
const { request } = require('express')

async function createPost(req,res){
    const{session}=req
    let phoneNumber=session.user
    const {  content, image_url, video_url } = req.body;

    // let phoneNumber=session.user
    // console.log(phoneNumber);

    try {
        let sql=await mssql.connect(config)

        if (sql.connected) {
            let response=await sql.query `EXEC users.GetUserIdByPhoneNumber 
            @phoneNumber=${phoneNumber}`

            const{recordset}=response
            const{id}=recordset[0]
            console.log(id);
            


            let results=await sql.query `EXEC users.CreatePost
            @user_id=${id},
            @content=${content},
            @image_url=${image_url},
            @video_url=${video_url}
            `
            if (results) {
                res.json({
                    success:true,
                    message:'Post created Succesfully'
                })
                
            } else {
                res.status(400).json({
                    success:false,
                    message:"Failed tocreate post "
                })
                
            }
        } else {
            res.status(500).send("internal server error")
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
        
    }


}

async function likePost(req,res){
    let {postId,userId}=req.body
    const{session}=req
    let phoneNumber=session.user
    try {
        let sql=await mssql.connect(config)
    if(sql.connected){
        let results=await sql.query(`EXECUTE insert_like @post_id = ${postId}, @phoneNumber = ${phoneNumber}`)
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
        try {
        let request=sql.request()
        request.input('post_id',mssql.Int,postId)
        request.input('user_id',mssql.Int,userId)
        request.input('content',mssql.VarChar(255),content)

        let result=await request.execute('insert_comment')
        let insertedComment=result.recordset
        res.json({
            success:true,
            message:"Commented succesfully succesfully  ",
            results:insertedComment
        })
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send("internal server error")
        
    }

        
    }
    else{
        res.status(500).send("Internal server error")
    }


}

async function replyComment(req,res){
    let {commentId,userId,content}=req.body
    let sql=await mssql.connect(config)
    if(sql.connected){
        let results=await sql.query(`EXECUTE InsertCommentReply @comment_id = ${commentId}, @user_id = ${userId},@content="${content}"`)
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
        let results=await sql.query('EXECUTE GetAllPosts')
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
module.exports={getPosts,likePost,commentPost,replyComment,createPost}