const file=require('fs').promises;
const fs = require('http');
// file.writeFile('./data.txt','Nehal Asif',(err)=>{
//     if(err){
//         console.log(err.message);
//     }
//     console.log("File written successfully");
// });

// const data=file.readFile('./data.txt','utf-8',(err)=>{
//     if(err){
//         console.log(err.message);
//     }
//     console.log(data);
// });
// file.unlink('data.txt',(err)=>{
//     if(err){
//         console.log(err.message);
//     }
//     console.log("File deleted successfully");
// });

// const fun1=require ('./modules/add');
// const fun2=require ('./modules/sub');
// const fun3=require ('./modules/mul');


// console.log(fun3(5,10));
// console.log(fun2(5,3));
// console.log(fun1(3,5));
// console.log("shukriya");

// async function totalSalary(){
//     let data=await file.readFile('data.json','utf');
//     data=JSON.parse(data);
//     const reducefunction=data.reduce((acc,curr)=>{
//         acc+=curr.salary;
//         return acc;
//     },0);
//     console.log(total);
// }
// totalSalary();


const server=fs.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(<h1>Welcome to Hell</h1>);
}
);
server.listen(3000);