const mssql=require("mssql")
const config=require('../../config/config')

async function deleteAccount(req,res){
    // let userName= req.params.id
    let userName= req.body.userName
    console.log(userName);

    let deleteDate= new Date()
    
    try {
        let sql=await mssql.connect(config)

        if (sql.connected){
            const checkQuery=`EXEC CheckUsernameExistence @userName='${userName}'`
            const checkResult=await sql.query(checkQuery)
            const userCount=checkResult.recordset[0].count
            console.log(userCount);

            if(userCount>0){
                const results= await sql.query(`EXEC users.deleteUser @userName=${userName}`)
                 
                res.json({
                success:true,
                message:"Account deleted Succesfully",
                output:results
             })
            }else{
                res.status(404).json({
                    success:false,
                    message:"Account not found"
                })
            }
            
            

        }else{
            res.status(500).send("Internal server error")
        }
    } catch (error) {
        res.status(500).send(error.message)
        
    }


}
const currentUser = {
    id: 1,
  }
async function follow(req,res){
    const userName=req.body.userName

    try {
        const userToFollow= await getUserByUsername(userName)
        if(userToFollow){
            const followerId=currentUser.id
            const followingId=userToFollow.id

            let sql=await mssql.connect(config)

            if(sql.connected){
                const request=sql.request()
                request.input('follower_id',mssql.Int,followerId)
                request.input('following_id',mssql.Int,followingId)
                await request.execute('InsertFollower')

                res.json({
                    success:true,
                    message:`you are now following ${userToFollow.userName}`
                })
            }else{
                res.status(500).send('Internal server error')
            }
        }else{
            res.status(404).json({
                success:false,
                message:`User with userName '${userName}' not found`
            })
        }
    } catch (error) {
        res.status(500).send(error.message)
        
    }



}
async function getUserByUsername(userName){
    try {
        let sql=await mssql.connect(config)
        if(sql.connected){
            const request=sql.request()
            request.input('userName',mssql.VarChar(255),userName)

            const result=await request.execute('GetUserByUsername')
            const user=result.recordset[0]
            return user || null
        }
        else{
            throw new Error('Unable to connect to the database')
        }
    } catch (error) {
        throw new Error(`error retriving user :${error.message}`)
        
    }
}

async function unfollow(req,res){
    const username=req.body.userName
    try {
        const userToUnfollow=await getUserByUsername(username)

        if(userToUnfollow){
            const followerId=currentUser.id
            const followingId=userToUnfollow.id

            let sql=await mssql.connect(config)

            if(sql.connected){
                const request=sql.request()
                request.input('follower_id',mssql.Int,followerId)
                request.input('following_id',mssql.Int,followingId)
                await request.execute('DeleteFollower')

                res.json({
                    success:true,
                    message:`You have unfollowed ${userToUnfollow.userName}`
                })
            }else{
                res.status(500).send('Internal server error')
                }}
                else{
                    res.status(404).json({
                        success:false,
                        message:`User with userName '${username}' not found`
                    })
                }
    } catch (error) {
        res.status(500).send(error.message)
        
    }
}
async function getFollowing(req,res){
    try {
        let sql=await mssql.connect(config)
        

        if(sql.connected){
            let user_id=currentUser.id

            const request=sql.request()
            request.input('user_id',mssql.Int,user_id)

            const result=await request.execute('sp_get_following')
            const following=result.recordset

            res.json(following)
        }else{
            res.status(500).json({
                success: false,
                message: 'Unable to connect to the database',
              });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error retrieving following: ${error.message}`,
          });
    }
}
async function searchUserByUsername(req, res) {
    const { userName } = req.params;
  
    try {
      let sql = await mssql.connect(config);
  
      if (sql.connected) {
        const request = sql.request();
        request.input('username', mssql.VarChar(50), userName);
  
        const result = await request.query('EXEC SearchUserByUsername @username');
        const user = result.recordset[0];
  
        if (user) {
          res.json({
            success: true,
            user: user
          });
        } else {
          res.status(404).json({
            success: false,
            message: `User with username '${username}' not found`
          });
        }
      } else {
        res.status(500).send('Internal server error');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  }
  
module.exports={deleteAccount,follow,unfollow,getFollowing,searchUserByUsername}