let express=require("express")
const { Usermodel } = require("../model/user.model")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
require("dotenv").config()

let app=express()

app.use(express.json())

let UserRoute=express.Router()

UserRoute.post("/signup",(req,res)=>{


     let {email,password}=req.body
    
try {
    bcrypt.hash(password,5,async(err,hashedpassword)=>{
        if(hashedpassword){

            let newUser=new Usermodel({email:email,password:hashedpassword})

            await newUser.save()

            console.log("signup Successful")

            res.send({"msg":"signup Successful"})
        }else{
            console.log("signup failed")
            
            res.send({"msg":err})

        }

    })
    
} catch (error) {
    res.send({"msg":error})
    
}
   
})
UserRoute.post("/login",async(req,res)=>{
    let {email,password}=req.body
    let user=await Usermodel.find({email})

try {
   if(user.length>0){
    let hashpassword=user[0].password
      bcrypt.compare(password,hashpassword,(err,result)=>{
        if(result){
            jwt.sign({userId:user[0]._id},process.env.KEY,(er,token)=>{
                if(token){
                    res.send({"msg":"Login Successful","token":token})
                }else{
                    res.send({"msg":"Invalid Credentials","err":er})
                }
            })
        }else{
            res.send({"msg":"Invalid Credentials","err":err})
        }
      })
   }else{
   
    res.send({"msg":"Invalid Credentials"})
}
   
} catch (error) {
   res.send({"msg":error})
   
}
  

})
module.exports={UserRoute}
