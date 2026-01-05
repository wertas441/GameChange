import {Metadata} from "next";
import KeyInformation from "@/app/keys/[keyId]/KeyInformation";

export const metadata: Metadata = {
    title: 'KeysCatalog',
    description: '',
}

export default function KeyInformationPage(){

    return <KeyInformation />
}