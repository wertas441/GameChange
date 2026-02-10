'use client'

import {create, StateCreator} from 'zustand'
import {BackendApiResponse} from "@/types";
import {api, getServerErrorMessage} from "@/lib";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

const noopStorage: StateStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
};

interface UserData {
    publicId: string;
    email: string;
    userName: string;
    createdAt: string;
    isAdmin: boolean;
}

interface UserStore {
    userData: UserData | null;
    isAuthenticated: boolean;

    getUserData: () => UserData | null;
    initUserData: () => Promise<void>;
    fetchUserData: () => Promise<UserData | undefined>;

    clearUserData: () => Promise<void>;

    changeEmail: (email: string) => void;
    logout: () => Promise<void>;
}

const userStore: StateCreator<UserStore> = (set, get) => ({
    userData: null,
    isAuthenticated: false,

    getUserData: () => get().userData,

    initUserData: async () => {
        if (get().userData) return;

        await get().fetchUserData();
    },

    clearUserData: async () => {
        if (!(get().userData)) return;

        set({ userData: null })
    },

    fetchUserData: async () => {
        try {
            const { data } = await api.get<BackendApiResponse<{ userData: UserData }>>("/user/me",);

            if (!data.success || !data.data?.userData) return undefined;

            const userData = data.data.userData;

            set({
                userData,
                isAuthenticated: true
            });

            return userData;
        } catch (err) {
            console.error(getServerErrorMessage(err) || "Ошибка запроса информации об аккаунте");
            return undefined;
        }
    },

    changeEmail: (email) =>
        set((s) => ({
            userData: s.userData ? { ...s.userData, email } : s.userData,
        })),

    logout: async () => {
        try {
            const response = await api.post<BackendApiResponse>(`/auth/logout`);

            if (!response.data.success) return;

            set({userData: null, isAuthenticated: false});
            return;
        } catch (err) {
            console.error(getServerErrorMessage(err) || "Ошибка выхода");
            return;
        }
    },
});


export const useUserStore = create<UserStore>()(
    persist(userStore, {
        name: 'GCUserStore',
        storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : noopStorage))
    })
)

export const checkAuth =  (s: UserStore) => s.isAuthenticated
export const getUserStatus = (s: UserStore) => (s.userData ? s.userData.isAdmin : false);
export const getUserData = (s: UserStore) => s.userData;
export const makeLogout = (s: UserStore) => s.logout;
export const makeInitUserData = (s: UserStore) => s.initUserData;
export const makeClear = (s: UserStore) => s.clearUserData