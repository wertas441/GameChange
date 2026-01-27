import ChangeKey from "@/app/keys/[keyId]/change/ChangeKey";
import {KeyMetadataParams} from "@/types/keys";
import {generateMetadataKeyName} from "@/lib";
import {getKeyDetails} from "@/lib/controllers/keysController";
import {cookies} from "next/headers";

export async function generateMetadata({params}: KeyMetadataParams) {
    const {keyId} = await params;
    const keyName = generateMetadataKeyName(keyId);

    return {
        title: `Изменить ${keyName} | GameChange`,
        description: `Изменить данные о ключе ${keyName} представленной в нашем магазине товаров`,
    }
}

export default async function ChangeKeyPage({params}: KeyMetadataParams){
    const {keyId} = await params;

    const keyData = await getKeyDetails(keyId);
    const tokenValue = (await cookies()).get('token')?.value;

    if (!keyData || !tokenValue) {
        return (
            <h1>error</h1>
        )
    }

    return <ChangeKey keyData={keyData} token={tokenValue} />
}