import {AddKeyData} from "../../types/key";

export const validateKeyData = (requestData: AddKeyData) => {

    if (!requestData || !requestData.systemRequirements) {
        return false;
    }

    const { minimal, recommended } = requestData.systemRequirements;

    const checks = [
        validateKeyName(requestData.name),
        validateKeyUrl(requestData.keyUrl),
        validateKeyPrice(requestData.price),
        validateKeyMainPicture(requestData.mainPicture),
        validateKeyReleaseDate(requestData.releaseDate),
        validateKeyOS(requestData.operationSystem),
        validateKeyPlatforms(requestData.activationPlatform),
        validateKeyGenres(requestData.genres),
        validateKeyDescription(requestData.description),
        validateKeyOtherPicture(requestData.otherPictures),
        validateKeyDeveloper(requestData.developer),
        validateKeyPublisher(requestData.publisher),
        validateKeyCPU(minimal.CPU),
        validateKeyGPU(minimal.GPU),
        validateKeyRAM(minimal.RAM),
        validateKeyMemory(minimal.memory),
        validateKeyCPU(recommended.CPU),
        validateKeyGPU(recommended.GPU),
        validateKeyRAM(recommended.RAM),
        validateKeyMemory(recommended.memory),
    ].flat();

    return checks.every(Boolean);
};



export function validateKeyName(keyName: string): boolean {
    const trimmedValue = keyName.trim();

    if(!trimmedValue){
        return false;
    }

    if(trimmedValue.length < 3){
        return false;
    }

    if(trimmedValue.length > 100){
        return false;
    }

    return true;
}

export function validateKeyUrl(keyUrl: string): boolean {
    return !!keyUrl.trim();
}

export function validateKeyPrice(keyPrice: number): boolean {
    if(keyPrice < 10){
        return false;
    }

    if(keyPrice > 20000){
        return false;
    }

    return true;
}

export function validateKeyDescription(keyDescription: string): boolean {
    const trimmedValue = keyDescription.trim();

    if(!trimmedValue){
        return false;
    }

    if(trimmedValue.length < 50){
        return false;
    }

    if(trimmedValue.length > 1000){
        return false;
    }

    return true;
}

export function validateKeyReleaseDate(releaseDate: string): boolean {
    const trimmedValue = releaseDate.trim();

    if(!trimmedValue){
        return false;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmedValue)) {
        return false;
    }

    const parsedDate = new Date(trimmedValue);
    if (Number.isNaN(parsedDate.getTime())) {
        return false;
    }

    return true;
}

export function validateKeyMainPicture(mainPicture: string): boolean {
    if(!mainPicture.trim()){
        return false;
    }

    return true;
}

export function validateKeyOtherPicture(otherPicture: string[]): boolean {
    if (otherPicture.length < 3){
        return false;
    }

    return true;
}

export function validateKeyDeveloper(developer: string): boolean {
    const trimmedValue = developer.trim();

    if(!trimmedValue){
        return false;
    }

    if(trimmedValue.length < 2){
        return false;
    }

    if(trimmedValue.length > 40){
        return false;
    }

    return true;
}

export function validateKeyPublisher(publisher: string): boolean {
    const trimmedValue = publisher.trim();

    if(!trimmedValue){
        return false;
    }

    if(trimmedValue.length < 2){
        return false;
    }

    if(trimmedValue.length > 40){
        return false;
    }

    return true;
}

export function validateKeyOS(items: string[]): boolean {
    if(!items || items.length === 0){
        return false;
    }

    return true;
}

export function validateKeyPlatforms(items: string[]): boolean {
    if(!items || items.length === 0){
        return false;
    }

    return true;
}

export function validateKeyGenres(items: string[]): boolean {
    if(!items || items.length === 0){
        return false;
    }

    return true;
}

export function validateKeyCPU(cpu: string): boolean {
    const trimmedValue = cpu.trim();

    if(!trimmedValue){
        return false;
    }

    if (trimmedValue.length < 2) {
        return false;
    }

    if (trimmedValue.length > 100) {
        return false;
    }

    return true;
}

export function validateKeyGPU(gpu: string): boolean {
    const trimmedValue = gpu.trim();

    if(!trimmedValue){
        return false;
    }

    if (trimmedValue.length < 2) {
        return false;
    }

    if (trimmedValue.length > 100) {
        return false;
    }

    return true;
}

export function validateKeyRAM(ram: number): boolean {
    if(ram < 2){
        return false;
    }

    if(ram > 100){
        return false;
    }

    return true;
}

export function validateKeyMemory(memory: number): boolean {
    if(memory < 1){
        return false;
    }

    if(memory > 1000){
        return false;
    }

    return true;
}