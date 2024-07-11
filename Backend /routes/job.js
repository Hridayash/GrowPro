import express from 'express'
import cors from 'cors'
import { createJob, getAllJob, getOneJob } from '../controllers/job.js';
import authenticateToken from "../middleware/authentication.js"

const JobRouter = express.Router()

JobRouter.use(cors());

JobRouter.post('/' ,authenticateToken, createJob);
JobRouter.get('/all-jobs' , authenticateToken ,  getAllJob);
JobRouter.get('/all-jobs/:id' ,authenticateToken,  getOneJob)


export default JobRouter