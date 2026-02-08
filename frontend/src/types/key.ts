import {ActivationPlatform, OperationSystem} from "@/lib/data";

export interface SystemRequirements {
    CPU: string;
    GPU: string;
    RAM: number;
    memory: number;
}

export interface KeyBaseData {
    name: string,
    keyUrl: string;
    price: number;
    mainPicture: string,
    releaseDate: string,
    operationSystem: OperationSystem[],
    activationPlatform: ActivationPlatform[],
    genres: string[],
}

export interface KeyListData extends KeyBaseData {
    id: number,
}

export interface AddKeyData extends KeyBaseData {
    description: string;
    otherPictures: string[];
    developer: string;
    publisher: string;
    systemRequirements: {
        minimal: SystemRequirements;
        recommended: SystemRequirements;
    }
}

export interface KeyDetailsData extends AddKeyData {
    id: number;
}

export interface KeyMetadataParams {
    params: Promise<{
        keyId: string;
    }>
}


export interface KeyFormValues {
    name: string;
    keyUrl: string;
    price: string;
    description: string;
    releaseDate: string;
    mainPicture: string;
    firstOtherPicture: string;
    secondOtherPicture: string;
    thirdOtherPicture: string;
    developer: string;
    publisher: string;
    operationSystem: OperationSystem[];
    activationPlatform: ActivationPlatform[];
    genres: string[];
    systemRequirements: {
        minimal: SystemRequirements;
        recommended: SystemRequirements;
    }
}
