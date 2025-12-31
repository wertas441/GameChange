import pg from 'pg';
import { config } from '../config/index.js';

const { Pool } = pg;

// Создаём пул подключений к PostgreSQL
export const pool = new Pool({
    host: config.database.host,
    port: config.database.port,
    database: config.database.name,
    user: config.database.user,
    password: config.database.password,
});

// Проверка подключения к базе данных
export const testConnection = async (): Promise<boolean> => {
    try {
        const client = await pool.connect();
        await client.query('SELECT 1');
        client.release();
        console.log('Подключение к PostgreSQL успешно');
        return true;
    } catch (error) {
        console.error('Ошибка подключения к PostgreSQL:', error);
        return false;
    }
};

// Закрытие пула подключений
export const closePool = async (): Promise<void> => {
    try {
        await pool.end();
        console.log('Пул подключений PostgreSQL закрыт');
    } catch (error) {
        console.error('Ошибка при закрытии пула:', error);
    }
};

export default pool;

