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




// controllers/job.js

async function getTotalJobs(req, res) {
    try {
        const totalJobs = await prisma.job.count();
        res.json({ total: totalJobs });
    } catch (error) {
        console.error('Error getting total jobs:', error);
        res.status(500).json({ error: 'Failed to fetch total jobs' });
    }
}

async function getApprovedJobs(req, res) {
    try {
        const approvedJobs = await prisma.job.count({
            where: { approved: true }
        });
        res.json({ approved: approvedJobs });
    } catch (error) {
        console.error('Error getting approved jobs:', error);
        res.status(500).json({ error: 'Failed to fetch approved jobs' });
    }
}

async function getAppliedJobs(req, res) {
    try {
        const appliedJobs = await prisma.application.count({
            where: { jobId: { in: (await prisma.job.findMany({ select: { Id: true } })).map(job => job.Id) } }
        });
        res.json({ applied: appliedJobs });
    } catch (error) {
        console.error('Error getting applied jobs:', error);
        res.status(500).json({ error: 'Failed to fetch applied jobs' });
    }
}

export { createJob, getAllJob, getOneJob, getTotalJobs, getApprovedJobs, getAppliedJobs };
