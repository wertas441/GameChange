import {Metadata} from "next";
import PSPlus from "@/app/services/(all)/ps-plus/PSPlus";

export const metadata: Metadata = {
    title: 'Купить подписку PS Plus | GameChange',
    description: 'Укажите данные для аккаунта и выберите какую подписку хотите приобрести, после оплаты вы моментально получите товар',
}

export default function PSPlusPage() {

    return <PSPlus />
}