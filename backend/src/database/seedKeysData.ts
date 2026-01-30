import pool from "../config/database";
import fs from "fs";
import path from "path";
import {KeyDetailsData} from "../types/keysTypes";

function parseDateDDMMYYYY(value: string): string {
    // Postgres DATE принимает YYYY-MM-DD
    const parts = value.split(".");
    if (parts.length !== 3) throw new Error(`Некорректная дата: "${value}"`);
    const [dd, mm, yyyy] = parts;
    if (!dd || !mm || !yyyy) throw new Error(`Некорректная дата: "${value}"`);
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}

function findKeysDataPath(): string {
    const candidates = [
        path.join(__dirname, "..", "data", "keysCatalogDataItems.json"),
        path.join(process.cwd(), "src", "data", "keysCatalogDataItems.json"),
        path.join(process.cwd(), "backend", "src", "data", "keysCatalogDataItems.json"),
    ];

    const found = candidates.find((p) => fs.existsSync(p));

    if (!found) {
        throw new Error(`Не найден keysCatalogDataItems.json. Проверенные пути: ${candidates.join(", ")}`);
    }

    return found;
}

export async function seedKeysData(): Promise<void> {

    console.log('Start seeding keys data...');
    const client = await pool.connect();

    try {
        const jsonPath = findKeysDataPath();
        const raw = fs.readFileSync(jsonPath, "utf8");

        const items: KeyDetailsData[] = JSON.parse(raw);

        await client.query("BEGIN");

        // Делаем сид идемпотентным: при повторном запуске не плодим дубликаты
        await client.query("TRUNCATE TABLE keys RESTART IDENTITY CASCADE");

        for (const item of items) {
            const releaseDate = parseDateDDMMYYYY(item.releaseDate);

            const insertKeyRes = await client.query(
                `
                INSERT INTO keys (
                    name,
                    key_url,
                    description,
                    price,
                    release_date,
                    main_picture_url,
                    developer,
                    publisher
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id
                `,
                [
                    item.name,
                    item.keyUrl,
                    item.description,
                    item.price,
                    releaseDate,
                    item.mainPicture,
                    item.developer,
                    item.publisher,
                ],
            );

            const keyId: number | undefined = insertKeyRes.rows?.[0]?.id;

            if (!keyId) {
                throw new Error(`Не удалось вставить ключ (игру): "${item.name}"`);
            }

            // Доп. картинки
            for (const [idx, url] of (item.otherPictures).entries()) {
                await client.query(
                    `
                    INSERT INTO key_images (key_id, url, sort_order)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (key_id, url) DO NOTHING
                    `,
                    [keyId, url, idx],
                );
            }

            // ОС
            for (const os of item.operationSystem) {
                await client.query(
                    `
                    INSERT INTO operation_systems (key_id, os)
                    VALUES ($1, $2)
                    ON CONFLICT (key_id, os) DO NOTHING
                    `,
                    [keyId, os],
                );
            }

            // Платформы активации
            for (const platform of item.activationPlatform) {
                await client.query(
                    `
                    INSERT INTO activation_platforms (key_id, platform)
                    VALUES ($1, $2)
                    ON CONFLICT (key_id, platform) DO NOTHING
                    `,
                    [keyId, platform],
                );
            }

            // Жанры
            for (const genre of item.genres) {
                await client.query(
                    `
                    INSERT INTO key_genres (key_id, genre)
                    VALUES ($1, $2)
                    ON CONFLICT (key_id, genre) DO NOTHING
                    `,
                    [keyId, genre],
                );
            }

            // Системные требования
            const minimal = item.systemRequirements.minimal;
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

            const recommended = item.systemRequirements.recommended;
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
        }

        await client.query("COMMIT");

        console.log(`Keys seeding finished`);
    } catch (err) {
        try {
            await client.query("ROLLBACK");
        } catch (_) {
            // ignore
        }
        console.error('Error while seeding keys:', err);
    } finally {
        client.release();
    }
}

if (require.main === module) {
    seedKeysData()
        .then(() => {
            console.log('Keys seed script completed successfully');
            process.exit(0);
        })
        .catch((err) => {
            console.error('Error while seeding keys:', err);
            process.exit(1);
        });
}