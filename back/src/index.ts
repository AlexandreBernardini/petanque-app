import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import joueurRoutes from './routes/joueur.routes';
import authRoutes from './routes/auth.routes';
import friendRoutes from './routes/friend.routes';
import userRoutes from './routes/user.routes';
import partieRoutes from './routes/partie.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/joueurs', joueurRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/users', userRoutes);
app.use('/api/parties', partieRoutes);

const PORT:string | 3001 = process.env.PORT || 3001;
app.listen(PORT, ():void => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
