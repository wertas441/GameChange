import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { config } from './config';
import {testConnection} from "./config/database.js";
import {initDatabase} from "./database/init.js";
import keyRoute from './routes/key';
import userRoute from './routes/user';
import reviewRoute from './routes/review';

const shouldInit = process.env.DB_AUTO_INIT === 'true';

// Загружаем переменные окружения
dotenv.config();

const app = express();
const PORT = config.port;

// HTTP-сервер, чтобы можно было корректно его останавливать
let server: http.Server | null = null;

// Middleware
app.use(helmet()); // Безопасность

app.use(cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('combined')); // Логирование
app.use(express.json()); // Парсинг JSON
app.use(express.urlencoded({ extended: true })); // Парсинг URL-encoded данных
app.use(cookieParser()); // Куки

app.use('/api/user', userRoute)
app.use('/api/key', keyRoute);
app.use('/api/review', reviewRoute);

app.use((req, res) => {
    res.status(404).json({
        error: 'Маршрут не найден',
        path: req.originalUrl
    });
});

// Обработка ошибок
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const isDev = process.env.NODE_ENV !== 'production';
    // Расширенное логирование в консоль
    console.error('Глобальная ошибка:', {
        path: req.originalUrl,
        method: req.method,
        message: err?.message,
        stack: isDev ? err?.stack : undefined
    });
    res.status(500).json({
        error: 'Внутренняя ошибка сервера',
        message: isDev ? (err?.message || 'Неизвестная ошибка') : 'Что-то пошло не так'
    });
});

// Инициализация и запуск сервера
const startServer = async () => {
    try {
        const dbConnected = await testConnection();
        if (!dbConnected) {
            console.error('Не удалось подключиться к базе данных');
            process.exit(1);
        }

        if (shouldInit) {
            await initDatabase();
        }

        // Запускаем HTTP сервер
        server = http.createServer(app);

        server.listen(PORT, () => {
            console.log(`Сервер запущен на порту ${PORT}`);
        });
    } catch (error) {
        console.error('Ошибка при запуске сервера:', error);
        process.exit(1);
    }
};

// Обработка завершения процесса
let isShuttingDown = false;

const gracefulShutdown = async (signal: string) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`\nПолучен сигнал ${signal}, завершаем работу...`);

    try {
        if (server) {
            await new Promise<void>((resolve, reject) => {
                server!.close((err) => {
                    if (err) {
                        console.error('Ошибка при остановке HTTP сервера:', err);
                        return reject(err);
                    }
                    console.log('HTTP сервер корректно остановлен');
                    resolve();
                });
            });
        }

    } catch (error) {
        console.error('Ошибка при корректном завершении работы:', error);
    } finally {
        process.exit(0);
    }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Запускаем сервер
startServer();

export default app;
