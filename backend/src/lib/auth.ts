import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { config } from '../config/index.js';

// Создаём отдельный пул для Better Auth
const pool = new Pool({
    host: config.database.host,
    port: config.database.port,
    database: config.database.name,
    user: config.database.user,
    password: config.database.password,
});

export const auth = betterAuth({
    database: pool,
    
    // Email и пароль аутентификация
    emailAndPassword: {
        enabled: true,
        // Минимальная длина пароля
        minPasswordLength: 8,
    },
    
    // Настройки сессии
    session: {
        // Время жизни сессии (7 дней)
        expiresIn: 60 * 60 * 24 * 7,
        // Обновлять сессию если осталось меньше 1 дня
        updateAge: 60 * 60 * 24,
    },
    
    // URL вашего приложения
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
    
    // Секретный ключ для подписи токенов
    secret: process.env.BETTER_AUTH_SECRET || config.jwtSecret,

    // Trusted origins для CORS
    trustedOrigins: [config.frontendUrl || 'http://localhost:3001'],
});

export default auth;

