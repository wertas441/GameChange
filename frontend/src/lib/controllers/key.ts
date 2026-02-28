import {serverApi, getTokenHeaders, showErrorMessage, getServerErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {AddKeyData, KeyDetailsData, KeyListData} from "@/types/key";

interface DeleteKeyPayload {
    tokenValue: string;
    keyId: number;
}

export async function getKeysList() {
    try {
        const { data } = await serverApi.get<BackendApiResponse<{ keys: KeyListData[] }>>(`/key/keys`);

       return data.data?.keys ?? undefined;
    } catch (error){
        if (showErrorMessage) console.error('Get keysList error:', error);

        return undefined;
    }
}

export async function getKeyDetails(keyUrl: string) {
    try {
        const { data } = await serverApi.get<BackendApiResponse<{ keyDetails: KeyDetailsData }>>(`/key/key?keyUrl=${encodeURIComponent(keyUrl)}`);

        return data.data?.keyDetails ?? undefined;
    } catch (error){
        if (showErrorMessage) console.error('get keyDetails error:', error);

        return undefined;
    }
}

export async function createKey(payload: AddKeyData):Promise<void> {
    try {
        const { data } = await serverApi.post<BackendApiResponse>('/key/key', payload);

        if (!data.success) throw new Error(data.message || 'Не удалось добавить ключ');

        return;
    } catch (err) {
        const message = getServerErrorMessage(err) || "Ошибка добавления ключа";

        console.error(message);
        throw new Error(message);
    }
}

export async function updateKey(payload: AddKeyData):Promise<void> {
    try {
        const { data } = await serverApi.put<BackendApiResponse>('/key/key', payload);

        if (!data.success) throw new Error(data.message || 'Не удалось изменить ключ');

        return;
    } catch (err) {
        const message = getServerErrorMessage(err) || "Ошибка изменения ключа";

        console.error(message);
        throw new Error(message);
    }
}

export async function deleteKey(payload: DeleteKeyPayload):Promise<void> {

    const requestConfig = {
        headers: getTokenHeaders(payload.tokenValue),
        data: { keyId: payload.keyId },
    }

    try {
        const { data } = await serverApi.delete<BackendApiResponse>(`/key/key`, requestConfig);

        if (!data.success) throw new Error(data.message || "Не удалось удалить ключ");

        return;
    } catch (err) {
        const message = getServerErrorMessage(err) || "Ошибка удаления ключа";

        console.error(message);
        throw new Error(message);
    }
}