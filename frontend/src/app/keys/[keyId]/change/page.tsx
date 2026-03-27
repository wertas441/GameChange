import ChangeKey from "@/app/keys/[keyId]/change/ChangeKey";
import {getKeyDetails, KeyMetadataParams} from "@/entities/key";
import {cookies} from "next/headers";
import {ServerErrorState} from "@/shared/ui-kit/server";
import {Metadata} from "next";
import {generateMetadataKeyName} from "@/shared/lib/server";

export async function generateMetadata({params}: KeyMetadataParams): Promise<Metadata> {
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

    if (!keyData || !tokenValue) return <ServerErrorState />


    return <ChangeKey keyData={keyData} token={tokenValue} />
}