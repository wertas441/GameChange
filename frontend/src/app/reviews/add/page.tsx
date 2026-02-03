import AddReview from "@/app/reviews/add/AddReview";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Оставить отзыв | GameChange",
    description: "Оставить отзыв о интернет магазине GameChange",
}

export default function AddReviewPage() {

    return <AddReview />
}