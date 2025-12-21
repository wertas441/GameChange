

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