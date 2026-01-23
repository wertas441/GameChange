interface SystemRequirements {
    CPU: string;
    GPU: string;
    RAM: string;
    memory: string;
}

export interface KeyDataStructure {
    id: number;
    name: string;
    price: string;
    description: string;
    releaseData: string;
    mainPicture: string;
    otherPictures: string[];
    developer: string;
    publisher: string;
    operationSystem: string[];
    activationPlatform: string[];
    genres: string[];
    systemRequirements: {
        minimal: SystemRequirements;
        recommended: SystemRequirements;
    }
}

export interface KeysDataStructure {
    id: number,
    name: string,
    price: string,
    picture: string,
    releaseData: string,
    operationSystem: string[],
    activationPlatform: string[],
    genres: string[],
}
