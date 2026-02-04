import Reviews from "@/app/reviews/Reviews";
import {Metadata} from "next";
import {getReviewsList} from "@/lib/controllers/reviewController";
import ServerErrorState from "@/components/errors/ServerErrorState";

export const metadata: Metadata = {
    title: "Отзывы | GameChange",
    description: 'Отзывы пользователей сервиса GameChange об оказанных им услугах',
}

export default async function ReviewsPage() {

    const reviews = await getReviewsList();

    if (!reviews) {
        return <ServerErrorState />
    }

    return <Reviews reviews={reviews} />
}