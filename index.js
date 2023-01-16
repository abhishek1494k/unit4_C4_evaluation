const express=require("express")
const app=express()
 app.use(express.json())

 const { AppModel } = require("./models/model")
// AppModel

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const cors=require("cors")
app.use(cors())

const { appRouter } = require("./routes/app.route")
const { postRouter } = require("./routes/post.route")
const {auth}=require("./middlewares/authenticator")

app.use("/",appRouter)
app.use(auth)
app.use("/posts",postRouter)



//--------CONNECTION-------------------->
 require("dotenv").config()
 const {connection}=require("./configs/db")
 app.listen( process.env.port||4500,async()=>{
    try{
        await connection;
        console.log('Connected to DB');

        console.log('Server Running at',`${ process.env.port||4500}`);
    }catch(e){
        console.log('err',e);
    }
 })
