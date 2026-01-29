import Information from "@/app/user/information/Information";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Information",
    description: "Information page",
}

export default function InformationPage() {

    return <Information />
}