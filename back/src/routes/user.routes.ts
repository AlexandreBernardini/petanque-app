import { Router } from 'express';
import { getAllUsers } from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/all', verifyToken, getAllUsers);

export default router;
