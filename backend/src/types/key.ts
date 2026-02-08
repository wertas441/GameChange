interface SystemRequirements {
    CPU: string;
    GPU: string;
    RAM: number;
    memory: number;
}

export interface KeyBaseData {
    name: string,
    keyUrl: string;
    price: number,
    mainPicture: string,
    releaseDate: string,
    operationSystem: string[],
    activationPlatform: string[],
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

