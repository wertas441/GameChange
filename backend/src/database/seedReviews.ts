import pool from "../config/database";
import fs from "fs";
import path from "path";
import {ReviewListStructure} from "../types/review";
import {parseDateDDMMYYYY} from "../lib/indexUtils";

function findReviewsDataPath(): string {
    const candidates = [
        path.join(__dirname, "..", "data", "reviews.json"),
        path.join(process.cwd(), "src", "data", "reviews.json"),
        path.join(process.cwd(), "backend", "src", "data", "reviews.json"),
    ];

    const found = candidates.find((p) => fs.existsSync(p));

    if (!found) {
        throw new Error(`Не найден reviews.json. Проверенные пути: ${candidates.join(", ")}`);
    }

    return found;
}


export async function seedReviews(): Promise<void> {

    console.log('Reviews start seeding...');
    const client = await pool.connect();

    try {
        const jsonPath = findReviewsDataPath();
        const raw = fs.readFileSync(jsonPath, "utf8");
        const items: ReviewListStructure[] = JSON.parse(raw);

        await client.query("BEGIN");
        await client.query("TRUNCATE TABLE reviews RESTART IDENTITY");

        for (const item of items) {
            const reviewDate = parseDateDDMMYYYY(item.date);
            await client.query(
                `
                INSERT INTO reviews (user_name, description, tag, rating, date)
                VALUES ($1, $2, $3, $4, $5)
                `,
                [item.userName, item.description, item.tag, item.rating, reviewDate],
            );
        }

        await client.query("COMMIT");
        console.log('Reviews seeding finished');
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (_) {
            // ignore
        }
        console.error('Error while seeding reviews data:', error);
    } finally {
        client.release();
    }
}

if (require.main === module) {
    seedReviews()
        .then(() => {
            console.log('Reviews seed script completed successfully');
            process.exit(0);
        })
        .catch((err) => {
            console.error('Error while seeding reviews data:', err);
            process.exit(1);
        });
}


