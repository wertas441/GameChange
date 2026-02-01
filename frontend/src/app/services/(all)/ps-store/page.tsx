import {Metadata} from "next";
import PSStore from "@/app/services/(all)/ps-store/PSStore";

export const metadata: Metadata = {
    title: 'Пополнить аккаунт PS Store | GameChange',
    description: 'Укажите данные для аккаунта и cумму пополнения, после оплаты деньги моментально поступят на аккаунт',
}

export default function PSStorePage() {

    return <PSStore />
}