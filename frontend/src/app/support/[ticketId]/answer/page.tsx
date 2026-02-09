import {Metadata} from "next";
import AnswerToTicket from "@/app/support/[ticketId]/answer/AnswerToTicket";

export const metadata: Metadata = {
    title: 'Answer To Ticket',
    description: '',
}

export default function AnswerToTicketPage() {

    return <AnswerToTicket />
}