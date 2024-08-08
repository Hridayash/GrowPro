import express from 'express';
import {
  createResponse,
  getAllResponses,
  getResponseById,
  updateResponse,
  deleteResponse
} from '../controllers/response.js';

const router = express.Router();

router.post('/', createResponse);
router.get('/', getAllResponses);
router.get('/:id', getResponseById);
router.put('/:id', updateResponse);
router.delete('/:id', deleteResponse);

export default router;
