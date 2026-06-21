import {BackendApiResponse} from "@/shared/type";
import {PurchaseItem} from "@/shared/type";
import {CartItem} from "@/entities/cart/model/store";
import {getTokenHeaders, serverApi, showErrorMessage} from "@/shared/utils";

export async function getPurchases(tokenValue: string) {

    const payload = {
        headers: getTokenHeaders(tokenValue),
    };

    try {
        const { data } = await serverApi.get<BackendApiResponse<{ purchasesList: PurchaseItem[] }>>
        (`/user/purchases`, payload);

        return data.data?.purchasesList ?? [];
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

    const payload = {
        headers: getTokenHeaders(tokenValue),
    };

    try {
        const { data } = await serverApi.post<BackendApiResponse>(`/user/purchases`, items, payload);

        return data.success;
    } catch (error) {
        if (showErrorMessage) console.error('add purchases error:', error);

        return false;
    }
}