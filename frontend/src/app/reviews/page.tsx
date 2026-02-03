import Reviews from "@/app/reviews/Reviews";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Отзывы | GameChange",
    description: 'Отзывы пользователей сервиса GameChange об оказанных им услугах',
}

export default function ReviewsPage() {

    return <Reviews />
}