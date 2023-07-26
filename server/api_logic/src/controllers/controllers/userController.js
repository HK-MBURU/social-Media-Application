const mssql = require("mssql");
const config = require("../../config/config");
const Users = require("./users");

async function deleteAccount(req, res) {
  // let userName= req.params.id
  let userName = req.body.userName;
  console.log(userName);

  let deleteDate = new Date();

  try {
    let sql = await mssql.connect(config);

    if (sql.connected) {
      const checkQuery = `EXEC CheckUsernameExistence @userName='${userName}'`;
      const checkResult = await sql.query(checkQuery);
      const userCount = checkResult.recordset[0].count;
      console.log(userCount);

      if (userCount > 0) {
        const results = await sql.query(
          `EXEC users.deleteUser @userName=${userName}`
        );

        res.json({
          success: true,
          message: "Account deleted Succesfully",
          output: results,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Account not found",
        });
      }
    } else {
      res.status(500).send("Internal server error");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const currentUser = {
  id: 1,
};
async function follow(req, res) {
  const userName = req.body.userName;

  try {
    const userToFollow = await getUserByUsername(userName);
    if (userToFollow) {
      const followerId = currentUser.id;
      const followingId = userToFollow.id;

      let sql = await mssql.connect(config);

      if (sql.connected) {
        const request = sql.request();
        request.input("follower_id", mssql.Int, followerId);
        request.input("following_id", mssql.Int, followingId);
        await request.execute("InsertFollower");

        res.json({
          success: true,
          message: `you are now following ${userToFollow.userName}`,
        });
      } else {
        res.status(500).send("Internal server error");
      }
    } else {
      res.status(404).json({
        success: false,
        message: `User with userName '${userName}' not found`,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
async function getUserByUsername(req, res) {
  let userName = req.params.userName;
  console.log("This is the username", userName);

  try {
    let sql = await mssql.connect(config);

    if (sql.connected) {
      const request = sql.request();
      request.input("userName", mssql.VarChar(255), userName);

      const result = await request.execute("GetUserProfileByUsername");
      if (result.recordset.length > 0) {
        const user = result.recordset[0];
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function unfollow(req, res) {
  const username = req.body.userName;
  try {
    const userToUnfollow = await getUserByUsername(username);

    if (userToUnfollow) {
      const followerId = currentUser.id;
      const followingId = userToUnfollow.id;

      let sql = await mssql.connect(config);

      if (sql.connected) {
        const request = sql.request();
        request.input("follower_id", mssql.Int, followerId);
        request.input("following_id", mssql.Int, followingId);
        await request.execute("DeleteFollower");

        res.json({
          success: true,
          message: `You have unfollowed ${userToUnfollow.userName}`,
        });
      } else {
        res.status(500).send("Internal server error");
      }
    } else {
      res.status(404).json({
        success: false,
        message: `User with userName '${username}' not found`,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
async function getFollowing(req, res) {
  const { session } = req;
  let phoneNumber = session.user;
  try {
    let sql = await mssql.connect(config);

    if (sql.connected) {
      // let user_id = currentUser.id;

      const request = sql.request();
      request.input("phoneNumber", mssql.Int, phoneNumber);

      const result = await request.execute("sp_get_following");
      const following = result.recordset;

      res.json({ message: "success", results: following });
    } else {
      res.status(500).json({
        success: false,
        message: "Unable to connect to the database",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error retrieving following: ${error.message}`,
    });
  }
}
async function searchUser(req, res) {
  const { q } = req.query;
  console.log("This is the q", q);
  try {
    let sql = await mssql.connect(config);

    if (sql.connected) {
      const request = sql.request();
      const result = await request.query("EXEC [dbo].[GetAllUsersInfo]");
      const users = result.recordset;
      console.log(users);
      if (users) {
        console.log("Users fetched succesfully");
        const keys = ["fullNames", "userName", "bio"];

        const search = (data) => {
          return data.filter((item) =>
            keys.some((key) => item[key]?.toLowerCase().includes(q))
          );
        };
        res.json(search(users).splice(0, 10));
        // console.log(search(users));
      } else {
        res.status(404).json({
          success: false,
          message: "Unable to fetch all users",
        });
      }
    } else {
      res.status(500).send("Internal server error");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}
//getall users
async function getAllUsers(req,res){
    const{session}=req
    
    
    try {
      let sql= await mssql.connect(config)
       if (sql.connected) {
        let results= await sql.query`EXEC [dbo].[GetAllUsersInfo]`

        let users =results.recordset
        // let userProfile=JSON.stringify(results.recordset)

        res.json({
            success:true,
            message:"profile fetched succesfully",
            results:users
        })
        // console.log(userProfile);
    }else{
        res.status(500).send("Internal server error")
    }
    } catch (error) {
      console.error(error);
      
    }
   



}



module.exports = {
  getAllUsers,
  deleteAccount,
  follow,
  unfollow,
  getFollowing,
  searchUser,
  getUserByUsername,
};
