import KeyDetails from "@/app/keys/[keyId]/KeyDetails";
import {KeyMetadataParams} from "@/entities/key/model/type";
import {getKeyDetails} from "@/entities/key/model/controller";
import ServerErrorState from "@/shared/ui-kit/errors/ServerErrorState";
import {Metadata} from "next";
import {generateMetadataKeyName} from "@/shared/lib";

export async function generateMetadata({params}: KeyMetadataParams): Promise<Metadata> {
    const {keyId} = await params;

    const keyName = generateMetadataKeyName(keyId);

    return {
        title: `Купить ${keyName} | GameChange`,
        description: `Подробности о ключе ${keyName} представленной в нашем магазине товаров`,
    }
}

export default async function KeyDetailsPage({params}: KeyMetadataParams) {
    const {keyId} = await params;

    const keyDetails = await getKeyDetails(keyId);

    if (!keyDetails) return <ServerErrorState />

    return <KeyDetails keyData={keyDetails} />
}