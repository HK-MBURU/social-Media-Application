const express = require("express");
const sql = require("mssql");
const config = require("./config/config");
const cors=require("cors")

require("dotenv").config();
const crypto = require("crypto");
const session = require("express-session");
const { createClient } = require("redis");
const RedisStore = require("connect-redis").default;
const { v4 } = require("uuid");

const app = express();
app.use(cors(
  {
    origin:"http://localhost:3000",
    credentials:true,
    optionsSuccessStatus:200,
  }
))
app.use(express.json());


async function startApp() {
  //get pool
  try {
    const pool = await sql.connect(config);
    console.log("App connected to db");

    // create reddis client
    // app.locals.pool = pool;
    const redisClient = createClient();
    redisClient.connect();

    redisClient.on("connect", () => {
      console.log("redisConnected");
    });

    // create reddis store  

    const redis_store = new RedisStore({ client: redisClient, prefix: "" });
    const sessionSecret = process.env.SECRET;

    const oneDay = 60 * 60 * 1000 * 24;
    app.use((req,res,next)=>{
      req.pool=pool;
      next()
    })
    app.use(
      session({
        store: redis_store,
        secret: sessionSecret,
        saveUninitialized: false,
        genid: () => v4(),
        resave: false,
        rolling:true,
        unset:'destroy',
        cookie: {
          httpOnly: false,
          secure: false,
          maxAge: oneDay,
          sameSite: "strict",
          domain:'localhost'
        },
      })
    );

    app.get("/login/:username/:pass", (req, res) => {
      const { username, pass } = req.params;
      console.log(req.session);
      if (username && pass) {
        req.session.authorized = true;
        req.session.user = username;
      }
      res.json(req.session);
    });

    const signUpRouter = require("./routes/signupRoute");
    const loginRouter = require("./routes/loginRoute");
    const sendMailRoute = require("./routes/sendMailRoute");
    const verifySignupTokenRouter = require("./routes/verifySignupTokenRoute");
    
    app.get("/", (req, res) => {
      console.log(req.session);
      const authorized = req.session?.authorized;
      if (authorized) {
        res.send("Hello welcome to my fantastic social media application");
      } else {
        res.status(401).json({
          success: false,
          message: "login to access this page",
        });
      }
    });
    app.get("/logout", (req, res) => {
      req.session.destroy();
      res.send("logout succesfuly");
    });
    app.use(signUpRouter);
    app.use(loginRouter);
    app.use(sendMailRoute);
    app.use(verifySignupTokenRouter);

    app.use("*", (req, res, next) => {
      const error = new Error("Route not found");
      next({
        status: 404,
        message: error,
      });
    });
    app.use((error, req, res, next) => {
      res.status(error.status).json(error.message.message);
    });

    const port = process.env.PORT || 4000;

    app.listen(port, () => console.log(`Server running on port : ${port}`));
  } catch (error) {
    console.log("error connecting to db");
    console.log(error);
  }
}
startApp()

module.exports = { app };
