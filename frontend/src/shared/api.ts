import axios from "axios";

export function getTokenHeaders(token: string) {
    return {Cookie: `token=${token}`};
}

export const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3003/api',
    withCredentials: true,
    timeout: 9000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const clientApi = axios.create({
    baseURL: '/api',
    withCredentials: true,
    timeout: 9000,
    headers: {
        'Content-Type': 'application/json',
    }
});
