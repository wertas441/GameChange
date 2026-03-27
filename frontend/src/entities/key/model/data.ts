import {useQuery} from "@tanstack/react-query";
import {KeyListData} from "@/entities/key/model/type";
import {getKeysList} from "@/entities/key/model/controller";

export default function useGameKeys() {

    const  {data: keysData, isLoading, error, isError, refetch, isFetching } = useQuery<KeyListData[]>({
        queryKey: ['keys'],

        queryFn: async () => {
            const data = await getKeysList();

            if (!data) throw new Error('Не удалось загрузить список ключей');

            return data;
        },

        staleTime: 60000 * 15,
    });

    return { keysData, isLoading, error, isError, refetch, isFetching }
}