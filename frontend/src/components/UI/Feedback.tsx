import {ArrowLeft, ArrowRight} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import {FeedBackStructure} from "@/types";

export default function Feedback({ feedBackData }: {feedBackData: FeedBackStructure[] }) {

    return (
        <div className="flex items-center justify-center px-3 md:px-15">

            <div className="swiper-button-prev-feedback mt-25 transform z-10 cursor-pointer rounded-full border border-slate-800/70 bg-slate-900/70 p-2
                 text-slate-200 backdrop-blur-sm transition-all duration-300 hover:bg-amber-400/90 hover:text-slate-950 hidden md:block"
            >
                <ArrowLeft className="h-10 w-10"/>
            </div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col gap-3 text-center">
                    <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
                        Что говорят наши клиенты
                    </h2>

                    <p className="text-sm text-slate-400 sm:text-base">
                        Реальные отзывы о скорости, цене и поддержке. Мы читаем каждый комментарий.
                    </p>
                </div>

                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        prevEl: '.swiper-button-prev-feedback',
                        nextEl: '.swiper-button-next-feedback',
                    }}
                    pagination={{
                        el: '.swiper-pagination-feedback',
                        clickable: true,
                    }}
                    loop={true}
                    spaceBetween={32}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1280: { slidesPerView: 3, spaceBetween: 32 },
                    }}
                >
                    {feedBackData.map((data) => (
                        <SwiperSlide key={data.id} className="h-auto! mt-10">
                            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30
                                               flex h-full flex-col transition-all duration-300"
                            >
                                <div className="grow">
                                    <div className={`flex-row md:flex items-center justify-between`}>
                                        <p className="font-semibold text-slate-50">{data.name}</p>
                                        <p className="text-sm text-slate-400">Покупка: {data.game}</p>
                                    </div>

                                    <div className="mt-3 text-amber-400">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <span key={`${data.id}-star-${index}`}>
                                                    {index < data.rating ? "★" : ""}
                                                </span>
                                        ))}
                                    </div>

                                    <blockquote className="mt-1 text-slate-300 italic">
                                        {/* Ограничиваем количество строк для предсказуемого вида */}
                                        <p className="line-clamp-4 text-lg">“{data.description}”</p>
                                    </blockquote>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div
                        className="swiper-pagination-feedback mt-6 flex justify-center gap-2 md:hidden
                                   [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2
                                   [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-slate-600/70
                                   [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:bg-amber-400"
                        slot="container-end"
                    />
                </Swiper>
            </div>

            <div className={`swiper-button-next-feedback mt-25 transform z-10 cursor-pointer rounded-full border border-slate-800/70 bg-slate-900/70 p-2
                   text-slate-200 backdrop-blur-sm transition-all duration-300 hover:bg-amber-400/90 hover:text-slate-950 hidden md:block`}
            >
                <ArrowRight className="h-10 w-10"/>
            </div>
        </div>
    );
}