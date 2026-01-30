import express from 'express';
import { getAIRecommendations } from '../controllers/aiController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/recommendations', protect, getAIRecommendations);

export default router;
