export interface PurchaseItem {
    keyId: number;
    keyUrl: string;
    name: string;
    mainImage: string;
    price: number;
    count: number | null;
    date: string;
}
