const { json } = require('body-parser')
const express=require('express')
const mysql=require('mysql')
const app=new express()
app.use(json())
const myconnection=new mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'employee',
   

})
myconnection.connect((err)=>{
    if(err){
        console.log('error'+JSON.stringify(err))
    }
    else{
        console.log('connect successfully')

    }
})
app.post('/employee',(req,res)=>{


    let emp=req.body
    myconnection.query('INSERT INTO `emp` VALUES (?, ?, ?, ?)',[emp.id,emp.name,emp.email,emp.phone],(err,rows)=>{
        if(!err){
            res.send('inserted successfully')
        }
        else{
            console.log(err)
        }
    })
})
app.patch('/employee/:id',(req,res)=>{
    let emp=req.body

    console.log("helooo")
    myconnection.query('update emp set name=?,email=?,phone=? where id=?',[emp.name,emp.email,emp.phone,req.params.id],(err,rows)=>{
        if(!err){
            res.send('updated successfully')
        }
        else{
            console.log(err)
        }
    })
})
app.get('/employee',(req,res)=>{
    console.log('hellooo')
    myconnection.query('SELECT * FROM emp',(err,rows)=>{
        if(!err){
            res.send(rows)
            console.log(rows[0])
        }
        else{
            console.log(err)
        }
    })
})
app.get('/employee/:id',(req,res)=>{
    console.log(req.params.id)
    myconnection.query('SELECT * FROM emp WHERE id=?',[req.params.id],(err,rows)=>{
        if(!err){
            res.send(rows)
            console.log(rows)
        }
        else{
            console.log(err)
        }
    })
})

app.listen('3000',()=>{
    console.log('server is on')
})