import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getJoueurs = async (_req: Request, res: Response) => {
    const joueurs = await prisma.joueur.findMany();
    res.json(joueurs);
};

export const addJoueur = async (req: Request, res: Response) => {
    const { nom } = req.body;
    const nouveau = await prisma.joueur.create({ data: { nom } });
    res.status(201).json(nouveau);
};
