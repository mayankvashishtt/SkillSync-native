import express from 'express';
import { getHabits, createHabit, updateHabit, deleteHabit, checkInHabit } from '../controllers/habitController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getHabits);
router.post('/', createHabit);
router.put('/:id', updateHabit);
router.delete('/:id', deleteHabit);
router.post('/:id/check-in', checkInHabit);

export default router;
