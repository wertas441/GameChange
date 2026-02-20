import {useQuery} from "@tanstack/react-query";
import {ReviewListStructure} from "@/types/review";
import {getReviewsList} from "@/lib/controllers/review";

export default function useUserReviews() {

    const {
        data: userReviews,
        isLoading,
        isError,
        error
    } = useQuery<ReviewListStructure[] | undefined>({
        queryKey: ['reviews'],
        staleTime: 60000 * 15,
        queryFn: getReviewsList,
    });

    return {
        userReviews,
        isLoading,
        isError,
        error
    }
}