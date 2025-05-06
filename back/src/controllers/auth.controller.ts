import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const SECRET: string = process.env.JWT_SECRET || 'yac-secret-key';
const prisma = new PrismaClient();


export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(401).json({ message: 'Email incorrect' });
        return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        res.status(401).json({ message: 'Mot de passe incorrect' });
        return;
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: '7d' }
    );

    res.status(200).json({
        message: 'Connexion réussie',
        token,
        user: { id: user.id, email: user.email, nom: user.nom }
    });
};

export const register = async (req: Request, res: Response): Promise<void> => {
    const { nom, email, password } = req.body;

    try {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            res.status(400).json({ message: 'Email déjà utilisé' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                nom,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: { id: user.id, nom: user.nom, email: user.email },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


