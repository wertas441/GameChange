import {Metadata} from "next";
import ChatGpt from "@/app/services/(all)/chat-gpt/ChatGpt";

export const metadata: Metadata = {
    title: 'Купить подписку ChatGPT | GameChange',
    description: 'Укажите данные для аккаунта и выберите какую подписку хотите приобрести, после оплаты вы моментально получите товар',
}

export default function ChatGptPage() {

    return <ChatGpt />
}