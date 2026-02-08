import ChangeKey from "@/app/keys/[keyId]/change/ChangeKey";
import {KeyMetadataParams} from "@/types/key";
import {generateMetadataKeyName} from "@/lib";
import {getKeyDetails} from "@/lib/controllers/key";
import {cookies} from "next/headers";
import ServerErrorState from "@/components/errors/ServerErrorState";

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
        return <ServerErrorState />
    }

    return <ChangeKey keyData={keyData} token={tokenValue} />
}