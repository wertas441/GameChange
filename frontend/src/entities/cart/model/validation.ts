export function validateCardNumber(cardNumber: string): string | null {
    const trimmedValue = cardNumber.trim();
    const digitsOnly = trimmedValue.replace(/\s+/g, '');

    if (!trimmedValue) {
        return 'Пожалуйста, введите номер карты';
    }

    if (!/^\d+$/.test(digitsOnly)) {
        return 'Номер карты должен содержать только цифры';
    }

    if (digitsOnly.length < 16) {
        return `Номер карты должен содержать минимум 16 цифр (сейчас ${digitsOnly.length})`;
    }

    if (digitsOnly.length > 19) {
        return `Номер карты может содержать максимум 19 цифр (сейчас ${digitsOnly.length})`;
    }

    return null;
}


export function validateCardDate(cardDate: string): string | null {
    const trimmedValue = cardDate.trim();

    if (!trimmedValue) {
        return 'Пожалуйста, введите срок действия карты';
    }

    const datePattern = /^(0[1-9]|1[0-2])\/(\d{2})$/;
    const match = trimmedValue.match(datePattern);

    if (!match) {
        return 'Введите срок действия в формате MM/YY';
    }

    const month = Number(match[1]);
    const yearPart = Number(match[2]);
    const fullYear = 2000 + yearPart;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (fullYear < currentYear || (fullYear === currentYear && month < currentMonth)) {
        return 'Срок действия карты истёк';
    }

    if (fullYear > currentYear + 20) {
        return 'Пожалуйста, введите корректный срок действия карты';
    }

    return null;
}

export function validateCardCVC(cardCVC: string): string | null {
    const trimmedValue = cardCVC.trim();

    if (!trimmedValue) {
        return 'Пожалуйста, введите CVC / CVV';
    }

    if (!/^\d+$/.test(trimmedValue)) {
        return 'CVC / CVV должен содержать только цифры';
    }

    if (trimmedValue.length < 3) {
        return `CVC / CVV должен содержать минимум 3 цифры (сейчас ${trimmedValue.length})`;
    }

    if (trimmedValue.length > 4) {
        return `CVC / CVV может содержать максимум 4 цифры (сейчас ${trimmedValue.length})`;
    }

    return null;
}