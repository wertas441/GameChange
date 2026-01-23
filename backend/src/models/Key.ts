import { pool } from '../config/database';
import {KeysDataStructure} from "../types/keysTypes";

export class KeyModel {

    static async getKeys(): Promise<KeysDataStructure[] | undefined> {
        const query = `
            SELECT
                k.id AS id,
                k.name AS name,
                k.price::text AS price,
                k.main_picture_url AS "picture",
                to_char(k.release_date, 'DD.MM.YYYY') AS "releaseData",
            
                COALESCE(
                    (
                        SELECT json_agg(os.os ORDER BY os.os)
                        FROM operation_systems os
                        WHERE os.key_id = k.id
                    ),
                    '[]'::json
                ) AS "operationSystem",
                COALESCE(
                    (
                        SELECT json_agg(ap.platform ORDER BY ap.platform)
                        FROM activation_platforms ap
                        WHERE ap.key_id = k.id
                    ),
                    '[]'::json
                ) AS "activationPlatform",
                COALESCE(
                    (
                        SELECT json_agg(kg.genre ORDER BY kg.genre)
                        FROM key_genres kg
                        WHERE kg.key_id = k.id
                    ),
                    '[]'::json
                ) AS "genres"
            FROM keys k
            ORDER BY k.id ASC
        `;

        const result = await pool.query(query);

        return result.rows ?? undefined;
    }
}