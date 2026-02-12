
export function validateReviewCategory(category: string[] | null | undefined): string | null {
    const allowed = [
        'key',
        'chatGPT',
        'ps-plus',
        'ps-store',
        'spotify',
        'steam',
        'xbox',
    ];

    if (!category || category.length === 0) {
        return 'Пожалуйста, выберите категорию для отзыва';
    }

    const selected = category[0];
    const validateResult =  allowed.includes(selected);

    if (!validateResult) {
        return 'Пожалуйста, укажите правильную категорию для отзыва';
    }

    return null;
}

export function validateReviewRating(rating: number | undefined): string | null {
    if (rating === undefined) {
        return 'Пожалуйста, выберите вашу оценку';
    }

    if (rating <= 0 || rating > 5){
        return 'Пожалуйста, введите корректное значение для оценки';
    }

    return null

}

export function validateReviewDescription(description: string): string | null {
    const trimmedValue = description.trim();

    if (!trimmedValue) {
        return 'Пожалуйста, введите описание для отзыва';
    }

    if (trimmedValue.length < 10) {
        return (`Описание должно содержать минимум 10 символов (сейчас ${trimmedValue.length})`)
    }

    if (trimmedValue.length > 1000) {
        return (`Отзыв может содержать максимум 1000 символов (сейчас ${trimmedValue.length})`)
    }

    return null
}
