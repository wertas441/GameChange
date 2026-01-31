import {Metadata} from "next";
import Xbox from "@/app/services/xbox/Xbox";

export const metadata: Metadata = {
    title: 'Купить подписку Xbox Game Pass | GameChange',
    description: 'Укажите данные для аккаунта и выберите какую подписку хотите приобрести, после оплаты вы моментально получите товар',
}

export default function XboxPage() {

    return <Xbox />
}