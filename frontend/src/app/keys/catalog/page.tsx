import {Metadata} from "next";
import KeysCatalog from "@/app/keys/catalog/KeysCatalog";

export const metadata: Metadata = {
    title: '',
    description: '',
}

export default function KeysCatalogPage() {

    return <KeysCatalog />
}