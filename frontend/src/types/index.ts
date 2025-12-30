import {ElementType, InputHTMLAttributes} from "react";


export interface BackendApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
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