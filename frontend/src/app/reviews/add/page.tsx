import AddReview from "@/app/reviews/add/AddReview";
import {Metadata} from "next";
import {cookies} from "next/headers";
import ServerErrorState from "@/components/errors/ServerErrorState";

export const metadata: Metadata = {
    title: "Оставить отзыв | GameChange",
    description: "Оставить отзыв о интернет магазине GameChange",
}

export default async function AddReviewPage() {

    const tokenValue = (await cookies()).get('token')?.value;

    if (!tokenValue) {
        return (
            <ServerErrorState
                title="Проблема с авторизацией"
                description="Необходимо авторизоваться - чтобы оставить отзыв о нашем магазине"
            />
        );
    }

    return <AddReview />
}