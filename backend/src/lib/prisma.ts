import { PrismaClient } from '@prisma/client';

// Один общий экземпляр PrismaClient для всего приложения
export const prisma = new PrismaClient();

export default prisma;






