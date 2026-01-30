export function validateUserEmail(email: string): boolean {
    if (!email.trim()){
        return false;
    }

    return true;
}

export function validateUserName(userName: string): boolean {
    if(!userName.trim()){
        return false;
    }

    if(userName.length < 3){
        return false;
    }

    if(userName.length > 25){
        return false;
    }

    const userNameRegex = /^[a-zA-Z0-9!@#$%^&*.]+$/;
    if(!userNameRegex.test(userName)) {
        return false;
    }

    return true;
}

export function validateUserPassword(password: string): boolean {
    if (!password.trim()){
        return false;
    }

    if (password.length < 8)  {
        return false;
    }

    if (password.length > 25){
        return false;
    }

    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*.]+$/;
    if(!passwordRegex.test(password)) {
        return false;
    }

    return true;
}
