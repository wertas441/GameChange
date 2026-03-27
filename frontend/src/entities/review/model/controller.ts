import { BackendApiResponse } from "@/shared/type";
import {ReviewBaseStructure, ReviewListStructure} from "@/entities/review/model/type";
import {serverApi, showErrorMessage} from "@/shared/utils";
import {getServerErrorMessage} from "@/shared/lib/server";

export async function getReviewsList() {
    try {
        const { data } = await serverApi.get<BackendApiResponse<{ reviews: ReviewListStructure[] }>>("/review/reviews");

        return data.data?.reviews ?? undefined;
    } catch (error) {
        if (showErrorMessage) console.error("get reviews list error:", error);

        return undefined;
    }
}

export async function createReview(payload: ReviewBaseStructure): Promise<void> {
    try {
        const { data } = await serverApi.post<BackendApiResponse>("/review/review", payload);

        if (!data.success) throw new Error(data.message || "Не удалось добавить отзыв");

        return;
    } catch (err) {
        const message = getServerErrorMessage(err) || "Ошибка добавления отзыва";

        console.error(message);

        throw new Error(message);
    }
}
