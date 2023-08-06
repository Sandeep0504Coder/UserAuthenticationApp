const dotenv=require("dotenv")
const express = require("express");
const app = express();
dotenv.config({path:"./config.env"})
require("./db/conn")
const User = require("./models/userSchema");
const router=require("./routers/auth")
app.use(express.json())
app.use(router)
const port =process.env.PORT ;
app.listen(port, () => {
  console.log(`Listening at port no ${port}`);
});
