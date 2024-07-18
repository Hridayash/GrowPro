// Import necessary modules
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

// Endpoint to fetch profile by user ID
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await prisma.profile.findUnique({
      where: { UserId: parseInt(userId) },
    });
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router;
