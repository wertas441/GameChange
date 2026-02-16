import {Metadata} from "next";
import AnswerToTicket from "@/app/support/[ticketId]/answer/AnswerToTicket";
import {cookies} from "next/headers";
import ServerErrorState from "@/components/errors/ServerErrorState";
import {getTicketDetails} from "@/lib/controllers/ticket";

export const metadata: Metadata = {
    title: 'Ответить на обращение | GameChange',
    description: 'Используя возможности администратора, ответьте на вопрос пользователя нашего сервиса',
}

export interface IParams {
    params: Promise<{ ticketId: string }>
}

export default async function AnswerToTicketPage({params}: IParams) {
    const {ticketId} = await params;

    const tokenValue = (await cookies()).get('token')?.value;

    if (!tokenValue) {
        return <ServerErrorState />
    }

    const data = await getTicketDetails(ticketId, tokenValue);

    if (!data) {
        return <ServerErrorState />
    }

    return <AnswerToTicket ticketData={data} />
}