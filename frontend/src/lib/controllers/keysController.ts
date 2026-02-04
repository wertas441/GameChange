import {api, getTokenHeaders, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {KeyDetailsData, KeyListData} from "@/types/key";

export async function getKeysList() {
    try {
        const { data } = await api.get<BackendApiResponse<{ keys?: KeyListData[] }>>(`/key/keys`);

       return data.data?.keys ?? undefined;
    } catch (error){
        if (showErrorMessage) console.error('Get keysList error:', error);

        return undefined;
    }
}

export async function getKeyDetails(keyUrl: string) {
    try {
        const { data } = await api.get<BackendApiResponse<{ keyDetails: KeyDetailsData }>>(`/key/key?keyUrl=${encodeURIComponent(keyUrl)}`);

        return data.data?.keyDetails ?? undefined;
    } catch (error){
        if (showErrorMessage) console.error('get keyDetails error:', error);

        return undefined;
    }
}

export async function deleteKey(tokenValue: string, keyId: number):Promise<void> {

    const payload = {
        headers: getTokenHeaders(tokenValue),
        data: { keyId },
    };

    try {
        await api.delete<BackendApiResponse>(`/key/key`, payload);

        return;
    } catch (error) {
        if (showErrorMessage) console.error('get keyDetails error:', error);

        return ;
    }
}