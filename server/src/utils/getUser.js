const mssql=require('mssql')
const config=require('../config/config')

async function getUser(phoneNumber){
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let results = await sql
        .request()
        .input("phoneNumber", phoneNumber)
        .execute("users.getUserByPhone");

      let user = results.recordset[0]
      return user
}
else {
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

module.exports=getUser
