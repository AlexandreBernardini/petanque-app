/// <reference types="../types/express" />
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addFriend = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId!;
    const { friendName } = req.body; // Nom de l'ami à ajouter

    // Cherche l'utilisateur par son nom
    const friend = await prisma.user.findFirst({
        where: { nom: friendName },
    });

    if (!friend) {
        return;
    }

    if (friend.id === userId) {
        return;
    }

    try {
        // Crée une relation "ami"
        await prisma.friend.create({
            data: {
                userId: userId!,
                friendId: friend.id,
            },
        });
        res.status(201).json({ message: `Ami ${friendName} ajouté avec succès !` });
    } catch (err) {
        res.status(400).json({ message: "Vous êtes déjà amis ou erreur" });
    }
};


export const getFriends = async (req: Request, res: Response) => {
    const userId = req.userId;

    // Récupère les amis
    const friends = await prisma.friend.findMany({
        where: { userId },
        include: { friend: true },
    });

    const list = friends.map((f) => ({
        id: f.friend.id,
        nom: f.friend.nom,
        email: f.friend.email,
    }));

    res.json(list);
};

export const removeFriend = async (req: Request, res: Response) => {
    const userId = req.userId!;
    const friendId = parseInt(req.params.id);

    try {
        await prisma.friend.delete({
            where: {
                userId_friendId: {
                    userId,
                    friendId,
                },
            },
        });

        res.status(200).json({ message: 'Ami supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Impossible de supprimer cet ami' });
    }
};


