import {serverApi, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {ReviewListStructure} from "@/types/review";

export async function getReviewsList() {
    try {
        const { data } = await serverApi.get<BackendApiResponse<{ reviews: ReviewListStructure[] }>>(`/review/reviews`);

        return data.data?.reviews ?? undefined;
    } catch (error) {
        if (showErrorMessage) console.error('get reviews list error:', error);

        return undefined;
    }
}
