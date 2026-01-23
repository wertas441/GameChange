import {ActivationPlatform, OperationSystem} from "@/lib/data";

interface SystemRequirements {
    CPU: string;
    GPU: string;
    RAM: string;
    memory: string;
}

export interface KeyStructure {
    name: string;
    keyUrl: string;
    price: string;
    description: string;
    releaseData: string;
    mainPicture: string;
    otherPictures: string[];
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

export interface KeysStructures {
    id: number,
    keyUrl: string,
    name: string,
    price: string,
    picture: string,
    releaseData: string,
    operationSystem: string[],
    activationPlatform: string[],
    genres: string[],
}

export interface KeyMetadataParams {
    params: Promise<{
        keyId: string;
    }>
}
