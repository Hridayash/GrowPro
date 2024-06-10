import { PrismaClient } from "@prisma/client";
import e from "express";
import cors from "cors"




const app = e();
const prisma = new PrismaClient()

app.use(e.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send("hello world")
})

app.post('/createUser' , async(req,res)=>{
    const { Email, Name, Password} = req.body;
    const newUser = await prisma.user.create({
        data:{
           
            Email,
            Name,
            Password
        },
    })
    res.json(newUser);
    console.log("success")
})

app.post('/login' , async(req,res) =>{
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
        if(findUser.Password !== Password){
            return res.status(400).json({error:"invalid password"});
        }
        res.json({message:"login SuccessFul" , findUser})

        } catch(err) {
            console.log("error in:",  err)
        }
})

   
    
app.listen(3002, ()=>{
    console.log("server is running on port 3002");

})


