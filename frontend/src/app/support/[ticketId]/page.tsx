import {Metadata} from "next";
import AboutTicket from "@/app/support/[ticketId]/AboutTicket";

export const metadata: Metadata = {
    title: 'Подробности обращения | GameChange',
    description: 'Подробности ',
}

export default function AboutTicketPage() {

    return <AboutTicket />
}