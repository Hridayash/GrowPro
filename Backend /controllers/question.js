import { PrismaClient } from "@prisma/client";

const prisma =new PrismaClient()

export const createQuestion = async (req, res) => {
  const { text, feedbackId } = req.body;
  try {
    const question = await prisma.question.create({
      data: {
        text: text,
        feedbackId: feedbackId
      }
    });
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany();
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await prisma.question.findUnique({ where: { id: parseInt(id) } });
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { text, feedbackId } = req.body;
  try {
    const question = await prisma.question.update({
      where: { id: parseInt(id) },
      data: { text: text, feedbackId: feedbackId }
    });
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.question.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
