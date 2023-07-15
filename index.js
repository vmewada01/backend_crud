const express= require("express")
const { connection } = require("./config/db")
const cors = require("cors")
const {userRouter}= require("./Routes/User.Routes")
const { AuthRouter } = require("./Routes/Auth.Routes")

require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.json())

app.use("/",(req,res)=> {
    res.send("Welcome to the homepage")
})

app.use("/auth", AuthRouter)



app.use("/user", userRouter)

const PORT=process.env.PORT 
//console.log(PORT)
app.listen(PORT, async()=> {
try{
    await connection
    console.log("connected to DB")
}
catch(err){
    console.log(err)
  }
  console.log(`connected to PORT ${PORT}`)
})