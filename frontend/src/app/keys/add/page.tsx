import {Metadata} from "next";
import AddNewKey from "@/app/keys/add/AddNewKey";

export const metadata: Metadata = {
    title: 'Добавление нового ключа в магазин | GameChange',
    description: 'Добавить новый ключ в ассортимент товара магазина GameChange',
}

export default function AddNewKeyPage(){

    return <AddNewKey />
}