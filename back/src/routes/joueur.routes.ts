import { Router } from 'express';
import { getJoueurs, addJoueur } from '../controllers/joueur.controller';

const router = Router();

router.get('/', getJoueurs);
router.post('/', addJoueur);

export default router;
