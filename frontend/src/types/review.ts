

export interface ReviewBaseStructure {
    tag: string;
    rating: number;
    description: string;
}

export interface ReviewListStructure extends ReviewBaseStructure {
    id: number;
    userName: string;
    date: string;
}


