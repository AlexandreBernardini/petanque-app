import { Router } from 'express';
import {addFriend, getFriends, removeFriend} from '../controllers/friend.controller';
import { verifyToken } from '../middleware/auth.middleware'; // à faire

const router = Router();

router.post('/add', verifyToken, addFriend); // On garde la route pour ajouter un ami
router.get('/', verifyToken, getFriends); // Pour obtenir la liste des amis
router.delete('/:id', verifyToken, removeFriend);


export default router;
