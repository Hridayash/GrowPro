import express from 'express';
import { PrismaClient } from '@prisma/client';
import authenticateToken from "../middleware/authentication.js";

const prisma = new PrismaClient();
const router = express.Router();

// Middleware to parse JSON request bodies
router.use(express.json());

// GET all job applications
router.get('/', authenticateToken, async (req, res) => {
  try {
    const jobApplicants = await prisma.jobApplicant.findMany({
      include: {
        Job: true,
        Profile: {
          include: {
            User: true,
          },
        },
      },
    });
    res.json(jobApplicants);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job applicants' });
  }
});

// GET job application by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const jobApplicant = await prisma.jobApplicant.findUnique({
      where: { Id: parseInt(id) },
      include: {
        Job: true,
        Profile: {
          include: {
            User: true,
          },
        },
      },
    });
    if (!jobApplicant) {
      return res.status(404).json({ error: 'Job applicant not found' });
    }
    res.json(jobApplicant);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job applicant' });
  }
});

// POST create a job application
router.post('/', /*authenticateToken,*/ async (req, res) => {
  const { JobId, ProfileId, UserId } = req.body;
  try {
    const newJobApplicant = await prisma.jobApplicant.create({
      data: {
        Job: {
          connect: { Id: parseInt(JobId) },
        },
        Profile: {
          connect: { Id: parseInt(ProfileId) },
        },
        User: {
          connect: { Id: parseInt(UserId) },
        },
      },
    });
    res.status(201).json(newJobApplicant);
  } catch (error) {
    console.error('Error creating job application:', error);
    res.status(400).json({ error: 'Error creating job application' });
  }
});



// PATCH approve job application by ID
router.patch('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { approved } = req.body;
  const {status } = req.body;
  try {
    const updatedJobApplicant = await prisma.jobApplicant.update({
      where: { Id: parseInt(id) },
      data: { Approved: approved , 
              Status : status
       },
    });
    res.json(updatedJobApplicant);
  } catch (error) {
    res.status(400).json({ error: 'Error approving job application' });
  }
});

//get alll the application of a specifi user 

router.get('/user/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;
  try {
    const applications = await prisma.jobApplicant.findMany({
      where: { UserId: parseInt(userId) },
      include: { Job: true, Profile: true , User: true },
    });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE job application by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.jobApplicant.delete({
      where: { Id: parseInt(id) },
    });
    res.json({ message: 'Job applicant deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting job applicant' });
  }
});

export default router;
