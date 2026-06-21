import {useQuery} from "@tanstack/react-query";
import {ReviewListStructure} from "@/entities/review/model/type";
import {getReviewsList} from "@/entities/review/model/controller";

export default function useUserReviews() {
    const { data, isLoading, error, isError, refetch, isFetching } = useQuery<ReviewListStructure[]>({
        queryKey: ['reviews'],

        queryFn: async () => {
            const data = await getReviewsList();

            if (!data) throw new Error('Не удалось загрузить список отзывов');

            return data;
        },

        staleTime: 60000 * 15,
    });

    return { data, isLoading, error, isError, refetch, isFetching }
}