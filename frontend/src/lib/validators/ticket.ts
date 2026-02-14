


export function validateTicketType(type: string[]): string | null {

    const allowed = ['question', 'complaint'];

    const selected = type?.[0];

    if (!selected) {
        return 'Пожалуйста, укажите правильный тип для обращения';
    }

    const validateResult =  allowed.includes(selected);

    if (!validateResult) {
        return 'Пожалуйста, укажите правильный тип для обращения';
    }

    return null;
}

export function validateTicketCategory(category: string[]): string | null {
    const allowed = [
        'services-balance',
        'subscription',
        'get-product',
        'payment',
        'service',
        'other',
    ];

    const selected = category?.[0];

    if (!selected) {
        return 'Пожалуйста, укажите правильную категорию для обращения';
    }

    const validateResult =  allowed.includes(selected);

    if (!validateResult) {
        return 'Пожалуйста, укажите правильную категорию для обращения';
    }

    return null;
}

export function validateTicketTitle(title: string): string | null {
    const trimmedValue = title.trim();

    if (!trimmedValue) {
        return 'Пожалуйста, введите заголовок для обращения';
    }

    if (trimmedValue.length < 3) {
        return (`Заголовок должен содержать минимум 3 символа (сейчас ${trimmedValue.length})`)
    }

    if (trimmedValue.length > 120) {
        return (`Заголовок может содержать максимум 120 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}

export function validateTicketDescription(description: string): string | null {
    const trimmedValue = description.trim();

    if (!trimmedValue) {
        return 'Пожалуйста, введите описание для обращения';
    }

    if (trimmedValue.length < 10) {
        return (`Описание должно содержать минимум 10 символов (сейчас ${trimmedValue.length})`)
    }

    if (trimmedValue.length > 2000) {
        return (`Описание может содержать максимум 2000 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}

export function validateTicketAnswer(answer: string): string | null {
    const trimmedValue = answer.trim();

    if (!trimmedValue) {
        return 'Пожалуйста, введите ответ для обращения';
    }

    if (trimmedValue.length < 10) {
        return (`Ответ должен содержать минимум 10 символов (сейчас ${trimmedValue.length})`)
    }

    if (trimmedValue.length > 2000) {
        return (`Ответ может содержать максимум 2000 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}