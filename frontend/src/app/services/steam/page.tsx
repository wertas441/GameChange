import {Metadata} from "next";
import Steam from "@/app/services/steam/Steam";

export const metadata: Metadata = {
    title: 'Пополнить аккаунт Steam | GameChange',
    description: 'Укажите данные для аккаунта и выберите на какую сумму хотите пополнить аккаунт, после оплаты деньги моментально придут на аккаунт',
}

export default function SteamPage() {

    return <Steam />
}