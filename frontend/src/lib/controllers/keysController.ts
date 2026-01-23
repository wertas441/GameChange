import {api, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {KeysStructures, KeyStructure} from "@/types/keys";


export async function getKeysList() {
    try {
        const response = await api.get<BackendApiResponse<{ keys: KeysStructures[] }>>(`/keys`);

       return  response.data.data?.keys ?? undefined;
    } catch (error){
        if (showErrorMessage) console.error('Get keysList error:', error);

        return undefined;
    }
}


export async function getKeyInformation(keyUrl: string) {
    try {
        const response = await api.get<BackendApiResponse<{ keyDetails: KeyStructure }>>(
            `/keys/key?keyUrl=${encodeURIComponent(keyUrl)}`);

        return  response.data.data?.keyDetails ?? undefined;
    } catch (error){
        if (showErrorMessage) console.error('get keyDetails error:', error);

        return undefined;
    }
}