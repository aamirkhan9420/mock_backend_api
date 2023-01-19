let express=require("express")
const { connection } = require("./config/db")
const { UserRoute } = require("./routes/user.route")
let cors=require("cors")
require("dotenv").config()
let PORT=process.env.PORT
let app=express()
app.use(express.json())
app.use(cors({
   origin:"*"
}))
app.get("/",(req,res)=>{
    res.send({"msg":"wellcom to home signup or signin"})
})
app.use("/user",UserRoute)

app.listen(PORT,async(req,res)=>{
   try {
      await connection
      console.log(`listening on ${PORT}`)
   } catch (error) {
    console.log(`${error} while connecting`)
   }
})