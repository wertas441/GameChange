
export function validateKeyName(keyName: string): string | null {
    const trimmedValue = keyName.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите имя ключа')
    }

    if(trimmedValue.length < 3){
        return (`Имя ключа должно содержать минимум 3 символов (сейчас ${trimmedValue.length})`)
    }

    if(trimmedValue.length > 100){
        return (`Имя ключа может содержать максимум 100 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}

export function validateKeyUrl(keyUrl: string): string | null {
    if(!keyUrl.trim()){
        return ('Пожалуйста, введите url для ключа')
    }

    return null;
}

export function validateKeyPrice(keyPrice: string): string | null {
    const trimmedValue = keyPrice.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите цену для ключа')
    }

    const keyNumberPrice = Number(trimmedValue);

    if(keyNumberPrice < 10){
        return (`Цена ключа должна быть минимум 10 рублей (сейчас ${keyNumberPrice})`)
    }

    if(keyNumberPrice > 20000){
        return (`Цена ключа может быть максимум 20000 рублей (сейчас ${keyNumberPrice})`)
    }

    return null;
}

export function validateKeyDescription(keyDescription: string): string | null {
    const trimmedValue = keyDescription.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите описание для ключа')
    }

    if(trimmedValue.length < 50){
        return (`Описание ключа должно содержать минимум 50 символов (сейчас ${trimmedValue.length})`)
    }

    if(trimmedValue.length > 1000){
        return (`Описание ключа может содержать максимум 1000 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}

export function validateKeyReleaseDate(releaseDate: string): string | null {
    const trimmedValue = releaseDate.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите дату релиза продукта')
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) {
        return 'Дата релиза должна быть в формате ГГГГ-ММ-ДД';
    }

    const parsedDate = new Date(trimmedValue);
    if (Number.isNaN(parsedDate.getTime())) {
        return 'Некорректная дата релиза';
    }

    return null;
}

export function validateKeyMainPicture(mainPicture: string): string | null {
    if(!mainPicture.trim()){
        return ('Пожалуйста, введите url изображения для обложки продукта')
    }

    return null;
}

export function validateKeyOtherPicture(otherPicture: string): string | null {
    if(!otherPicture.trim()){
        return ('Пожалуйста, введите url изображения для галереи')
    }

    return null;
}

export function validateKeyDeveloper(developer: string): string | null {
    const trimmedValue = developer.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите названия разработчика продукта')
    }

    if(trimmedValue.length < 2){
        return (`Название разработчика должно содержать минимум 2 символа (сейчас ${trimmedValue.length})`)
    }

    if(trimmedValue.length > 40){
        return (`Название разработчика может содержать максимум 40 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}

export function validateKeyPublisher(publisher: string): string | null {
    const trimmedValue = publisher.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите названия издателя продукта')
    }

    if(trimmedValue.length < 2){
        return (`Название издателя должно содержать минимум 2 символа (сейчас ${trimmedValue.length})`)
    }

    if(trimmedValue.length > 40){
        return (`Название издателя может содержать максимум 40 символов (сейчас ${trimmedValue.length})`)
    }

    return null;
}

export function validateKeyOS(items: string[] | undefined): string | null {
    if(!items || items.length === 0){
        return ('Пожалуйста, выберите хотя бы одну операционную систему для продукта')
    }

    return null;
}

export function validateKeyPlatforms(items: string[] | undefined): string | null {
    if(!items || items.length === 0){
        return ('Пожалуйста, выберите хотя бы одну платформу для продукта')
    }

    return null;
}

export function validateKeyGenres(items: string[] | undefined): string | null {
    if(!items || items.length === 0){
        return ('Пожалуйста, выберите хотя бы один жанр для продукта')
    }

    return null;
}

export function validateKeyCPU(cpu: string): string | null {
    const trimmedValue = cpu.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите название процессора')
    }

    if (trimmedValue.length < 2) {
        return (`Название процессора должно содержать минимум 2 символа (сейчас ${trimmedValue.length})`);
    }

    if (trimmedValue.length > 100) {
        return (`Название процессора может содержать максимум 100 символов (сейчас ${trimmedValue.length})`);
    }

    return null;
}

export function validateKeyGPU(gpu: string): string | null {
    const trimmedValue = gpu.trim();

    if(!trimmedValue){
        return ('Пожалуйста, введите название видеокарты')
    }

    if (trimmedValue.length < 2) {
        return (`Название видеокарты должно содержать минимум 2 символа (сейчас ${trimmedValue.length})`);
    }

    if (trimmedValue.length > 100) {
        return (`Название видеокарты может содержать максимум 100 символов (сейчас ${trimmedValue.length})`);
    }

    return null;
}

export function validateKeyRAM(ram: number): string | null {
    if(ram < 2){
        return (`Оперативная память не может быть меньше 2 гигабайт (сейчас ${ram})`)
    }

    if(ram > 100){
        return (`Оперативная память не может быть больше 100 гигабайт (сейчас ${ram})`)
    }

    return null;
}

export function validateKeyMemory(memory: number): string | null {
    if(memory < 1){
        return (`Память не может быть меньше 1 гигабайта (сейчас ${memory})`)
    }

    if(memory > 1000){
        return (`Память не может быть больше 1000 гигабайт (сейчас ${memory})`)
    }

    return null;
}