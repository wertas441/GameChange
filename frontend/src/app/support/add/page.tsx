import {Metadata} from "next";
import AddTicket from "@/app/support/add/AddTicket";

export const metadata: Metadata = {
    title: 'Обращение в поддержку | GameChange',
    description: 'Опишите вашу проблему или жалобу и наши специалисты постараются моментально ее решить',
}

export default function AddTicketPage() {

    return <AddTicket />
}