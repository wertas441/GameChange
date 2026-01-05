import {Metadata} from "next";
import AddNewKey from "@/app/keys/add/AddNewKey";

export const metadata: Metadata = {
    title: 'KeysCatalog',
    description: 'KeysCatalog',
}

export default function AddNewKeyPage(){

    return <AddNewKey />
}