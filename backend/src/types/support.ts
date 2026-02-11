
export type TicketBackendType =  'question' | 'complaint';
export type TicketBackendCategory =  'services-balance' | 'subscription' | 'get-product' | 'payment' | 'service' | 'other';
export type TicketFrontendType = 'Вопрос' | 'Жалоба';
export type TicketFrontendCategory = 'Пополнение сервисов' | 'Покупка подписки' | 'Получение товара' | 'Оплата' | 'Сервис' | 'Другое';
export type TicketStatus = 'Ожидает ответа' | 'Ответ получен';

export interface TicketBackendBaseStructure {
    type: TicketBackendType;
    category: TicketBackendCategory;
    title: string;
    description: string;
}

export interface TicketBackendStructure extends TicketBackendBaseStructure {
    id: string;
    status: TicketStatus;
    ownerName: string;
    createdAt: string;
    answer?: string;
    answeredAt?: string;
}


export interface TicketFrontendData {
    id: string;
    type: TicketFrontendType;
    category: TicketFrontendCategory;
    title: string;
    description: string;
    status: TicketStatus;
    ownerName: string;
    createdAt: string;
    answer?: string;
    answeredAt?: string;
}

