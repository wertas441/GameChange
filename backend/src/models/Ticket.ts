import {pool} from '../config/database';
import {
    TicketBackendBaseStructure,
    TicketBackendCategory,
    TicketBackendStructure,
    TicketBackendType,
    TicketFrontendCategory,
    TicketFrontendData,
    TicketFrontendType
} from "../types/support";

const ticketTypeLabels: Record<TicketBackendType, TicketFrontendType> = {
    question: 'Вопрос',
    complaint: 'Жалоба',
};

const ticketCategoryLabels: Record<TicketBackendCategory, TicketFrontendCategory> = {
    'services-balance': 'Пополнение сервисов',
    subscription: 'Покупка подписки',
    'get-product': 'Получение товара',
    payment: 'Оплата',
    service: 'Сервис',
    other: 'Другое',
};

export class TicketModel {

    static async getList(userId: number, isAdmin: boolean): Promise<TicketFrontendData[] | undefined> {

        const query = `
            SELECT
                t.public_id AS id,
                t.type AS type,
                t.category AS category,
                t.title AS title,
                t.description AS description,
                t.answer AS answer,
                t.answered_at AS "answeredAt",
                to_char(t.created_at, 'DD.MM.YYYY') AS "createdAt",
                to_char(t.answered_at, 'DD.MM.YYYY') AS "answeredAt",
                u.username AS "ownerName"
            FROM support_tickets t
            JOIN users u ON u.id = t.user_id
            WHERE t.status = false ${isAdmin ? '' : 'AND t.user_id = $1'}
            ORDER BY t.created_at DESC, t.id DESC
        `;

        const result = await pool.query(query, isAdmin ? [] : [userId]);

        return TicketModel.mapRows(result.rows);
    }

    static async getHistoryList(userId: number, isAdmin: boolean): Promise<TicketFrontendData[] | undefined> {

        const query = `
            SELECT
                t.public_id AS id,
                t.type AS type,
                t.category AS category,
                t.title AS title,
                t.description AS description,
                t.answer AS answer,
                t.answered_at AS "answeredAt",
                to_char(t.created_at, 'DD.MM.YYYY') AS "createdAt",
                to_char(t.answered_at, 'DD.MM.YYYY') AS "answeredAt",
                u.username AS "ownerName"
            FROM support_tickets t
            JOIN users u ON u.id = t.user_id
            WHERE t.status = true ${isAdmin ? '' : 'AND t.user_id = $1'}
            ORDER BY t.created_at DESC, t.id DESC
        `;

        const result = await pool.query(query, isAdmin ? [] : [userId]);

        return TicketModel.mapRows(result.rows);
    }

    static async add(userId: number, data: TicketBackendBaseStructure): Promise<boolean> {

        const query = `
            INSERT INTO support_tickets (user_id, type, category, title, description, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
            RETURNING id
        `;

        const queryData = [
            userId,
            data.type,
            data.category,
            data.title,
            data.description,
        ]

        const result = await pool.query(query, queryData);

        return !!result.rows?.length;
    }

    static async getDetails(ticketId: string, userId: number, isAdmin: boolean): Promise<TicketFrontendData | undefined> {

        const query = `
            SELECT
                t.public_id AS id,
                t.type AS type,
                t.category AS category,
                t.title AS title,
                t.description AS description,
                t.answer AS answer,
                t.answered_at AS "answeredAt",
                to_char(t.created_at, 'DD.MM.YYYY') AS "createdAt",
                to_char(t.answered_at, 'DD.MM.YYYY') AS "answeredAt",
                u.username AS "ownerName"
            FROM support_tickets t
            JOIN users u ON u.id = t.user_id
            WHERE t.public_id = $1
            ${isAdmin ? '' : 'AND t.user_id = $2'}
        `;

        const result = await pool.query(query, isAdmin ? [ticketId] : [ticketId, userId]);

        const row = result.rows?.[0];
        if (!row) {
            return undefined;
        }

        return TicketModel.mapRow(row);
    }

    static async gaveAnswer(ticketId: string, answer: string): Promise<boolean> {

        const query = `
            UPDATE support_tickets t
            SET answer = $2, 
                status = true,
                answered_at = NOW(),
                updated_at = NOW()
            FROM users u
            WHERE t.public_id = $1 AND u.id = t.user_id
            RETURNING t.id
        `;

        const result = await pool.query(query, [ticketId, answer]);

        return !!result.rows?.length;
    }

    static async delete(ticketId: string): Promise<boolean> {

        const query = `
            DELETE FROM support_tickets
            WHERE public_id = $1
            RETURNING id
        `;

        const result = await pool.query(query, [ticketId]);

        return !!result.rows?.length;
    }

    private static mapRows(rows: TicketBackendStructure[]): TicketFrontendData[] | undefined {
        if (!rows) return undefined;

        return rows.map((row) => TicketModel.mapRow(row));
    }

    private static mapRow(row: TicketBackendStructure): TicketFrontendData {

        return {
            id: row.id,
            type: ticketTypeLabels[row.type as TicketBackendType],
            category: ticketCategoryLabels[row.category as TicketBackendCategory],
            title: row.title,
            description: row.description,
            status: row.answeredAt ? 'Ответ получен' : 'Ожидает ответа',
            ownerName: row.ownerName,
            createdAt: row.createdAt,
            answer: row.answer ?? undefined,
            answeredAt: row.answeredAt ?? undefined,
        };
    }
}