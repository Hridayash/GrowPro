//initializing all the necessary data

import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"



//setting up the apps

const app = express()
const prisma = new PrismaClient()

//setting up environment variable 
dotenv.config();

//setting up the middlewares 
app.use(express.json());
app.use(cors());

//setting up blacklisted tokens
const blacklist = new Set();

//Restful api

app.get('/', (req,res)=>{
    res.send("hello world")
})

//Creating new user with hased password 
app.post('/createUser' , async(req,res)=>{
    try{
    const salt = await bcrypt.genSalt()
    const hashedPassword = await  bcrypt.hash(req.body.Password, salt)
    

    const user =  { Email : req.body.Email, Name : req.body.Name, Password: hashedPassword};
    const newUser = await prisma.user.create({
        data:user
    })
    res.json(newUser);
    console.log("success")
} catch(error){
    res.status(500).json({error: "failed to create user"});
    console.log("Error:" , error)
}
})

//loggin then in aka valiading the user credentials

app.post('/login', async(req,res) =>{
    const {Email, Password} =req.body;

    try{
        const findUser = await prisma.user.findUnique({
            where: {   
                Email: Email
            },
        });

        if(!findUser){
            return res.status(400).json({error:"user not found"})
        }
        const isPasswordValid = await bcrypt.compare(Password, findUser.Password)
        if(!isPasswordValid){
            return res.status(400).json({error:"invalid password"});
        }
      
            //Authentication Complete


       const user = {email: findUser.Email, name: findUser.Name}

       const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
       res.json({ message:"login SuccessFul" , findUser, accessToken : accessToken, name:findUser.Name ,})
       console.log(accessToken)

        } catch(err) {
            console.log("error in:",  err)
        }
        

})



//Middleware to authenticate the token

function authenticateToken (req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null) {
        console.log('No token found')
        return res.sendStatus(401)
    }
    if(blacklist.has(token)){
        console.log('token is blacklisted')
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
        if(err){
            console.log('token error' , err.message)
            return res.sendStatus(403)
        } 
        req.user = user
        next()
    })


}
//Getting the user information

app.get('/user' , authenticateToken , async(req,res)=>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                Email : req.user.email
            },
            select:{
                Name: true,
                Email: true
            }
        });
        if(!user){
            return res.status(404).json({error: 'User not found '})
        }
        res.json(user);
    }catch(err){
        console.log('error:' , err)
        res.status(500).json({error: "some error in the house"})
    }
})



//logging out 
app.post('/logout' , authenticateToken , (req,res) =>{
    const token = req.headers['authorization'].split(' ')[1];
    blacklist.add(token);
    res.json({message: 'logout successful'})
})
   
    
app.listen(3002, ()=>{
    console.log("server is running on port 3002");

})


