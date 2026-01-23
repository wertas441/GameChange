import {api, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {KeysStructures} from "@/types/keys";


export async function getKeysList() {
    try {
        const response = await api.get<BackendApiResponse<{ keys: KeysStructures[] }>>(`/keys`);

       return  response.data.data?.keys ?? undefined;
    } catch (error){
        if (showErrorMessage) console.error('Get keysList error:', error);

        return undefined;
    }
}