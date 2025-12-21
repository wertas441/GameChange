import prisma from '../lib/prisma.js';

/**
 * Простая проверка подключения к базе данных через Prisma.
 * Возвращает true, если подключение успешно.
 */
export const testConnection = async (): Promise<boolean> => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return true;
    } catch (error) {
        console.error('Ошибка подключения к базе данных (Prisma):', error);
        return false;
    }
};

/**
 * Корректное завершение работы Prisma-клиента.
 */
export const closePool = async (): Promise<void> => {
    try {
        await prisma.$disconnect();
    } catch (error) {
        console.error('Ошибка при отключении Prisma-клиента:', error);
    }
};


