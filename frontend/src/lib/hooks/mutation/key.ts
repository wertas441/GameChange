import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createKey, deleteKey, updateKey} from "@/lib/controllers/key";

export function useCreateKeyMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createKey,
        onSuccess: async () => await queryClient.invalidateQueries({queryKey: ['keys']})
    })
}

export function useChangeKeyMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateKey,
        onSuccess: async () => await queryClient.invalidateQueries({queryKey: ['keys']})
    })
}

export function useDeleteKeyMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteKey,
        onSuccess: async () => await queryClient.invalidateQueries({queryKey: ['keys']})
    })
}