import type { Metadata } from 'next';
import TicketHistory from "@/app/support/history/TicketHistory";
import {cookies} from "next/headers";
import ServerErrorState from "@/components/errors/ServerErrorState";
import {getTicketHistory} from "@/lib/controllers/ticket";

export const metadata: Metadata = {
    title: 'История обращений | GameChange',
    description: 'История обращений в поддержку GameChange',
}

export default async function SupportHistoryPage() {

    const tokenValue = (await cookies()).get('token')?.value;

    if (!tokenValue) {
        return (
            <ServerErrorState
                title="Проблема с авторизацией"
                description="Похоже, что ваша сессия истекла или отсутствует токен доступа. Попробуйте войти заново."
            />
        );
    }

    const data =  await getTicketHistory(tokenValue);

    if (!data) {
        return <ServerErrorState />
    }

    return <TicketHistory ticketData={data} />
}