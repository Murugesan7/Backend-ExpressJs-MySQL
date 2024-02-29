const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

const port = 4000;
app.use(bodyParser.json());

app.listen(port,()=> {
    console.log("Server Started...");
})


// Create Data Base Connection

const sqlConn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mydb"
})

sqlConn.connect((err)=>{
if(err){
    throw err;
}
console.log("Mysql Connection Done ...");
})

// get all students

app.get("/",(req,res) => {
let sql = "select * from students";
sqlConn.query(sql,(err,result)=>{
if(err){
    throw err;
}
res.send(result);
})
})

// get student based on id value 

app.get("/student/:id",(req,res) => {
    console.log(req.params.id);
    let sql = "select * from students where id="+req.params.id;
    sqlConn.query(sql,(err,result) => {
        if(err){
            throw err;
        }
        res.send(result);
    })
})


// add new student record

app.post("/student",(req,res) => {
    let newItem = req.body;

    sqlConn.query("insert into students set ?",newItem,(err,result)=>{
        if(err){
            return res.json({status:'Error',err});
        }
        return res.json({status:"SUCCESS",result});
    })
})

// delete the excisting student record

app.delete("/delete/:id",(req,res) => {
sqlConn.query("delete from students where id=?",req.params.id,(err,result) => {
    if(err){
        throw err;
    }
    return res.send(result);
});
})


// update the student record

app.put("/update/:id",(req,res) => {
    sqlConn.query("update students set name=? where id=?",[req.body.name,req.params.id],(err,result) => {
        if(err){
            throw err;
        }
        res.send(result);
    })
})