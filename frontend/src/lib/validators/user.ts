
export function validateUserEmail(email: string): string | null {
    if (!email.trim()){
        return ('Пожалуйста, введите ваш email');
    }

    return null;
}

export function validateUserConfirmEmail(newEmail: string, confirmEmail: string): string | null {
    if (!confirmEmail.trim()){
        return ('Пожалуйста, подтвердите ваш email');
    }

    if (confirmEmail.trim() !== newEmail.trim()){
        return ('Почты не совпадают');
    }

    return null;
}


export function validateUserName(userName: string): string | null {
    if(!userName.trim()){
        return ('Пожалуйста, введите имя пользователя')
    }

    if(userName.length < 3){
        return (`Имя пользователя должно содержать минимум 3 символов (сейчас ${userName.length})`)
    }

    if(userName.length > 25){
        return (`Имя пользователя может содержать максимум 25 символов (сейчас ${userName.length})`)
    }

    const userNameRegex = /^[a-zA-Z0-9!@#$%^&*.]+$/;
    if(!userNameRegex.test(userName)) {
        return ('Имя пользователя может содержать только латинские буквы, цифры и некоторые спец.символы')
    }

    return null;
}

export function validateUserPassword(password: string): string | null {
    if (!password.trim()){
        return ('Пожалуйста, введите ваш пароль');
    }

    if (password.length < 8)  {
        return (`Пароль должен содержать минимум 8 символов (сейчас ${password.length})`);
    }

    if (password.length > 25){
        return (`Пароль может быть максимум 25 символов (сейчас ${password.length})`);
    }

    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*.]+$/;
    if(!passwordRegex.test(password)) {
        return ('Пароль может содержать только латинские буквы, цифры и некоторые спец.символы')
    }

    return null;
}

export function validateUserConfirmPassword(password: string, confirmPassword: string): string | null {
    if (!password.trim()){
        return ('Пожалуйста, подтвердите ваш пароль');
    }

    if (password != confirmPassword){
        return ('Пароль не совпадает с тем, что вы ввели ранее')
    }

    return null;
}