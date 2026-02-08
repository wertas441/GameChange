import {useQuery} from "@tanstack/react-query";
import {KeyListData} from "@/types/key";
import {getKeysList} from "@/lib/controllers/key";

export default function useGameKeys() {

    const {
        data: keysData,
        isLoading,
        isError,
        error
    } = useQuery<KeyListData[] | undefined>({
        queryKey: ['keys'],
        queryFn: getKeysList,
    });

    return {
        keysData,
        isLoading,
        isError,
        error
    }
}