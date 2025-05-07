import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPartie = async (req: Request, res: Response): Promise<void> => {
    // ton code ici

    const { joueurIds } = req.body; // tableau d’IDs des users

    if (!joueurIds || joueurIds.length < 2) {
        return;
    }

    try {
        const partie = await prisma.partie.create({
            data: {
                joueurs: {
                    create: joueurIds.map((userId: number) => ({
                        userId,
                    })),
                },
            },
        });

        res.status(201).json(partie);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur création partie" });
    }
};

export const saveScore = async (req: Request, res: Response): Promise<void> => {
    const { partieId, userId, atelier, distance, points } = req.body;

    if (!partieId || !userId || !atelier || !distance) {
        return;
    }

    try {
        const score = await prisma.score.create({
            data: {
                partieId,
                userId,
                atelier,
                distance,
                points,
            },
        });

        res.status(201).json(score);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur enregistrement score" });
    }
};

export const getParties = async (_req: Request, res: Response) => {
    try {
        const parties = await prisma.partie.findMany({
            include: {
                joueurs: {
                    include: {
                        user: true,
                    },
                },
                scores: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        res.status(200).json(parties);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur récupération parties" });
    }
};

export const getPartieById = async (req: Request, res: Response): Promise<void> => {
    const partieId = Number(req.params.id);
    if (isNaN(partieId)) {
        res.status(400).json({ message: 'ID de partie invalide' });
        return;
    }

    try {
        const partie = await prisma.partie.findUnique({
            where: { id: partieId },
            include: {
                joueurs: {
                    include: {
                        user: true, // 🔁 nom des joueurs
                    },
                },
                scores: {
                    include: {
                        user: true, // 🔁 nom du joueur qui a tiré
                    },
                },
            },
        });

        if (!partie) {
            res.status(404).json({ message: 'Partie introuvable' });
            return;
        }

        res.status(200).json(partie);
    } catch (error) {
        console.error('Erreur lors de la récupération de la partie :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

