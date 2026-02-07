import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import {dashboardArrayOfData} from "@/lib/dashboardData";
import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, ShoppingCart} from "lucide-react";

export default function DashboardTopSell() {

    return (
        <div className="flex items-center justify-center px-3 md:px-15">

            <div className="swiper-button-prev-sell mt-25 transform z-10 cursor-pointer rounded-full border border-slate-800/70 bg-slate-900/70 p-2
                 text-slate-200 backdrop-blur-sm transition-all duration-300 hover:bg-amber-400/90 hover:text-slate-950 hidden md:block"
            >
                <ArrowLeft className="h-10 w-10"/>
            </div>

            <div className="container mx-auto px-10">
                <div className="flex flex-col gap-3 text-center">
                    <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
                        Сейчас в топе продаж
                    </h2>
                    <p className="text-sm text-slate-400 sm:text-base">
                        Подборка самых популярных ключей и кошельков с выгодными ценами.
                    </p>
                </div>

                <Swiper modules={[Navigation]}
                        navigation={{
                            nextEl: '.swiper-button-next-sell',
                            prevEl: '.swiper-button-prev-sell',
                        }}
                        loop={true}
                        spaceBetween={32}
                        breakpoints={{
                            640: {slidesPerView: 1, spaceBetween: 20},
                            768: {slidesPerView: 2, spaceBetween: 30},
                            1024: {slidesPerView: 4, spaceBetween: 32},
                        }}
                >
                    {dashboardArrayOfData.map(game => (
                        <SwiperSlide key={game.id}>
                            <div className="group relative h-full overflow-hidden rounded-2xl mt-10
                                                border border-slate-800/70 bg-slate-900/60 shadow-lg shadow-black/30
                                                transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/40">
                                <Image src={game.picture} alt={game.name} width={1920} height={1080}
                                       className="w-full h-auto object-cover aspect-3/4 transition-transform duration-300 group-hover:scale-105"/>
                                <div
                                    className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 w-full p-4">
                                    <Link href={`/shop/catalog/keys/${game.id}`}>
                                        <h1 className="text-xl font-semibold text-slate-50 transition-colors hover:text-amber-400">
                                            {game.name}
                                        </h1>
                                    </Link>

                                    <p className="text-2xl font-semibold text-amber-400">{game.price} ₽</p>

                                    <button className="mt-6 w-full cursor-pointer rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950
                                                             transition-all duration-300 hover:bg-amber-300
                                                             flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100
                                                             transform translate-y-4 group-hover:translate-y-0">
                                        <ShoppingCart className="h-5 w-5"/> В корзину
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={`swiper-button-next-sell mt-25 transform z-10 cursor-pointer rounded-full border border-slate-800/70 bg-slate-900/70 p-2
                   text-slate-200 backdrop-blur-sm transition-all duration-300 hover:bg-amber-400/90 hover:text-slate-950 hidden md:block`}
            >
                <ArrowRight className="h-10 w-10"/>
            </div>
        </div>
    )
}