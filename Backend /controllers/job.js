import { PrismaClient } from "@prisma/client";
import express from "express"


const app = express();
const prisma = new PrismaClient;
app.use(express.json());

async function createJob(req,res){
    try{
        const job = {Title : req.body.Title ,  Description :  req.body.Description }

        const newJob = await prisma.job.create({data:job});
        res.json(newJob);
        
    } catch (error){
        res.status(500).json({error:"failed to create job"})
        console.log('Error:'  , error)
    }
}

async function getAllJob (req,res){
    try{
        const allJob = await prisma.job.findMany({
            select:{Title: true , Description: true , DatePosted: true, Id:true}
        })
        res.json(allJob)
    }catch(error){
        console.log(error)
    }
}

async function getOneJob (req,res){
    const {id} = req.params;
    const jobId = parseInt(id , 10);
    try{
        const job = await prisma.job.findUnique({
            where : {Id: jobId },
            select:{Title: true , Description: true , DatePosted: true, Id:true}
        })
        res.json(job)

    }catch(err){
        console.log(err)
    }
}




export {createJob , getAllJob , getOneJob}