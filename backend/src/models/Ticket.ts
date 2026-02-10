import { pool } from '../config/database';
import {
    TicketBaseStructure,
    TicketCategory,
    TicketCategoryLabel,
    TicketFullData,
    TicketType,
    TicketTypeLabel
} from "../types/support";

const ticketTypeLabels: Record<TicketType, TicketTypeLabel> = {
    question: 'Вопрос',
    complaint: 'Жалоба',
};

const ticketCategoryLabels: Record<TicketCategory, TicketCategoryLabel> = {
    'services-balance': 'Пополнение сервисов',
    subscription: 'Покупка подписки',
    'get-product': 'Получение товара',
    payment: 'Оплата',
    service: 'Сервис',
    other: 'Другое',
};

export class TicketModel {

    static async getList(userId: number): Promise<TicketFullData[] | undefined> {
        const isAdmin = await TicketModel.isAdmin(userId);
        const query = `
            SELECT
                t.public_id AS id,
                t.type AS type,
                t.category AS category,
                t.title AS title,
                t.description AS description,
                t.answer AS answer,
                t.answered_at AS "answeredAtRaw",
                to_char(t.created_at, 'DD.MM.YYYY') AS "createdAt",
                to_char(t.answered_at, 'DD.MM.YYYY') AS "answeredAt",
                u.username AS "ownerName"
            FROM support_tickets t
            JOIN users u ON u.id = t.user_id
            ${isAdmin ? '' : 'WHERE t.user_id = $1'}
            ORDER BY t.created_at DESC, t.id DESC
        `;

        const result = await pool.query(query, isAdmin ? [] : [userId]);

        return TicketModel.mapRows(result.rows);
    }

    static async add(userId: number, data: TicketBaseStructure): Promise<boolean> {
        const query = `
            INSERT INTO support_tickets (user_id, type, category, title, description, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
            RETURNING id
        `;

        const result = await pool.query(query, [userId, data.type, data.category, data.title, data.description]);

        return !!result.rows?.length;
    }

    static async getDetails(ticketId: string, userId: number): Promise<TicketFullData | undefined> {
        const isAdmin = await TicketModel.isAdmin(userId);
        const query = `
            SELECT
                t.public_id AS id,
                t.type AS type,
                t.category AS category,
                t.title AS title,
                t.description AS description,
                t.answer AS answer,
                t.answered_at AS "answeredAtRaw",
                to_char(t.created_at, 'DD.MM.YYYY') AS "createdAt",
                to_char(t.answered_at, 'DD.MM.YYYY') AS "answeredAt",
                u.username AS "ownerName"
            FROM support_tickets t
            JOIN users u ON u.id = t.user_id
            WHERE (t.public_id::text = $1 OR t.id::text = $1)
            ${isAdmin ? '' : 'AND t.user_id = $2'}
            LIMIT 1
        `;

        const result = await pool.query(query, isAdmin ? [ticketId] : [ticketId, userId]);
        const row = result.rows?.[0];
        if (!row) {
            return undefined;
        }

        return TicketModel.mapRow(row);
    }

    static async gaveAnswer(ticketId: string, adminId: number, answer: string): Promise<TicketFullData | undefined> {
        const isAdmin = await TicketModel.isAdmin(adminId);
        if (!isAdmin) {
            return undefined;
        }

        const query = `
            UPDATE support_tickets t
            SET answer = $2,
                answered_at = NOW(),
                updated_at = NOW()
            FROM users u
            WHERE (t.public_id::text = $1 OR t.id::text = $1)
              AND u.id = t.user_id
            RETURNING
                t.public_id AS id,
                t.type AS type,
                t.category AS category,
                t.title AS title,
                t.description AS description,
                t.answer AS answer,
                t.answered_at AS "answeredAtRaw",
                to_char(t.created_at, 'DD.MM.YYYY') AS "createdAt",
                to_char(t.answered_at, 'DD.MM.YYYY') AS "answeredAt",
                u.username AS "ownerName"
        `;

        const result = await pool.query(query, [ticketId, answer]);
        const row = result.rows?.[0];
        if (!row) {
            return undefined;
        }

        return TicketModel.mapRow(row);
    }

    static async delete(ticketId: string, userId: number): Promise<boolean> {
        const isAdmin = await TicketModel.isAdmin(userId);

        const query = `
            DELETE FROM support_tickets
            WHERE (public_id::text = $1 OR id::text = $1)
            ${isAdmin ? '' : 'AND user_id = $2'}
            RETURNING id
        `;

        const result = await pool.query(query, isAdmin ? [ticketId] : [ticketId, userId]);

        return !!result.rows?.length;
    }

    private static mapRows(rows: any[]): TicketFullData[] | undefined {
        if (!rows) return undefined;

        return rows.map((row) => TicketModel.mapRow(row));
    }

    private static mapRow(row: any): TicketFullData {
        const status = row.answeredAtRaw ? 'Ответ получен' : 'Ожидает ответа';
        const answeredAt = row.answeredAt ?? '-';

        return {
            id: row.id,
            type: ticketTypeLabels[row.type as TicketType],
            category: ticketCategoryLabels[row.category as TicketCategory],
            title: row.title,
            description: row.description,
            status,
            ownerName: row.ownerName,
            createdAt: row.createdAt,
            answer: row.answer ?? undefined,
            answeredAt,
        };
    }

    private static async isAdmin(userId: number): Promise<boolean> {
        const result = await pool.query(
            'SELECT is_admin AS "isAdmin" FROM users WHERE id = $1',
            [userId],
        );

        return Boolean(result.rows?.[0]?.isAdmin);
    }
}