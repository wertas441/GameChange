import fs from 'fs';
import path from 'path';
import pool from "../config/database.js";
import {seedAdmin} from "./seedAdmin";
import {seedKeysData} from "./seedKeysData";

export const initDatabase = async (): Promise<void> => {
    try {
        console.log('Инициализация базы данных...');

        const schemaCandidates = [
            path.join(__dirname, 'schema.sql'),
            path.join(process.cwd(), 'src', 'database', 'schema.sql'),
            path.join(process.cwd(), 'backend', 'src', 'database', 'schema.sql'),
        ];

        const schemaPath = schemaCandidates.find((p) => fs.existsSync(p));
        if (!schemaPath) {
            throw new Error(`Не найден schema.sql. Проверенные пути: ${schemaCandidates.join(', ')}`);
        }

        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Выполняем SQL скрипт
        await pool.query(schema);

        await seedAdmin();
        await seedKeysData();

        console.log('База данных успешно инициализирована и заполнена данными');
    } catch (error) {
        console.error('Ошибка при инициализации базы данных:', error);
        throw error;
    }
};
