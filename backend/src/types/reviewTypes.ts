


export interface ReviewBaseStructure {
    tag: string;
    rating: number;
    description: string;
}

export interface ReviewListStructure extends ReviewBaseStructure {
    userName: string;
    id: string;
    date: string;
}


