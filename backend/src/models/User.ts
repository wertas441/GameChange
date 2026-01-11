import { pool } from '../config/database';
import {
    User,
    UserCreateRequest,
    UserProfileResponse
} from "../types/auth";

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

}
