import {AddKeyData} from "../../types/keysTypes";

export const validateKeyData = (requestData: AddKeyData) => {

    if (!requestData || !requestData.systemRequirements) {
        return false;
    }

    const { minimal, recommended } = requestData.systemRequirements;

    const checks = [
        validateKeyName(requestData.name),
        validateKeyUrl(requestData.keyUrl),
        validateKeyMainPicture(requestData.mainPicture),
        validateKeyReleaseDate(requestData.releaseDate),
        validateKeyOperationSystem(requestData.operationSystem),
        validateKeyActivationPlatform(requestData.activationPlatform),
        validateKeyGenres(requestData.genres),
        validateKeyDescription(requestData.description),
        validateKeyOtherPictures(requestData.otherPictures),
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


function validateKeyName(name: string): boolean {

    return true
}

function validateKeyUrl(url: string): boolean {

    return true
}

function validateKeyMainPicture(mainPicture: string): boolean {

    return true
}

function validateKeyReleaseDate(date: string): boolean {

    return true
}

function validateKeyOperationSystem(operationSystem: string[]): boolean {

    return true
}

function validateKeyActivationPlatform(activationPlatform: string[]): boolean {

    return true
}

function validateKeyGenres(genres: string[]): boolean {

    return true
}

function validateKeyDescription(description: string): boolean {

    return true
}

function validateKeyOtherPictures(otherPictures: string[]): boolean {

    return true
}

function validateKeyDeveloper(developer: string): boolean {

    return true
}

function validateKeyPublisher(publisher: string): boolean {

    return true
}

function validateKeyCPU(CPU: string): boolean {

    return true
}

function validateKeyGPU(GPU: string): boolean {

    return true
}

function validateKeyRAM(RAM: number): boolean {

    return true
}

function validateKeyMemory(memory: number): boolean {

    return true
}