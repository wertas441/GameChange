
export type TicketType =  'question' | 'complaint';
export type TicketCategory =  'services-balance' | 'subscription' | 'get-product' | 'payment' | 'service' | 'other';
export type TicketTypeLabel = 'Вопрос' | 'Жалоба';
export type TicketCategoryLabel = 'Пополнение сервисов' | 'Покупка подписки' | 'Получение товара' | 'Оплата' | 'Сервис' | 'Другое';
export type TicketStatus = 'Ожидает ответа' | 'Ответ получен';

export interface TicketBaseStructure {
    type: TicketType; /// тип тикета, вопрос или жалоба
    category: TicketCategory; /// категория где возникла проблема
    title: string; /// заголовок тикета
    description: string; // описание проблемы от пользователя
}

export interface TicketFullData {
    id: string; // уникальный номер тикета
    type: TicketTypeLabel; /// тип тикета, вопрос или жалоба
    category: TicketCategoryLabel; /// категория где возникла проблема
    title: string; /// заголовок тикета
    description: string; // описание проблемы от пользователя
    status: TicketStatus;  /// статус, или на тикет уже ответили или он ждет ответа
    ownerName: string; /// имя пользователя который написал тикет
    createdAt: string; /// когда был созданн
    answer?: string; /// ответ от администратора
    answeredAt?: string; /// когда на тикет был дан ответ админом
}

