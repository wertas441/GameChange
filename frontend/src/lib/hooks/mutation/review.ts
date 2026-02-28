import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createReview} from "@/lib/controllers/review";

export function useCreateReviewMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createReview,
        onSuccess: async () => await queryClient.invalidateQueries({queryKey: ['reviews']})
    })
}