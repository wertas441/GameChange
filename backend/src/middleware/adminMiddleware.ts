import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserModel } from '../models/User';

export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const bearer = req.headers.authorization?.replace('Bearer ', '');
        const token = (req as any).cookies?.token || bearer;

        if (!token) return res.status(401).json({ success: false, error: 'Не авторизовано' });

        const payload = jwt.verify(token, config.jwtSecret as string) as { userId: number };

        const userId = payload.userId;
        const hasAdminAccess = await UserModel.isAdmin(userId);

        if (!hasAdminAccess) {
            return res.status(403).json({ success: false, error: 'Доступ запрещён' });
        }

        (req as any).userId = userId;

        next();
    } catch {
        return res.status(401).json({ success: false, error: 'Не авторизовано' });
    }
}
