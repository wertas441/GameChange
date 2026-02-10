
export type TicketType =  'Вопрос' | 'Жалоба';
export type TicketCategory =  'Пополнение сервисов' | 'Покупка подписки' | 'Получение товара' | 'Оплата' | 'Сервис' | 'Другое';
export type TicketStatus =  'Ожидает ответа' | 'Ответ получен';

export interface Ticket {
    id: string; // уникальный номер тикета
    type: TicketType; /// тип тикета, вопрос или жалоба
    category: TicketCategory; /// категория где возникла проблема
    title: string; /// заголовок тикета
    description: string; // описание проблемы от пользователя
    status: TicketStatus;  /// статус, или на тикет уже ответили или он ждет ответа
    ownerName: string; /// имя пользователя который написал тикет
    createdAt: string; /// когда был созданн
    answer?: string; /// ответ от администратора
    answeredAt?: string; /// когда на тикет был дан ответ админом
}