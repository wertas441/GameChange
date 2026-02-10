import {Metadata} from "next";
import AboutTicket from "@/app/support/[ticketId]/AboutTicket";
import {getTicketDetails} from "@/lib/controllers/ticket";
import ServerErrorState from "@/components/errors/ServerErrorState";
import {cookies} from "next/headers";

export const metadata: Metadata = {
    title: 'Подробности обращения | GameChange',
    description: 'Подробности ',
}

export interface IParams {
    params: Promise<{
        ticketId: string;
    }>
}

export default async function AboutTicketPage({params}: IParams) {
    const {ticketId} = await params;

    const tokenValue = (await cookies()).get('token')?.value;

    if (!tokenValue) {
        return <ServerErrorState />
    }

    const data = await getTicketDetails(ticketId, tokenValue);

    if (!data) {
        return <ServerErrorState />
    }

    return <AboutTicket ticketData={data} />
}