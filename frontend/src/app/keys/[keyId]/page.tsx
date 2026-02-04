import KeyDetails from "@/app/keys/[keyId]/KeyDetails";
import {KeyMetadataParams} from "@/types/key";
import {generateMetadataKeyName} from "@/lib";
import {getKeyDetails} from "@/lib/controllers/keysController";
import ServerErrorState from "@/components/errors/ServerErrorState";

export async function generateMetadata({params}: KeyMetadataParams) {
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

    if (!keyDetails) {
        return <ServerErrorState />
    }

    return <KeyDetails keyData={keyDetails} />
}