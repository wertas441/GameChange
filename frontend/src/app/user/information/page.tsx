import Information from "@/app/user/information/Information";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Информация о проекте | GameChange",
    description: "Информация о проекте GameChange его функциях и стеке",
}

export default function InformationPage() {

    return <Information />
}