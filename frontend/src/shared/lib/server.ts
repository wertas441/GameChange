import axios from "axios";
import {BackendApiResponse} from "@/shared/type";

export function getServerErrorMessage(err: unknown){
    let message:string = 'Не удалось связаться с сервером. Пожалуйста, проверьте интернет или попробуйте позже.';

    if (axios.isAxiosError<BackendApiResponse>(err)) {
        const respData = err.response?.data;
        message = respData?.error || respData?.message || message;
    }

    return message;
}

