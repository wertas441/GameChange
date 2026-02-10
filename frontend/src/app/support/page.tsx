import type { Metadata } from 'next';
import Support from "@/app/support/Support";
import {getTicketList} from "@/lib/controllers/ticket";
import ServerErrorState from "@/components/errors/ServerErrorState";
import {cookies} from "next/headers";

export const metadata: Metadata = {
    title: 'Поддержка | GameChange',
    description: 'Наша поддержка работает 24/7 и всегда старается помочь клиенту с возникшими вопросами',
}

export default async function SupportPage() {

    const tokenValue = (await cookies()).get('token')?.value;

    if (!tokenValue) {
        return (
            <ServerErrorState
                title="Проблема с авторизацией"
                description="Похоже, что ваша сессия истекла или отсутствует токен доступа. Попробуйте войти заново."
            />
        );
    }

    const data = await getTicketList(tokenValue);

    if (!data) {
        return <ServerErrorState />
    }

    return <Support ticketList={data} />
}