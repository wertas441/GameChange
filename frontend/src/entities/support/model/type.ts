
export type TicketType =  'Вопрос' | 'Жалоба';
export type TicketCategory =  'Пополнение сервисов' | 'Покупка подписки' | 'Получение товара' | 'Оплата' | 'Сервис' | 'Другое';
export type TicketStatus =  'Ожидает ответа' | 'Ответ получен';

export interface Ticket {
    id: string;
    type: TicketType;
    category: TicketCategory;
    title: string;
    description: string;
    status: TicketStatus;
    ownerName: string;
    createdAt: string;
    answer?: string;
    answeredAt?: string;
}