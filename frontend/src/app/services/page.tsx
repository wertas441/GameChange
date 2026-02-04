import {Metadata} from "next";
import Services from "@/app/services/Services";

export const metadata: Metadata = {
    title: "Пополнение сервисов | GameChange",
    description: 'Общий список сервисов которые вы можете пополнить используя GameChange',
}

export default function ServicesPage() {

    return <Services />
}