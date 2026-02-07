import {Metadata} from "next";
import KeysCatalog from "@/app/keys/catalog/KeysCatalog";

export const metadata: Metadata = {
    title: 'Игровые ключи | GameChange',
    description: 'Вы можете найти все актуальные игры в ассортименте нашего интернет магазина',
}

export default async function KeysCatalogPage() {

    return <KeysCatalog />
}