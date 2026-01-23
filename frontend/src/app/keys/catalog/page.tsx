import {Metadata} from "next";
import KeysCatalog from "@/app/keys/catalog/KeysCatalog";
import {getKeysList} from "@/lib/controllers/keysController";

export const metadata: Metadata = {
    title: '',
    description: '',
}

export default async function KeysCatalogPage() {

    const keysData = await getKeysList()

    if (!keysData) {
        return (
            <h1 className={`text-2xl text-white`}>error</h1>
        )
    }

    return <KeysCatalog keysData={keysData} />
}