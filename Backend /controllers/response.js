import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createResponse = async (req, res) => {
  const { answer, questionId, userId } = req.body;
  try {
    const response = await prisma.response.create({
      data: { answer, questionId, userId }
    });
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllResponses = async (req, res) => {
  try {
    const responses = await prisma.response.findMany({
      include: { question: true, user: true }
    });
    res.status(200).json(responses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getResponseById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.response.findUnique({
      where: { id: parseInt(id) },
      include: { question: true, user: true }
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Response not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateResponse = async (req, res) => {
  const { id } = req.params;
  const { answer, questionId, userId } = req.body;
  try {
    const response = await prisma.response.update({
      where: { id: parseInt(id) },
      data: { answer, questionId, userId }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteResponse = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.response.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
