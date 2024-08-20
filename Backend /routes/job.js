// routes/job.js
import express from 'express';
import cors from 'cors';
import { createJob, getAllJob, getOneJob, getTotalJobs, getApprovedJobs, getAppliedJobs } from '../controllers/job.js';
import authenticateToken from "../middleware/authentication.js";

const JobRouter = express.Router();

JobRouter.use(cors());

JobRouter.post('/', authenticateToken, createJob);
JobRouter.get('/all-jobs', authenticateToken, getAllJob);
JobRouter.get('/all-jobs/:id', authenticateToken, getOneJob);

// New routes for job statistics
JobRouter.get('/total-jobs', authenticateToken, getTotalJobs);
JobRouter.get('/approved-jobs', authenticateToken, getApprovedJobs);
JobRouter.get('/applied-jobs', authenticateToken, getAppliedJobs);

export default JobRouter;
