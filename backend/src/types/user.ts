export interface User {
    id: string;
    email: string;
    userName: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreateRequest {
    email: string;
    userName: string;
    hashedPassword: string;
}

export interface UserProfileResponse {
    publicId: string;
    email: string;
    userName: string;
    createdAt: Date;
    isAdmin: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface RegisterRequest {
    userName: string;
    email: string;
    password: string;
}

export interface PurchasesItem {
    keyId: number;
    keyUrl: string;
    name: string;
    mainImage: string;
    price: number;
    count: number;
    date: string;
}

export interface PurchaseCreateItem {
    keyId: number;
    price: number;
    count: number;
}