import { Router } from 'express';
import keysRoutes from './keys.js';
import authRoutes from "./auth";
import app from "../index";

const router = Router();

app.use((req, res) => {
    res.status(404).json({
        error: 'Маршрут не найден',
        path: req.originalUrl
    });
});

app.use('/api/auth', authRoutes)
app.use('/api/keys', keysRoutes);

export default router;
