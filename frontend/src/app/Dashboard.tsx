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
    dashboardTestimonialsData
} from "@/lib/dashboardData";
import Feedback from "@/components/UI/Feedback";

export default function Dashboard(){

    return (
        <div className={``}>
            <section id="popular-games" className="mb-35 relative">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-20 text-white">Сейчас в топе продаж</h2>

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
                        className="!pb-10"
                    >
                        {dashboardArrayOfData.map(game => (
                            <SwiperSlide key={game.id}>
                                <div className="group relative bg-[#1A1129] rounded-xl overflow-hidden
                                                     border border-transparent hover:border-[#aeb2ae] transition-all duration-300 h-full flex flex-col">
                                    <Image src={game.picture} alt={game.name} width={1920} height={1080}
                                           className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-300 group-hover:scale-105"/>
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-4 w-full">
                                        <Link href={`/shop/catalog/keys/${game.id}`}>
                                            <h1 className="text-2xl font-bold hover:text-green-400 text-white">{game.name}</h1>
                                        </Link>

                                        <div className="flex items-baseline gap-2 mt-2">
                                            <p className="text-2xl font-bold text-white">{game.price} ₽</p>
                                        </div>

                                        <button className="mt-6 w-full bg-[#00FE92] hover:bg-[#099f5f] cursor-pointer text-black font-bold py-2 rounded-lg
                                                             flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100
                                                             transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            <ShoppingCart className="h-5 w-5"/> В корзину
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="swiper-button-prev-custom absolute top-1/2 left-4 xl:left-12 2xl:left-24 transform
                                z-10 cursor-pointer p-2 bg-[#212227]/80  hover:bg-[#00FE92] hover:text-black rounded-full backdrop-blur-sm
                                transition-all duration-300 hidden md:block">
                    <ArrowLeft className="h-10 w-10 text-white hover:text-black "/>
                </div>

                <div className={`swiper-button-next-custom absolute top-1/2 right-4 xl:right-12 2xl:right-24 transform
                                z-10 cursor-pointer p-2 bg-[#212227]/80  hover:bg-[#00FE92] hover:text-black rounded-full backdrop-blur-sm
                                transition-all duration-300 hidden md:block`}>
                    <ArrowRight className="h-10 w-10 text-white hover:text-black"/>
                </div>
            </section>

            <section id="why-us" className="mb-5">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-20 text-white">Почему GameChange?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

            <Feedback testimonials={dashboardTestimonialsData} />

            <section className="py-20 mt-15 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">Часто задаваемые вопросы</h2>
                    </div>
                    <div className="mt-14">
                        <FAQSection faqData={dashboardFaqData} />
                    </div>
                </div>
            </section>
        </div>
    )
}