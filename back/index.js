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


// app.use(cors({credentials:true, origin:"https://taskfontend.vercel.app",}))

app.use(cors({
    "headers": [
      {
        "source": "https://taskfontend.vercel.app/",
        "headers": [
          { "key": "Access-Control-Allow-Credentials", "value": "true" },
          { "key": "Access-Control-Allow-Origin", "value": "*" },
          { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
        ]
      }
    ]
  }))

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