import Image from "next/image";
import Link from "next/link";
import {ShieldCheck, Wallet, Zap} from "lucide-react";
import SpotlightCard from "@/components/UI/modern/SpotlightCard";

export default function DashboardHero() {
    return (
        <section className="relative overflow-hidden">
            <div
                className="absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full
                           bg-amber-400/20 blur-3xl"
            />
            <div
                className="absolute -left-20 bottom-0 h-[260px] w-[260px] rounded-full
                           bg-sky-500/10 blur-3xl"
            />

            <div className="container mx-auto px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-300">
                            <Zap className="h-4 w-4"/>
                            Ключи и пополнения за минуты
                        </div>

                        <h1 className="text-4xl font-semibold text-slate-50 sm:text-5xl lg:text-6xl">
                            Покупайте игры и пополняйте баланс без ожиданий
                        </h1>
                        <p className="text-base text-slate-300 sm:text-lg">
                            Лицензионные ключи, официальные пополнения Steam, PS и Xbox,
                            прозрачные цены и мгновенная доставка в личный кабинет.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/keys/catalog"
                                className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950
                                           transition-colors duration-300 hover:bg-amber-300"
                            >
                                Каталог игр
                            </Link>
                            <Link
                                href="/services"
                                className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200
                                           transition-colors duration-300 hover:border-amber-400/60 hover:text-amber-200"
                            >
                                Пополнить баланс
                            </Link>
                        </div>

                        <div className="grid gap-4 pt-2 sm:grid-cols-3">
                            <div className="flex items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-900/60 px-4 py-3">
                                <ShieldCheck className="h-5 w-5 text-amber-300"/>
                                <span className="text-sm text-slate-200">Безопасные покупки</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-900/60 px-4 py-3">
                                <Wallet className="h-5 w-5 text-amber-300"/>
                                <span className="text-sm text-slate-200">Низкая комиссия</span>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl border border-slate-800/70 bg-slate-900/60 px-4 py-3">
                                <Zap className="h-5 w-5 text-amber-300"/>
                                <span className="text-sm text-slate-200">Мгновенная доставка</span>
                            </div>
                        </div>
                    </div>

                    <SpotlightCard className="relative">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">GameChange</p>
                                <h3 className="mt-2 text-2xl font-semibold text-slate-50">Популярно сейчас</h3>
                            </div>
                            <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs font-semibold text-amber-300">
                                Топ продаж
                            </span>
                        </div>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-900/50 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <Image src="/steamIcon.svg" alt="Steam" width={24} height={24}/>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-200">Пополнение Steam</p>
                                        <p className="text-xs text-slate-400">от 100 ₽ за минуту</p>
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-amber-300">+0.8%</span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-900/50 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <Image src="/ps-store-logo.jpg" alt="PlayStation Store" width={28} height={28} className="rounded"/>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-200">PS Store</p>
                                        <p className="text-xs text-slate-400">мгновенные ваучеры</p>
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-amber-300">24/7</span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-900/50 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <Image src="/xbox-logo.jpg" alt="Xbox" width={28} height={28} className="rounded"/>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-200">Xbox Wallet</p>
                                        <p className="text-xs text-slate-400">без зарубежной карты</p>
                                    </div>
                                </div>
                                <span className="text-sm font-semibold text-amber-300">моментально</span>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <Image src="/steam-logo.jpg" alt="Steam Store" width={40} height={28} className="rounded"/>
                                <div>
                                    <p className="text-sm font-semibold text-slate-100">Скидки на ключи</p>
                                    <p className="text-xs text-amber-200/80">обновляем каждый день</p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-amber-300">до -70%</span>
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    )
}
