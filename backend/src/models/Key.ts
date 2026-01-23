import { pool } from '../config/database';
import {KeyDataStructure, KeysDataStructure} from "../types/keysTypes";

export class KeyModel {

    static async getKeys(): Promise<KeysDataStructure[] | undefined> {
        const query = `
            SELECT
                k.id AS id,
                k.name AS name,
                k.key_url AS "keyUrl",
                k.price::text AS price,
                k.main_picture_url AS "mainPicture",
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

    static async getKeyDetails(keyUrl: string): Promise<KeyDataStructure | undefined> {
        const query = `
            SELECT
                k.id AS id,
                k.key_url AS "keyUrl",
                k.name AS name,
                k.price::text AS price,
                k.description AS description,
                to_char(k.release_date, 'DD.MM.YYYY') AS "releaseData",
                k.main_picture_url AS "mainPicture",
                k.developer AS developer,
                k.publisher AS publisher,

                COALESCE(
                    (
                        SELECT json_agg(ki.url ORDER BY ki.sort_order)
                        FROM key_images ki
                        WHERE ki.key_id = k.id
                    ),
                    '[]'::json
                ) AS "otherPictures",
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
                ) AS "genres",
                COALESCE(
                    (
                        SELECT json_object_agg(
                            req.profile,
                            json_build_object(
                                'CPU', req.cpu,
                                'GPU', req.gpu,
                                'RAM', req.ram,
                                'memory', req.memory
                            )
                        )
                        FROM key_system_requirements req
                        WHERE req.key_id = k.id
                    ),
                    '{}'::json
                ) AS "systemRequirements"
            FROM keys k
            WHERE k.key_url = $1
            LIMIT 1
        `;

        const result = await pool.query(query, [keyUrl]);

        return result.rows?.[0] ?? undefined;
    }
}