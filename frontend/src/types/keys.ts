import {ActivationPlatform, OperationSystem} from "@/lib/data";

interface SystemRequirements {
    CPU: string;
    GPU: string;
    RAM: string;
    memory: string;
}

export interface KeyBaseData {
    name: string,
    keyUrl: string;
    price: string,
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
