import {Metadata} from "next";
import KeysCatalog from "@/app/keys/catalog/KeysCatalog";
import {getKeysList} from "@/lib/controllers/keysController";
import ServerErrorState from "@/components/errors/ServerErrorState";

export const metadata: Metadata = {
    title: 'Игровые ключи | GameChange',
    description: 'Вы можете найти все актуальные игры в ассортименте нашего интернет магазина',
}

export default async function KeysCatalogPage() {

    const keysData = await getKeysList()

    if (!keysData) {
        return <ServerErrorState />
    }

    return <KeysCatalog keysData={keysData} />
}