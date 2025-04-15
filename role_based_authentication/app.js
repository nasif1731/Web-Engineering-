const express=require("express");
const jwt=require("jsonwebtoken");
const {authenticateToken,authorizationRole}=require("./auth");
const routers=require("./protected");
const user=require("./Users");
const dotenv=require("dotenv");
dotenv.config();

const app=express();
app.use(express.json());

//login functionality
app.post("/login",(req,res)=>{
    const {username: inputUsername, password: inputPassword}=req.body;
    const foundUser=user.find(u=>u.username==inputUsername && u.password==inputPassword);
    if(!foundUser){
        return res.status(401).json({message:"Invalid username or password"});
    }
    const accessToken=jwt.sign({username:foundUser.username,role:foundUser.role},process.env.JWT_SECRET,{expiresIn:"1h"});
    res.json({accessToken});


});

app.listen(3000,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is running on port 3000");
});







