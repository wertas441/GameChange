import {create, StateCreator} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export interface CartItem {
    id: number;
    keyUrl: string;
    name: string;
    price: string;
    mainPicture: string;
    count: number;
}

interface CartStore {
    cartState: CartItem[];
    cartItemsCount: number;

    addKey: (item: CartItem) => void;
    removeKey: (keyId: number) => void;
    clearCart: () => void;
    hasKey: (keyId: number) => boolean;
}

const getItemsCount = (items: CartItem[]) => items.reduce((sum, item) => sum + item.count, 0);

const cartStore: StateCreator<CartStore> = (set, get) => ({
    cartState: [],
    cartItemsCount: 0,

    addKey: (item: CartItem) => {
        set((state) => {
            const existingIndex = state.cartState.findIndex((entry) => entry.id === item.id);
            let nextCart = state.cartState;

            if (existingIndex === -1) {
                nextCart = [...state.cartState, { ...item, count: 1 }];
            } else {
                nextCart = state.cartState.map((entry, index) =>
                    index === existingIndex ? { ...entry, count: entry.count + 1 } : entry
                );
            }

            return {
                cartState: nextCart,
                cartItemsCount: getItemsCount(nextCart)
            };
        });
    },

    removeKey: (keyId: number) => {
        set((state) => {
            const removeIndex = state.cartState.findIndex((entry) => entry.id === keyId);
            if (removeIndex === -1) {
                return {
                    cartState: state.cartState,
                    cartItemsCount: getItemsCount(state.cartState)
                };
            }

            const targetItem = state.cartState[removeIndex];
            const nextCart =
                targetItem.count > 1
                    ? state.cartState.map((entry, index) =>
                          index === removeIndex ? { ...entry, count: entry.count - 1 } : entry
                      )
                    : [
                          ...state.cartState.slice(0, removeIndex),
                          ...state.cartState.slice(removeIndex + 1),
                      ];

            return {
                cartState: nextCart,
                cartItemsCount: getItemsCount(nextCart)
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