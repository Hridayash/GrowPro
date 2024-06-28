import express from 'express'
import cors from 'cors'
import { createJob, getAllJob, getOneJob } from '../controllers/job.js';

const JobRouter = express.Router()

JobRouter.use(cors());

JobRouter.post('/' , createJob);
JobRouter.get('/all-jobs' , getAllJob);
JobRouter.get('/all-jobs/:id' ,  getOneJob)


export default JobRouter