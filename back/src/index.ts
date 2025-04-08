import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import joueurRoutes from './routes/joueur.routes';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/joueurs', joueurRoutes);
app.use('/api/auth', authRoutes);

const PORT:string | 3001 = process.env.PORT || 3001;
app.listen(PORT, ():void => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
