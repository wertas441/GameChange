import ChangeKey from "@/app/keys/[keyId]/change/ChangeKey";
import {KeyMetadataParams} from "@/entities/key/model/type";
import {getKeyDetails} from "@/entities/key/model/controller";
import {cookies} from "next/headers";
import ServerErrorState from "@/shared/ui-kit/errors/ServerErrorState";
import {Metadata} from "next";
import {generateMetadataKeyName} from "@/shared/lib";

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