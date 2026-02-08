
export function validatePromoCode(promoCode: string): string | null {
    const trimmedValue = promoCode.trim();

    if (trimmedValue === ''){
        return null;
    }

    if(trimmedValue.length < 3){
        return (`Промокод должен содержать минимум 3 символов (сейчас ${trimmedValue.length})`)
    }

    if(trimmedValue.length > 100){
        return (`Промокод может содержать максимум 20 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}

export function validateServiceAmount(amount: number): string | null {
    if(amount < 100){
        return (`Минимальная сумма для пополнения - 100 рублей`)
    }

    if(amount > 100000){
        return (`Максимальная сумма для пополнения одной операцией - 100.000 рублей`)
    }

    return null;
}

export function validateSteamLogin(login: string): string | null {
    const trimmedValue = login.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите ваш Steam логин')
    }

    if(trimmedValue.length < 3){
        return (`Steam логин должен содержать минимум 3 символов (сейчас ${trimmedValue.length})`)
    }

    if(trimmedValue.length > 100){
        return (`Steam логин может содержать максимум 40 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}

export function validateXboxLogin(login: string): string | null {
    const trimmedValue = login.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите ваш Xbox логин')
    }

    if(trimmedValue.length < 3){
        return (`Xbox логин должен содержать минимум 3 символов (сейчас ${trimmedValue.length})`)
    }

    if(trimmedValue.length > 100){
        return (`Xbox логин может содержать максимум 40 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}

export function validateSpotifyLogin(login: string): string | null {
    const trimmedValue = login.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите ваш Spotify логин')
    }

    if(trimmedValue.length < 3){
        return (`Spotify логин должен содержать минимум 3 символов (сейчас ${trimmedValue.length})`)
    }

    if(trimmedValue.length > 100){
        return (`Spotify логин может содержать максимум 40 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}

export function validatePSNLogin(login: string): string | null {
    const trimmedValue = login.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите ваш PSN логин')
    }

    if(trimmedValue.length < 3){
        return (`PSN логин должен содержать минимум 3 символов (сейчас ${trimmedValue.length})`)
    }

    if(trimmedValue.length > 100){
        return (`PSN логин может содержать максимум 40 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}

