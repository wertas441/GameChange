import { pool } from '../config/database';
import {
    PurchaseCreateItem,
    PurchasesItem,
    User,
    UserCreateRequest,
    UserProfileResponse
} from "../types/user";

export class UserModel {

    // Создание нового пользователя
    static async create(userData: UserCreateRequest): Promise<User> {
        const query = `
        INSERT INTO users (email, username, password_hash, created_at, updated_at)
        VALUES ($1, $2, $3, NOW(), NOW())
        RETURNING id, email, username, created_at, updated_at
        `;

        const values = [userData.email, userData.userName, userData.hashedPassword];
        const result = await pool.query(query, values);
        const row = result.rows[0];

        return {
            id: row.id,
            email: row.email,
            userName: row.username,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        } as User;
    }

    // Поиск пользователя по email
    static async findByEmail(email: string): Promise<User | null> {
        const query = `
        SELECT  id, 
                email, 
                username, 
                password_hash AS password, 
                created_at, 
                updated_at 
        FROM users 
        WHERE email = $1
        `;

        const result = await pool.query(query, [email]);
        const row = result.rows[0];
        if (!row) return null;

        return {
            id: row.id,
            email: row.email,
            userName: row.username,
            password: row.password,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        } as User;
    }

    // Поиск пользователя по ID
    static async findById(id: number): Promise<UserProfileResponse | null> {
        const query = `
        SELECT  public_id, 
                email, 
                username, 
                created_at,
                is_admin AS "isAdmin"
        FROM users 
        WHERE id = $1
        `;

        const result = await pool.query(query, [id]);

        const row = result.rows[0];
        if (!row) return null;

        return {
            publicId: row.public_id,
            email: row.email,
            userName: row.username,
            createdAt: row.created_at,
            isAdmin: row.isAdmin,
        } as UserProfileResponse;
    }

    // Поиск пользователя по userName
    static async findByUserName(userName: string): Promise<User | null> {
        const query = `
        SELECT  id, 
                email, 
                username, 
                password_hash AS password, 
                created_at, 
                updated_at 
        FROM users 
        WHERE username = $1`
        ;

        const result = await pool.query(query, [userName]);
        const row = result.rows[0];
        if (!row) return null;

        return {
            id: row.id,
            email: row.email,
            userName: row.username,
            password: row.password,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        } as User;
    }

    static async getPurchases(userId: number): Promise<PurchasesItem[]> {
        const query = `
            SELECT
                p.key_id AS "keyId",
                k.key_url AS "keyUrl",
                k.name AS name,
                k.main_picture_url AS "mainImage",
                p.price AS price,
                p.count AS count,
                to_char(COALESCE(p.date, p.created_at), 'DD.MM.YYYY') AS date
            FROM purchases p
            JOIN keys k ON k.id = p.key_id
            WHERE p.user_id = $1
            ORDER BY COALESCE(p.date, p.created_at) DESC, p.id DESC
        `;

        const result = await pool.query(query, [userId]);

        return result.rows ?? [];
    }

    static async addPurchases(userId: number, items: PurchaseCreateItem[]): Promise<void> {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const insertQuery = `
                INSERT INTO purchases (user_id, key_id, price, count, date)
                VALUES ($1, $2, $3, $4, NOW())
            `;

            for (const item of items) {
                if (!item?.keyId || !item.count || item.count <= 0) {
                    continue;
                }
                await client.query(insertQuery, [userId, item.keyId, item.price, item.count]);
            }

            await client.query('COMMIT');
        } catch (error) {
            try {
                await client.query('ROLLBACK');
            } catch (_) {
                // ignore rollback errors
            }
            throw error;
        } finally {
            client.release();
        }
    }

    static async isAdmin(userId: number): Promise<boolean> {
        const result = await pool.query(
            'SELECT is_admin FROM users WHERE id = $1',
            [userId],
        );

        if (result.rows.length > 0) return result.rows[0].is_admin;

        return false;
    }
}
