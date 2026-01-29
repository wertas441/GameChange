import {api, getTokenHeaders, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {PurchaseItem} from "@/types/purchases";
import {CartItem} from "@/lib/store/cartStore";

export async function getPurchases(tokenValue: string) {

    const payload = {
        headers: getTokenHeaders(tokenValue),
    };

    try {
        const response = await api.get<BackendApiResponse<{ purchasesList: PurchaseItem[] }>>(
            `/user/purchases`,
            payload
        );

        return response.data.data?.purchasesList ?? [];
    } catch (error) {
        if (showErrorMessage) console.error('get purchasesList error:', error);

        return undefined;
    }
}

export async function addPurchases(tokenValue: string, cert: CartItem[]) {

    const payload = {
        headers: getTokenHeaders(tokenValue),
        data: { cert },
    };

    try {
        await api.post<BackendApiResponse>(`/user/purchases`, payload);

        return true;
    } catch (error) {
        if (showErrorMessage) console.error('add purchases error:', error);

        return false;
    }
}