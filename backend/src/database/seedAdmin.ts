import pool from "../config/database";
import bcrypt from "bcryptjs";

export async function seedAdmin(): Promise<void> {

    console.log('Admin start seeding...');
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

        console.log(`Admin seeding finished`);
    } catch (err) {
        console.error('Error while seeding admin data:', err);
    } finally {
        client.release();
    }
}

// Позволяем запускать файл напрямую или через скомпилированный JS
if (require.main === module) {
    seedAdmin()
        .then(() => {
            console.log('Admin seed script completed successfully');
            process.exit(0);
        })
        .catch((err) => {
            console.error('Error while seeding admin data:', err);
            process.exit(1);
        });
}