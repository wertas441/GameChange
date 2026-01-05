import {Metadata} from "next";
import ChangeKey from "@/app/keys/[keyId]/change/ChangeKey";

export const metadata: Metadata = {
    title: 'Key',
    description: '',
}

export default function ChangeKeyPage(){

    return <ChangeKey />
}