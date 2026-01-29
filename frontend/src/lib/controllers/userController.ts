import {api, getTokenHeaders, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {PurchaseItem} from "@/types";
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

export async function addPurchases(tokenValue: string, cartItems: CartItem[]) {
    const items = cartItems.map((item) => ({
        keyId: item.id,
        price: Number(item.price || 0),
        count: item.count,
    }));

    try {
        const response = await api.post<BackendApiResponse>(
            `/user/purchases`,
            { items },
            { headers: getTokenHeaders(tokenValue) }
        );

        return response.data.success;
    } catch (error) {
        if (showErrorMessage) console.error('add purchases error:', error);

        return false;
    }
}