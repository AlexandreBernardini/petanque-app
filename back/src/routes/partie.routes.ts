import express from 'express';
import { createPartie, saveScore, getParties, getPartieById } from '../controllers/partie.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', verifyToken, createPartie);
router.post('/score', verifyToken, saveScore);
router.get('/', verifyToken, getParties);
router.get('/:id', verifyToken, getPartieById);

export default router;
