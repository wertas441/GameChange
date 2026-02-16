import { pool } from '../config/database';
import {ReviewBaseStructure, ReviewListStructure} from "../types/review";

export class ReviewModel {

    static async getList(): Promise<ReviewListStructure[] | undefined> {

        const query = `
            SELECT
                r.id AS id,
                r.user_name AS "userName",
                r.description AS description,
                r.tag AS tag,
                r.rating AS rating,
                to_char(COALESCE(r.date, r.created_at), 'DD.MM.YYYY') AS date
            FROM reviews r
            ORDER BY COALESCE(r.date, r.created_at) DESC, r.id DESC
        `;

        const result = await pool.query(query);

        return result.rows ?? undefined;
    }


    static async add(userId: number, data: ReviewBaseStructure): Promise<boolean> {
        const query = `
            INSERT INTO reviews (user_name, description, tag, rating, date)
            SELECT u.username, $2, $3, $4, NOW()
            FROM users u
            WHERE u.id = $1
            RETURNING id
        `;

        const result = await pool.query(query, [userId, data.description, data.tag, data.rating]);

        return !!result.rows;
    }
}