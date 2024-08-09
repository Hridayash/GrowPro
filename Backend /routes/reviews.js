import express from 'express';
const router = express.Router();
import { PrismaClient } from '@prisma/client';
import authenticateToken from '../middleware/authentication.js';

const prisma = new PrismaClient();

// Create a new review
router.post('/', authenticateToken, async (req, res) => {
  const { userId, ratings, comment } = req.body;

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
        userId: parseInt(userId),
        ...parsedRatings,
        comment,
      },
    });
    res.json(newReview);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch reviews for a user
router.get('/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { userId: parseInt(userId) },
      include: { User: true },
    });

    const averageRatings = reviews.map(review => {
      const totalRating = Object.values(review).reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);
      return Math.floor(totalRating / 10); // Adjust based on your rating system
    });

    const overallAverageRating = averageRatings.length ? averageRatings.reduce((sum, rating) => sum + rating, 0) / averageRatings.length : 0;

    res.json({ reviews, overallAverageRating });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/' , authenticateToken  , async(req,res)=>{
  const response = await prisma.review.findMany({
    include : {User : true}
  })
  res.json(response)
})

export default router;
