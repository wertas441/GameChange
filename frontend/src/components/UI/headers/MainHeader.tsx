'use client'

import Link from "next/link";
import LinkYellowBtn from "@/components/buttons/yellowButton/LinkYellowBtn";
import IconYellowBtn from "@/components/buttons/yellowButton/IconYellowBtn";
import {useCallback, useState} from "react";
import {CircleUser, Search, X, ShoppingCart, TextAlignJustify} from 'lucide-react'
import {inputColorTheme, secondColorTheme} from "@/styles/styles";
import ShopNavBarItem from "@/components/items/ShopNavBarItem";
import {checkAuth, useUserStore} from "@/lib/store/userStore";

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
    const [modalUserWindowOpen, setModalUserWindowOpen] = useState<boolean>(false);
    const [modalShopWindowOpen, setModalShopWindowOpen] = useState(false);
    const [query, setQuery] = useState<string>('');

    const toggleUserModalWindow = useCallback(() => {
        setModalUserWindowOpen(!modalUserWindowOpen);
        setModalShopWindowOpen(false);
    }, [modalUserWindowOpen]);

    const toggleShopModalWindow = useCallback(() => {
        setModalShopWindowOpen(!modalShopWindowOpen);
        setModalUserWindowOpen(false);
    }, [modalShopWindowOpen]);


    return (
        <header className={`${secondColorTheme} top-0 z-50 border-b border-slate-800/80 bg-slate-900/70 backdrop-blur`}>
            <div className="w-full mx-auto px-6 md:px-12 py-3">
                <div className="mx-auto flex items-center justify-between gap-4">
                    <Link href="/" className="shrink-0">
                        <h1 className="text-amber-400 font-semibold text-2xl tracking-wide leading-none">
                            GameChange
                        </h1>
                    </Link>

                    <div className="flex-1 mt-1.5 max-w-3xl">
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

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={toggleShopModalWindow}
                                    className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/30 px-3 py-3 text-slate-100 shadow-sm shadow-black/20 transition hover:bg-slate-800/60"
                                    aria-label="Открыть меню"
                                >
                                    <TextAlignJustify className="h-5 w-5" aria-hidden="true"/>
                                </button>
                            </div>


                        </div>
                    </div>

                    <div className="relative shrink-0">
                        <div className="flex items-center gap-3">
                            <IconYellowBtn
                                IconComponent={ShoppingCart}
                                onClick={() => {}}
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
                                    onClick={toggleUserModalWindow}
                                    className="mt-0 w-auto px-3 py-3 bg-slate-950/30 hover:bg-slate-800/60 border border-slate-800 text-slate-50"
                                />
                            )}
                        </div>

                        {isAuth && modalUserWindowOpen && (
                            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-lg shadow-black/30">
                                <div className="px-3 py-2 text-xs text-slate-300">
                                    Профиль: <span className="text-slate-100">в разработке</span>
                                </div>
                                <button
                                    type="button"
                                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-100 transition hover:bg-slate-800/60"
                                    onClick={() => setModalUserWindowOpen(false)}
                                >
                                    Закрыть
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {modalShopWindowOpen && (
                    <div className="w-full mt-1 mx-auto px-6 md:px-12 py-3">
                        <div className="flex items-center gap-5 justify-center">
                            {catalogItems.map((item, index) => (
                                <ShopNavBarItem
                                    key={index}
                                    text={item.text}
                                    href={item.href}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}