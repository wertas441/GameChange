'use client'

import LinkYellowBtn from "@/components/buttons/yellowButton/LinkYellowBtn";
import {ReviewListStructure} from "@/types/review";

const stats = [
    { label: "Средняя оценка", value: "4.9/5" },
    { label: "Отзывов за месяц", value: "1 248" },
    { label: "Повторные покупки", value: "72%" },
];

const reviews: ReviewListStructure[] = [
    {
        id: 1,
        userName: "Алексей М.",
        tag: "Пополнение Steam",
        rating: 5,
        description: "Пополнение пришло за минуту, комиссия понятная, интерфейс удобный. Буду пользоваться ещё.",
        date: "17.01.2025",
    },
    {
        id: 2,
        userName: "Екатерина С.",
        tag: "Подписка Spotify Premium",
        rating: 5,
        description: "Подписка активировалась сразу, поддержка ответила быстро. Отличный сервис!",
        date: "12.12.2025",
    },
    {
        id: 3,
        userName: "Руслан К.",
        tag: "Пополнение PS Store",
        rating: 4,
        description: "Всё прошло хорошо, хотелось бы больше вариантов суммы. В целом очень доволен.",
        date: "01.11.2025",
    },
    {
        id: 4,
        userName: "Ирина В.",
        tag: "Подписка Xbox Game Pass",
        rating: 5,
        description: "Оформление подписки без лишних шагов. Цена устроила, всё честно.",
        date: "08.01.2026",
    },
];

const ratings = [5, 4, 3, 2, 1] as const;

export default function Reviews({reviews} : {reviews: ReviewListStructure[]}) {

    return (
        <section className="w-full">
            <div className="mx-auto w-full pb-16 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 text-center sm:text-left">
                    <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
                        Что говорят о GameChange
                    </h1>
                    <p className="text-sm text-slate-400 sm:text-base">
                        Мы ценим каждый отзыв и постоянно улучшаем сервис. Здесь — реальные
                        впечатления пользователей, которые уже пополняли аккаунты и подписки.
                    </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((item) => (
                        <div
                            key={item.label}
                            className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5 text-center shadow-lg shadow-black/30"
                        >
                            <p className="text-sm text-slate-400">{item.label}</p>
                            <p className="mt-2 text-2xl font-semibold text-slate-50">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
                    <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
                        <h2 className="text-lg font-semibold text-slate-50">Последние отзывы</h2>

                        <div className="mt-5 grid gap-4">
                            {reviews.map((review) => (
                                <article key={review.id} className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-5">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <p className="text-sm font-semibold text-slate-100">
                                                {review.userName}
                                            </p>

                                            <p className="text-xs text-slate-400">{review.date}</p>
                                        </div>
                                        <span className="rounded-full border border-slate-700/70 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
                                            {review.tag}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center gap-1 text-amber-400">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <span key={`${review.id}-star-${index}`}>
                                                {index < review.rating ? "★" : "☆"}
                                            </span>
                                        ))}
                                        <span className="ml-2 text-xs text-slate-400">
                                            {review.rating}.0
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm text-slate-300">{review.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
                            <h2 className="text-lg font-semibold text-slate-50">Рейтинг магазина</h2>
                            <p className="mt-2 text-sm text-slate-400">
                                98% клиентов рекомендуют GameChange друзьям.
                            </p>

                            <div className="mt-5 space-y-3">
                                {ratings.map((rating) => (
                                    <div key={rating} className="flex items-center gap-3 text-sm text-slate-300">
                                        <span className="w-6">{rating}</span>
                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
                                            <div
                                                className="h-full rounded-full bg-amber-400/80"
                                                style={{ width: `${rating * 18}%` }}
                                            />
                                        </div>
                                        <span className="w-10 text-right text-xs text-slate-400">
                                            {rating * 10}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">

                            <LinkYellowBtn label={`Оставить отзыв`} href={`/reviews/add`} />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}