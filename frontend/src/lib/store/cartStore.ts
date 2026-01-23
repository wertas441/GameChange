import {create, StateCreator} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export interface CartItem {
    id: number;
    keyUrl: string;
    name: string;
    price: string;
    mainPicture: string;
}

interface CartStore {
    cartState: CartItem[];
    cartItemsCount: number;

    addKey: (item: CartItem) => void;
    removeKey: (keyId: number) => void;
    clearCart: () => void;
    hasKey: (keyId: number) => boolean;
}

const cartStore: StateCreator<CartStore> = (set, get) => ({
    cartState: [],
    cartItemsCount: 0,

    addKey: (item: CartItem) => {
        set((state) => {
            const existingIndex = state.cartState.findIndex((entry) => entry.id === item.id);
            let nextCart = state.cartState;

            if (existingIndex === -1) {
                nextCart = [...state.cartState, item];
            } else {
                nextCart = state.cartState.map((entry, index) => (index === existingIndex ? item : entry));
            }

            return {
                cartState: nextCart,
                cartItemsCount: nextCart.length
            };
        });
    },

    removeKey: (keyId: number) => {
        set((state) => {
            const nextCart = state.cartState.filter((entry) => entry.id !== keyId);
            return {
                cartState: nextCart,
                cartItemsCount: nextCart.length
            };
        });
    },

    clearCart: () => {
        set({ cartState: [], cartItemsCount: 0 });
    },

    hasKey: (keyId: number) => get().cartState.some((entry) => entry.id === keyId),
});

export const useCartStore = create<CartStore>()(
    persist(cartStore, {
        name: 'cartStore',
        storage: createJSONStorage(() => localStorage),
    })
);

export const addNewItem = (state: CartStore) => state.addKey;