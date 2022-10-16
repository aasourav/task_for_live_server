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

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://taskfontend.vercel.app');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors({credentials:true, origin:"https://taskfontend.vercel.app"}))

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