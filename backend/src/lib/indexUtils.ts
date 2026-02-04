import { config } from '../config';
import {ApiResponse} from "../types";

export function showBackendError(error: unknown, errorMessage: string = 'Неизвестная ошибка при работе сервера') {
    console.error(errorMessage, error);

    const err: any = error;
    const devSuffix = (config.nodeEnv !== 'production' && (err?.message || err?.detail)) ? `: ${err.message || err.detail}` : '';

    const response: ApiResponse = {
        success: false,
        error: `${errorMessage}${devSuffix}`
    };

    return response;
}


export function parseDateDDMMYYYY(value: string): string {
    // Postgres DATE принимает YYYY-MM-DD
    const parts = value.split(".");
    if (parts.length !== 3) throw new Error(`Некорректная дата: "${value}"`);
    const [dd, mm, yyyy] = parts;
    if (!dd || !mm || !yyyy) throw new Error(`Некорректная дата: "${value}"`);
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}
