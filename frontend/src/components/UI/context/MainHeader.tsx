'use client'

import Link from "next/link";
import LinkYellowBtn from "@/components/buttons/yellowButton/LinkYellowBtn";
import IconYellowBtn from "@/components/buttons/yellowButton/IconYellowBtn";
import {useCallback, useState} from "react";
import {CircleUser, Search, X, ShoppingCart, TextAlignJustify} from 'lucide-react'
import {inputColorTheme, secondColorTheme} from "@/styles/styles";
import ShopNavBarItem from "@/components/elements/ShopNavBarItem";
import {checkAuth, useUserStore} from "@/lib/store/userStore";
import {useRouter} from "next/navigation";

const catalogItems = [
    {
        text: 'Игровые ключи',
        href: '/keys/catalog',
    },
    {
        text: 'Пополнение сервисов',
        href: '/',
    },
    {
        text: 'Гарантии',
        href: '/',
    },
    {
        text: 'Отзывы',
        href: '/',
    },
    {
        text: 'О нас',
        href: '/',
    },
] as const;

export default function MainHeader() {

    const isAuth = useUserStore(checkAuth);
    const [modalShopWindowOpen, setModalShopWindowOpen] = useState(false);
    const [query, setQuery] = useState<string>('');

    const router = useRouter();
    const goToCartPage = useCallback(() => router.push('/cart'), [router]);
    const goToUserPage = useCallback(() => router.push('/user'), [router]);

    const toggleShopModalWindow = useCallback(() => {
        setModalShopWindowOpen(prevState => !prevState);
    }, []);

    return (
        <header className={`${secondColorTheme} top-0 z-50 border-b border-slate-800/80 bg-slate-900/70 backdrop-blur`}>
            <div className="mx-auto w-full px-4 py-3 sm:px-6 md:px-12">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between gap-3">
                        <Link href="/" className="shrink-0">
                            <h1 className="text-amber-400 font-semibold text-2xl tracking-wide leading-none">
                                GameChange
                            </h1>
                        </Link>

                        <div className="flex items-center gap-2 lg:hidden">
                            <IconYellowBtn
                                IconComponent={ShoppingCart}
                                onClick={goToCartPage}
                                className="mt-0 w-auto px-2 py-2 bg-slate-950/30 hover:bg-slate-800/60 border border-slate-800 text-slate-50"
                            />

                            {!isAuth ? (
                                <LinkYellowBtn
                                    label="Войти"
                                    href={'/auth/login'}
                                    className="mt-0 w-auto px-4 py-2.5 text-sm"
                                />
                            ) : (
                                <IconYellowBtn
                                    IconComponent={CircleUser}
                                    onClick={goToUserPage}
                                    className="mt-0 w-auto px-2 py-2 bg-slate-950/30 hover:bg-slate-800/60 border border-slate-800 text-slate-50"
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:max-w-3xl">
                        <div className="relative flex items-center gap-2">
                            <div className="relative flex-1">
                                <Search
                                    className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                                    aria-hidden="true"
                                />

                                <input
                                    id="game-search"
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') setQuery('');
                                    }}
                                    placeholder="Поиск игр, сервисов, подписок..."
                                    aria-label="Поиск"
                                    className={`${inputColorTheme} block w-full rounded-2xl border bg-slate-950/40 shadow-sm shadow-black/20
                                    pl-10 pr-10 py-3 text-sm text-slate-50 outline-none ring-0 transition
                                    hover:bg-slate-950/55
                                    focus:border-amber-300/70 focus:ring-2 focus:ring-amber-400/20`}
                                />

                                {query.length > 0 && (
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-1.5 text-slate-300 transition hover:bg-slate-800/60 hover:text-slate-50"
                                        onClick={() => setQuery('')}
                                        aria-label="Очистить поиск"
                                    >
                                        <X className="h-4 w-4" aria-hidden="true"/>
                                    </button>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={toggleShopModalWindow}
                                className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/30 px-2.5 py-2.5 md:px-3 md:py-3 text-slate-100 shadow-sm shadow-black/20 transition hover:bg-slate-800/60"
                                aria-label="Открыть меню"
                            >
                                <TextAlignJustify className="h-5 w-5" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>


                    <div className="relative shrink-0 hidden lg:flex">
                        <div className="flex items-center gap-3">
                            <IconYellowBtn
                                IconComponent={ShoppingCart}
                                onClick={goToCartPage}
                                className="mt-0 w-auto px-3 py-3 bg-slate-950/30 hover:bg-slate-800/60 border border-slate-800 text-slate-50"
                            />

                            {!isAuth ? (
                                <LinkYellowBtn
                                    label="Войти"
                                    href={'/auth/login'}
                                    className="mt-0 w-auto px-5 py-3"
                                />
                            ) : (
                                <IconYellowBtn
                                    IconComponent={CircleUser}
                                    onClick={goToUserPage}
                                    className="mt-0 w-auto px-3 py-3 bg-slate-950/30 hover:bg-slate-800/60 border border-slate-800 text-slate-50"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {modalShopWindowOpen && (
                    <div className="mt-3 rounded-2xl border border-slate-800/70 bg-slate-900/80 p-3 shadow-lg ">
                        <div className="flex flex-wrap items-center gap-3 justify-start md:justify-center">
                            {catalogItems.map((item, index) => (
                                <ShopNavBarItem
                                    key={index}
                                    text={item.text}
                                    href={item.href}
                                    toggle={toggleShopModalWindow}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}