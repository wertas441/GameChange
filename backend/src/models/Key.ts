import { pool } from '../config/database';
import {AddKeyData, KeyDetailsData, KeyListData,} from "../types/key";

export class KeyModel {

    static async getList(): Promise<KeyListData[] | undefined> {
        const query = `
            SELECT
                k.id AS id,
                k.name AS name,
                k.key_url AS "keyUrl",
                k.price::text AS price,
                k.main_picture_url AS "mainPicture",
                to_char(k.release_date, 'DD.MM.YYYY') AS "releaseDate",
            
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

    static async getDetails(keyUrl: string): Promise<KeyDetailsData | undefined> {
        const query = `
            SELECT
                k.id AS id,
                k.key_url AS "keyUrl",
                k.name AS name,
                k.price::text AS price,
                k.description AS description,
                to_char(k.release_date, 'DD.MM.YYYY') AS "releaseDate",
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

    static async add(keyData: AddKeyData) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const insertKeyQuery = `
                INSERT INTO keys (key_url, name, description, price, release_date, main_picture_url, developer, publisher)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id
            `;

            const values = [
                keyData.keyUrl,
                keyData.name,
                keyData.description,
                keyData.price,
                keyData.releaseDate,
                keyData.mainPicture,
                keyData.developer,
                keyData.publisher,
            ];

            const insertResult = await client.query(insertKeyQuery, values);
            const keyId: number | undefined = insertResult.rows?.[0]?.id;

            if (!keyId) {
                throw new Error('Не удалось добавить ключ');
            }

            for (const [idx, url] of keyData.otherPictures.entries()) {
                await client.query(
                    `
                    INSERT INTO key_images (key_id, url, sort_order)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (key_id, url) DO NOTHING
                    `,
                    [keyId, url, idx],
                );
            }

            for (const os of keyData.operationSystem) {
                await client.query(
                    `
                    INSERT INTO operation_systems (key_id, os)
                    VALUES ($1, $2)
                    ON CONFLICT (key_id, os) DO NOTHING
                    `,
                    [keyId, os],
                );
            }

            for (const platform of keyData.activationPlatform) {
                await client.query(
                    `
                    INSERT INTO activation_platforms (key_id, platform)
                    VALUES ($1, $2)
                    ON CONFLICT (key_id, platform) DO NOTHING
                    `,
                    [keyId, platform],
                );
            }

            for (const genre of keyData.genres) {
                await client.query(
                    `
                    INSERT INTO key_genres (key_id, genre)
                    VALUES ($1, $2)
                    ON CONFLICT (key_id, genre) DO NOTHING
                    `,
                    [keyId, genre],
                );
            }

            const minimal = keyData.systemRequirements.minimal;
            if (minimal) {
                await client.query(
                    `
                    INSERT INTO key_system_requirements (key_id, profile, cpu, gpu, ram, memory)
                    VALUES ($1, 'minimal', $2, $3, $4, $5)
                    ON CONFLICT (key_id, profile) DO NOTHING
                    `,
                    [keyId, minimal.CPU, minimal.GPU, minimal.RAM, minimal.memory],
                );
            }

            const recommended = keyData.systemRequirements.recommended;
            if (recommended) {
                await client.query(
                    `
                    INSERT INTO key_system_requirements (key_id, profile, cpu, gpu, ram, memory)
                    VALUES ($1, 'recommended', $2, $3, $4, $5)
                    ON CONFLICT (key_id, profile) DO NOTHING
                    `,
                    [keyId, recommended.CPU, recommended.GPU, recommended.RAM, recommended.memory],
                );
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

    static async change(keyData: KeyDetailsData) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const updateKeyQuery = `
                UPDATE keys
                SET
                    key_url = $1,
                    name = $2,
                    description = $3,
                    price = $4,
                    release_date = $5,
                    main_picture_url = $6,
                    developer = $7,
                    publisher = $8,
                    updated_at = NOW()
                WHERE id = $9
                RETURNING id
            `;

            const values = [
                keyData.keyUrl,
                keyData.name,
                keyData.description,
                keyData.price,
                keyData.releaseDate,
                keyData.mainPicture,
                keyData.developer,
                keyData.publisher,
                keyData.id,
            ];

            const updateResult = await client.query(updateKeyQuery, values);
            const keyId: number | undefined = updateResult.rows?.[0]?.id;

            if (!keyId) {
                throw new Error('Ключ не найден');
            }

            await client.query('DELETE FROM key_images WHERE key_id = $1', [keyId]);
            await client.query('DELETE FROM operation_systems WHERE key_id = $1', [keyId]);
            await client.query('DELETE FROM activation_platforms WHERE key_id = $1', [keyId]);
            await client.query('DELETE FROM key_genres WHERE key_id = $1', [keyId]);
            await client.query('DELETE FROM key_system_requirements WHERE key_id = $1', [keyId]);

            for (const [idx, url] of keyData.otherPictures.entries()) {
                await client.query(
                    `
                    INSERT INTO key_images (key_id, url, sort_order)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (key_id, url) DO NOTHING
                    `,
                    [keyId, url, idx],
                );
            }

            for (const os of keyData.operationSystem) {
                await client.query(
                    `
                    INSERT INTO operation_systems (key_id, os)
                    VALUES ($1, $2)
                    ON CONFLICT (key_id, os) DO NOTHING
                    `,
                    [keyId, os],
                );
            }

            for (const platform of keyData.activationPlatform) {
                await client.query(
                    `
                    INSERT INTO activation_platforms (key_id, platform)
                    VALUES ($1, $2)
                    ON CONFLICT (key_id, platform) DO NOTHING
                    `,
                    [keyId, platform],
                );
            }

            for (const genre of keyData.genres) {
                await client.query(
                    `
                    INSERT INTO key_genres (key_id, genre)
                    VALUES ($1, $2)
                    ON CONFLICT (key_id, genre) DO NOTHING
                    `,
                    [keyId, genre],
                );
            }

            const minimal = keyData.systemRequirements.minimal;
            await client.query(
                `
                INSERT INTO key_system_requirements (key_id, profile, cpu, gpu, ram, memory)
                VALUES ($1, 'minimal', $2, $3, $4, $5)
                ON CONFLICT (key_id, profile) DO NOTHING
                `,
                [keyId, minimal.CPU, minimal.GPU, minimal.RAM, minimal.memory],
            );

            const recommended = keyData.systemRequirements.recommended;
            await client.query(
                `
                INSERT INTO key_system_requirements (key_id, profile, cpu, gpu, ram, memory)
                VALUES ($1, 'recommended', $2, $3, $4, $5)
                ON CONFLICT (key_id, profile) DO NOTHING
                `,
                [keyId, recommended.CPU, recommended.GPU, recommended.RAM, recommended.memory],
            );

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

    static async delete(keyId: number): Promise<boolean> {
        const query = `DELETE FROM keys WHERE id = $1 RETURNING id`;

        const { rowCount } = await pool.query(query, [keyId]);

        return (rowCount ?? 0) > 0;
    }


}