import prisma from '../lib/prisma.js';

/**
 * Базовая инициализация / сидирование базы данных.
 * Здесь вы можете создавать дефолтных пользователей, роли и т.п.
 * Сейчас функция ничего не «ломает» и просто убеждается, что Prisma работает.
 */
export const initDatabase = async (): Promise<void> => {
    console.log('Инициализация базы данных через Prisma...');

    try {
        // Простой запрос для проверки работоспособности
        await prisma.$queryRaw`SELECT 1`;

        // Пример сидирования (закомментировано, чтобы не мешать):
        // const adminEmail = 'admin@example.com';
        // const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
        // if (!existingAdmin) {
        //     await prisma.user.create({
        //         data: {
        //             email: adminEmail,
        //             password: 'changeme', // замените на хешированный пароль
        //         },
        //     });
        //     console.log('Создан дефолтный администратор.');
        // }

        console.log('Инициализация базы данных завершена.');
    } catch (error) {
        console.error('Ошибка при инициализации базы данных:', error);
        throw error;
    }
};

export default initDatabase;


