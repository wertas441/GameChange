'use client'

import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {ArrowLeft, ArrowRight, ShoppingCart} from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import FAQSection from '../components/UI/FAQSection'
import PrivilegeCard from "@/components/UI/cards/PrivilegeCard";
import {
    dashboardArrayOfData,
    dashboardFaqData,
    dashboardPrivileges,
    dashboardFeedBackData
} from "@/lib/dashboardData";
import Feedback from "@/components/UI/Feedback";

export default function Dashboard(){

    return (
        <div className="w-full space-y-35">

            <section id="popular-games" className="relative py-12">
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
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        loop={true}
                        spaceBetween={32}
                        breakpoints={{
                            640: {slidesPerView: 1, spaceBetween: 20},
                            768: {slidesPerView: 2, spaceBetween: 30},
                            1024: {slidesPerView: 4, spaceBetween: 32},
                        }}
                        className="pb-12! mt-10"
                    >
                        {dashboardArrayOfData.map(game => (
                            <SwiperSlide key={game.id}>
                                <div className="group relative h-full overflow-hidden rounded-2xl
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

                <div className="swiper-button-prev-custom absolute top-1/2 left-3 xl:left-12 2xl:left-24 transform
                                z-10 cursor-pointer rounded-full border border-slate-800/70 bg-slate-900/70 p-2
                                text-slate-200 backdrop-blur-sm transition-all duration-300 hover:bg-amber-400/90 hover:text-slate-950 hidden md:block">
                    <ArrowLeft className="h-10 w-10"/>
                </div>

                <div className={`swiper-button-next-custom absolute top-1/2 right-4 xl:right-12 2xl:right-24 transform
                                z-10 cursor-pointer rounded-full border border-slate-800/70 bg-slate-900/70 p-2
                                text-slate-200 backdrop-blur-sm transition-all duration-300 hover:bg-amber-400/90 hover:text-slate-950 hidden md:block`}>
                    <ArrowRight className="h-10 w-10"/>
                </div>
            </section>

            <section id="why-us" className="w-full">
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-3 text-center">
                        <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">Почему GameChange</h2>
                        <p className="text-sm text-slate-400 sm:text-base">
                            Сервис для тех, кто ценит скорость, честные цены и поддержку без ожиданий.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {dashboardPrivileges.map(privilege => (
                            <PrivilegeCard
                                key={privilege.title}
                                title={privilege.title}
                                IconComponent={privilege.icon}
                                text={privilege.text}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Feedback feedBackData={dashboardFeedBackData} />

            <section className="">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">Частые вопросы</h2>
                        <p className="mt-3 text-sm text-slate-400 sm:text-base">
                            Короткие ответы на то, что спрашивают чаще всего перед покупкой.
                        </p>
                    </div>
                    <div className="mt-10">
                        <FAQSection faqData={dashboardFaqData} />
                    </div>
                </div>
            </section>
        </div>
    )
}