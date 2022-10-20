const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const regRouter = require('./routes/regRouter')
const loginRotuer = require('./routes/loginRouter')
const logutRotuer = require('./routes/logoutRouter')
const tasksRouter = require('./routes/tasksRouter')
const validRouter = require('./routes/validRouter')
const dotenv = require('dotenv')
dotenv.config()



const app = express()
app.use(express.json())
app.use(cookieParser())


app.use(cors({credentials:true, origin:"https://taskfontend.vercel.app",}))
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.header(
       "Access-Control-Allow-Headers",
       "Origin,X-Requested-with,Content-Type,Accept,Authorization" 
    );
    next();
})

mongoose.connect(`${process.env.Mongo}`).then(()=>{
    console.log("Mongodb Connected")
}).catch(err=>console.log(err))


app.use('/login',loginRotuer)
app.use('/reg',regRouter)
app.use('/logout',logutRotuer)
app.use('/tasks',tasksRouter)
app.use('/isValid',validRouter)




app.listen(8800,()=>{
    console.log("Server is Running...")
})