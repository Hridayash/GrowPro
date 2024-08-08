import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createFeedback = async (req, res) => {
  const { title, userId, questions } = req.body;
  try {
    const feedback = await prisma.feedback.create({
      data: {
        Title: title,
        UserId: userId,
        Questions: {
          create: questions.map(question => ({ Text: question.text }))
        }
      }
    });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      include: { Questions: true }
    });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getFeedbackById = async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await prisma.feedback.findUnique({
      where: { Id: parseInt(id) },
      include: { Questions: true }
    });
    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ error: 'Feedback not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const feedback = await prisma.feedback.update({
      where: { Id: parseInt(id) },
      data: { Title: title }
    });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteFeedback = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.feedback.delete({ where: { Id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
