import fs from 'fs';
import path from 'path';
import {seedData} from "./seedData.js";
import pool from "../config/database.js";

export const initDatabase = async (): Promise<void> => {
    try {
        console.log('Инициализация базы данных...');

        // Читаем SQL файл со схемой
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Выполняем SQL скрипт
        await pool.query(schema);

        await seedData();

        console.log('База данных успешно инициализирована и заполнена данными');
    } catch (error) {
        console.error('Ошибка при инициализации базы данных:', error);
        throw error;
    }
};
