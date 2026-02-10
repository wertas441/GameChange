import {TicketBaseStructure, TicketCategory, TicketType} from "../../types/support";

export const validateTicketData = (requestData: TicketBaseStructure) => {

    if (!requestData) {
        return false;
    }

    const checks = [
        validateTicketType(requestData.type),
        validateTicketCategory(requestData.category),
        validateTicketTitle(requestData.title),
        validateTicketDescription(requestData.description),
    ].flat();

    return checks.every(Boolean);
};

function validateTicketType(type: TicketType): boolean {
    const allowed: TicketType[] = ['question', 'complaint'];
    return allowed.includes(type);
}

function validateTicketCategory(category: TicketCategory): boolean {
    const allowed: TicketCategory[] = [
        'services-balance',
        'subscription',
        'get-product',
        'payment',
        'service',
        'other',
    ];
    return allowed.includes(category);
}

function validateTicketTitle(title: string): boolean {
    const trimmedValue = title.trim();

    if (!trimmedValue) {
        return false;
    }

    if (trimmedValue.length < 3) {
        return false;
    }

    if (trimmedValue.length > 120) {
        return false;
    }

    return true;
}

function validateTicketDescription(description: string): boolean {
    const trimmedValue = description.trim();

    if (!trimmedValue) {
        return false;
    }

    if (trimmedValue.length < 10) {
        return false;
    }

    if (trimmedValue.length > 2000) {
        return false;
    }

    return true;
}