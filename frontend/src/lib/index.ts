import axios from "axios";
import {BackendApiResponse} from "@/types";

export const showErrorMessage:boolean = true;

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