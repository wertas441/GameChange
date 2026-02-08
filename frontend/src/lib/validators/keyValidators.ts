export function validateKeyName(keyName: string): string | null {
    if(!keyName.trim()){
        return ('Пожалуйста, введите имя ключа')
    }

    if(keyName.length < 3){
        return (`Имя ключа должно содержать минимум 3 символов (сейчас ${keyName.length})`)
    }

    if(keyName.length > 100){
        return (`Имя ключа может содержать максимум 100 символов (сейчас ${keyName.length})`)
    }

    return null;
}

export function validateKeyUrl(keyUrl: string): string | null {
    if(!keyUrl.trim()){
        return ('Пожалуйста, введите url для ключа')
    }

    /// дописать проверку на пробелы и тд

    return null;
}

export function validateKeyPrice(keyPrice: string): string | null {
    if(!keyPrice.trim()){
        return ('Пожалуйста, введите имя ключа')
    }

    const keyNumberPrice = Number(keyPrice);

    if(keyNumberPrice < 10){
        return (`Цена ключа должна быть минимум 10 рублей (сейчас ${keyNumberPrice})`)
    }

    if(keyNumberPrice > 20000){
        return (`Цена ключа может быть максимум 20000 рублей (сейчас ${keyNumberPrice})`)
    }

    return null;
}

export function validateKeyDescription(keyDescription: string): string | null {
    if(!keyDescription.trim()){
        return ('Пожалуйста, введите описание для ключа')
    }

    if(keyDescription.length < 3){
        return (`Описание ключа должно содержать минимум 50 символов (сейчас ${keyDescription.length})`)
    }

    if(keyDescription.length > 1000){
        return (`Имя ключа может содержать максимум 1000 символов (сейчас ${keyDescription.length})`)
    }

    return null;
}

export function validateKeyReleaseDate(releaseDate: string): string | null {
    if(!releaseDate.trim()){
        return ('Пожалуйста, введите дату релиза продукта')
    }

    /// додоавбить проверку на формат, чтобы он был нужный


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
    if(!developer.trim()){
        return ('Пожалуйста, введите названия разработчика продукта')
    }

    if(developer.length < 2){
        return (`Название разработчика должно содержать минимум 2 символа (сейчас ${developer.length})`)
    }

    if(developer.length > 40){
        return (`Название разработчика может содержать максимум 40 символов (сейчас ${developer.length})`)
    }

    return null;
}

export function validateKeyPublisher(publisher: string): string | null {
    if(!publisher.trim()){
        return ('Пожалуйста, введите названия издателя продукта')
    }

    if(publisher.length < 2){
        return (`Название издателя должно содержать минимум 2 символа (сейчас ${publisher.length})`)
    }

    if(publisher.length > 40){
        return (`Название издателя может содержать максимум 40 символов (сейчас ${publisher.length})`)
    }

    return null;
}

export function validateKeyOS(items: string[]): string | null {
    if(items.length === 0){
        return ('Пожалуйста, выберите хотя бы одну операционную систему для продукта')
    }

    return null;
}

export function validateKeyPlatforms(items: string[]): string | null {
    if(items.length === 0){
        return ('Пожалуйста, выберите хотя бы одну платформу для продукта')
    }

    return null;
}

export function validateKeyGenres(items: string[]): string | null {
    if(items.length === 0){
        return ('Пожалуйста, выберите хотя бы один жанр для продукта')
    }

    return null;
}

export function validateKeyCPU(cpu: string): string | null {
    if(!cpu.trim()){
        return ('Пожалуйста, введите название процессора')
    }

    return null;
}

export function validateKeyGPU(gpu: string): string | null {
    if(!gpu.trim()){
        return ('Пожалуйста, введите название видеокарты')
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