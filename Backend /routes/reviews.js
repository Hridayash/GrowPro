import express from 'express';
const router = express.Router();
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middleware/authentication.js';
const prisma = new PrismaClient();

// Create a new review
router.post('/', async (req, res) => {
  const { userId, ratings, comment } = req.body;

  // Ensure ratings are parsed as integers
  const parsedRatings = {
    qualityOfWork: parseInt(ratings?.qualityOfWork),
    productivity: parseInt(ratings?.productivity),
    attendanceAndPunctuality: parseInt(ratings?.attendanceAndPunctuality),
    communicationSkills: parseInt(ratings?.communicationSkills),
    teamwork: parseInt(ratings?.teamwork),
    problemSolvingAbilities: parseInt(ratings?.problemSolvingAbilities),
    initiative: parseInt(ratings?.initiative),
    adaptability: parseInt(ratings?.adaptability),
    leadershipPotential: parseInt(ratings?.leadershipPotential),
    customerSatisfaction: parseInt(ratings?.customerSatisfaction),
  };

  try {
    const newReview = await prisma.review.create({
      data: {
        userId: parseInt(userId), // Ensure userId is parsed as integer
        ...parsedRatings,
        comment,
      },
    });
    res.json(newReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        User: true, // Include the user information if needed
      },
    });
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
