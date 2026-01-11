import pool from "../config/database";
import bcrypt from "bcryptjs";

export async function seedShopData(): Promise<void> {

    console.log('Start seeding...');
    const client = await pool.connect();

    try {
        const email = 'admin441@gmail.com';
        const userName = 'admin441';
        const password = 'adminPassword123';

        const isAdminInBase = await client.query(
            `SELECT 1 FROM users WHERE username = $1 OR email = $2 LIMIT 1`,
            [userName, email],
        );

        if (isAdminInBase.rowCount && isAdminInBase.rowCount > 0) {
            console.log('admin is already in database');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await client.query(
            `INSERT INTO users (email, username, password_hash, is_Admin)
             VALUES ($1, $2, $3, $4)`,
            [email, userName, hashedPassword, true],
        );

        console.log(`Seeding finished`);
    } catch (err) {
        console.error('Error while seeding:', err);
    } finally {
        client.release();
    }
}

// Позволяем запускать файл напрямую: `ts-node src/database/seedExercises.ts` или через скомпилированный JS
if (require.main === module) {
    seedShopData()
        .then(() => {
            console.log('Seed script completed successfully');
            process.exit(0);
        })
        .catch((err) => {
            console.error('Error while seeding exercises:', err);
            process.exit(1);
        });
}