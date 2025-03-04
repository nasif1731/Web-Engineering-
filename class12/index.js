const bodyParser = require('body-parser');
const express=require('express');
const app=express();

app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());
app.post('/login',(req,res)=>{
    console.log(req.body);
    console.log(req.body.user);
    console.log(req.body.email);
    res.send("User login successfully");
})

app.use((req,res,next)=>{
    console.log("I m a middleware");
    next();
})

app.listen(3000,()=>{
    console.log("server is running at 3000");
});
app.get('/',(req,res)=>{
    res.send('<h1>Welcome to node with expresss</h1>');
});
app.get('/about',(req,res)=>{
    res.json({
        name:"Nehal"
    })
});