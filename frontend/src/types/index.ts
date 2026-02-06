import {ElementType, InputHTMLAttributes} from "react";


export interface BackendApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface FuncButtonTypes {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export interface SubmitButtonTypes {
    label: string;
    disabled?: boolean;
    className?: string;
}

export interface LinkButtonTypes {
    label: string;
    href: string;
    className?: string;
}

export interface IconBtnTypes {
    IconComponent: ElementType;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

export interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string;
    className?: string;
}

export interface PurchaseItem {
    keyId: number;
    keyUrl: string;
    name: string;
    mainImage: string;
    price: number;
    count: number;
    date: string;
}

export interface FAQDataStructure {
    question: string;
    answer: string;
}

export interface FeedBackStructure {
    id: number;
    name: string;
    game: string;
    rating: number;
    description: string;
}