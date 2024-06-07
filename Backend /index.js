const express = require("express");
const cors = require('cors');

const app = express();



app.get('/', (req,res)=>{
    res.send("hello world")
})


app.listen(3002, ()=>{
    console.log("server is running on port 3002");
})


