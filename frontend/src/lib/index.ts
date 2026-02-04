import axios from "axios";
import {BackendApiResponse} from "@/types";

export const showErrorMessage:boolean = true;

export function getTokenHeaders(token: string) {
    return {Cookie: `token=${token}`};
}

export const api = axios.create({
    baseURL: 'http://localhost:3003/api', // или из env-переменной
    withCredentials: true,           
    timeout: 5000,
  });

export function getServerErrorMessage(err: unknown){
    let message:string = 'Не удалось связаться с сервером. Пожалуйста, проверьте интернет или попробуйте позже.';

    if (axios.isAxiosError<BackendApiResponse>(err)) {
        const respData = err.response?.data;
        message = respData?.error || respData?.message || message;
    }

    return message;
}

export const formatDateForProfile = (value: string) => {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return value;
    return parsed.toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
};


export function getDateInputFormat(date: string | Date | null | undefined): string {
    if (!date) return '';

    if (date instanceof Date) {
        if (Number.isNaN(date.getTime())) return '';
        return date.toISOString().slice(0, 10);
    }

    const raw = String(date).trim();
    if (!raw) return '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

    const isoMatch = raw.match(/^(\d{4}-\d{2}-\d{2})[T\s]/);
    if (isoMatch) return isoMatch[1];

    const dmYMatch = raw.match(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/);
    if (dmYMatch) {
        const day = dmYMatch[1].padStart(2, '0');
        const month = dmYMatch[2].padStart(2, '0');
        const year = dmYMatch[3];
        return `${year}-${month}-${day}`;
    }

    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) {
        return parsed.toISOString().slice(0, 10);
    }

    return '';
}

export function generateMetadataKeyName(keyUrl: string) {
    return keyUrl
        .split(/[-_]+/)
        .filter(Boolean)
        .map((part) => {
            const lower = part.toLowerCase();
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join(' ');
}

