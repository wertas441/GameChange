import {api, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {ReviewListStructure} from "@/types/review";

export async function getReviewsList() {

    try {
        const { data } = await api.get<BackendApiResponse<{ reviews: ReviewListStructure[] }>>(`/user/purchases`);

        return data.data?.reviews ?? [];
    } catch (error) {
        if (showErrorMessage) console.error('get reviews list error:', error);

        return undefined;
    }
}
