import express from 'express';
import { createTest, getUserTests, deleteTest } from '../controllers/textController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', authMiddleware, createTest);
router.get('/', authMiddleware, getUserTests);
router.delete('/:id', authMiddleware, deleteTest);

export default router;