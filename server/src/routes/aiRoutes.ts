import express from 'express';
import { getAIRecommendations } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/recommendations', protect, getAIRecommendations);

export default router;
