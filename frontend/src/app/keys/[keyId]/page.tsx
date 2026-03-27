import KeyDetails from "@/app/keys/[keyId]/KeyDetails";
import {getKeyDetails, KeyMetadataParams} from "@/entities/key";
import {ServerErrorState} from "@/shared/ui-kit/server";
import {Metadata} from "next";
import {generateMetadataKeyName} from "@/shared/lib/server";

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