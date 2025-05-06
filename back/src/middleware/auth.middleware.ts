import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'yac-secret';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return;

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET) as { id: number };
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token invalide' });
    }
};
