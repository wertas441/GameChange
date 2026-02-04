import {Metadata} from "next";
import Steam from "@/app/services/(all)/steam/Steam";

export const metadata: Metadata = {
    title: 'Пополнить кошелёк Steam | GameChange',
    description: 'Укажите данные для аккаунта и cумму пополнения, после оплаты деньги моментально поступят на кошелёк',
}

export default function SteamPage() {

    return <Steam />
}