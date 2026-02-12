'use client'

import Link from "next/link";
import Image from "next/image";
import LinkYellowBtn from "@/components/buttons/yellow/LinkYellowBtn";
import IconYellowBtn from "@/components/buttons/yellow/IconYellowBtn";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {CircleUser, Search, ShoppingCart, TextAlignJustify} from 'lucide-react'
import {inputColorTheme, secondColorTheme} from "@/styles/styles";
import ShopNavBarItem from "@/components/elements/ShopNavBarItem";
import {checkAuth, useUserStore} from "@/lib/store/userStore";
import {useCartStore} from "@/lib/store/cartStore";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import useGameKeys from "@/lib/hooks/useGameKeys";

const catalogItems = [
    {
        text: 'Игровые ключи',
        href: '/keys/catalog',
    },
    {
        text: 'Пополнение сервисов',
        href: '/services',
    },
    {
        text: 'Поддержка',
        href: '/support',
    },
    {
        text: 'Отзывы',
        href: '/reviews',
    },
    {
        text: 'О нас',
        href: '/about',
    },
] as const;

export default function MainHeader() {

    const [modalWindow, setModalWindow] = useState(false);
    const [query, setQuery] = useState<string>('');

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchBoxRef = useRef<HTMLDivElement | null>(null);

    const isAuth = useUserStore(checkAuth);
    const cartItemsCount = useCartStore((state) => state.cartItemsCount);

    const { router } = usePageUtils();
    const { keysData, isLoading, isError } = useGameKeys();

    const goToPage = useCallback((url: string) => {
        router.push(url);
        setModalWindow(false);
    }, [router]);

    const toggleModalWindow = useCallback(() => setModalWindow(prevState => !prevState), []);

    const onSearchInputFocus = useCallback(() => {
        setIsSearchOpen(true);
        setModalWindow(false);
    }, [])

    const onModalButtonClick = useCallback(() => {
        toggleModalWindow();
        setIsSearchOpen(false);
    }, [toggleModalWindow])

    const cartBadgeValue = cartItemsCount > 99 ? '99+' : String(cartItemsCount);

    const normalizedQuery = query.trim().toLowerCase();

    const filteredKeys = useMemo(() => {
        if (!keysData || normalizedQuery.length < 2) return [];

        return keysData
            .filter((key) => key.name.toLowerCase().includes(normalizedQuery))
            .slice(0, 6);
    }, [keysData, normalizedQuery]);

    useEffect(() => {
        if (normalizedQuery.length === 0) {
            setIsSearchOpen(false);
        }

    }, [normalizedQuery]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setModalWindow(false);
                setIsSearchOpen(false);
                setQuery('');
            }
        };

        if (modalWindow) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [modalWindow]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!searchBoxRef.current) return;
            if (!searchBoxRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className={`${secondColorTheme} relative mb-23 top-0 z-50 border-b border-slate-800/80 bg-slate-900/70 backdrop-blur`}>
            <div className="mx-auto w-full px-4 py-3 sm:px-6 md:px-12">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between gap-3">
                        <button
                            onClick={() => goToPage('/')}
                            className="text-amber-400 cursor-pointer font-semibold text-2xl tracking-wide leading-none"
                        >
                            GameChange
                        </button>

                        <div className="flex items-center gap-2 lg:hidden">
                            <div className="relative">
                                <IconYellowBtn
                                    IconComponent={ShoppingCart}
                                    onClick={() => goToPage('/cart')}
                                    className="mt-0 w-auto px-2 py-2 bg-slate-950/30 hover:bg-slate-800/60 border border-slate-800 text-slate-50"
                                />

                                {cartItemsCount > 0 && (
                                    <span className="absolute -right-1.5 -top-1.5 min-w-[1.35rem] rounded-full bg-amber-400 px-1.5 py-0.5 text-center text-[0.65rem] font-semibold leading-none text-slate-900">
                                        {cartBadgeValue}
                                    </span>
                                )}
                            </div>

                            {!isAuth ? (
                                <LinkYellowBtn
                                    label="Войти"
                                    href={'/auth/login'}
                                    className="mt-0 w-auto px-4 py-2.5 text-sm"
                                />
                            ) : (
                                <IconYellowBtn
                                    IconComponent={CircleUser}
                                    onClick={() => goToPage('/user/profile')}
                                    className="mt-0 w-auto px-2 py-2 bg-slate-950/30 hover:bg-slate-800/60 border border-slate-800 text-slate-50"
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:max-w-3xl">
                        <div className="relative flex items-center gap-2" ref={searchBoxRef}>
                            <div className="relative flex-1">
                                {useMemo(() => <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true"/> , [])}

                                <input
                                    id="game-search"
                                    type="search"
                                    value={query}
                                    onChange={(e) => {
                                        const nextValue = e.target.value;
                                        setQuery(nextValue);
                                        if (nextValue.trim().length > 0) {
                                            setIsSearchOpen(true);
                                        }
                                    }}
                                    onFocus={onSearchInputFocus}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Escape') {
                                            setQuery('');
                                            setIsSearchOpen(false);
                                        }
                                    }}
                                    placeholder="Поиск игр, сервисов, подписок..."
                                    aria-label="Поиск"
                                    className={`${inputColorTheme} block w-full rounded-2xl border bg-slate-950/40 shadow-sm shadow-black/20
                                    pl-10 pr-4 py-3 text-sm text-slate-50 outline-none ring-0 transition
                                    hover:bg-slate-950/55
                                    focus:border-amber-300/70 focus:ring-2 focus:ring-amber-400/20`}
                                />

                                {isSearchOpen && normalizedQuery.length > 0 && (
                                    <div className="absolute left-0 right-0 top-full z-40 mt-2 rounded-2xl border border-slate-800/80 bg-slate-900/95 p-2 shadow-xl shadow-black/30">
                                        {isLoading && (
                                            <div className="px-3 py-2 text-sm text-slate-300">
                                                Загрузка списка игр...
                                            </div>
                                        )}

                                        {!isLoading && (isError || keysData === undefined) && (
                                            <div className="px-3 py-2 text-sm text-rose-300">
                                                Не удалось загрузить игры
                                            </div>
                                        )}

                                        {!isLoading && !isError && normalizedQuery.length < 2 && (
                                            <div className="px-3 py-2 text-sm text-slate-400">
                                                Введите минимум 2 символа
                                            </div>
                                        )}

                                        {!isLoading && !isError && normalizedQuery.length >= 2 && filteredKeys.length === 0 && (
                                            <div className="px-3 py-2 text-sm text-slate-400">
                                                Ничего не найдено
                                            </div>
                                        )}

                                        {!isLoading && !isError && filteredKeys.length > 0 && (
                                            <div className="flex flex-col gap-2">
                                                {filteredKeys.map((key) => (
                                                    <Link
                                                        key={key.id}
                                                        href={`/keys/${key.keyUrl}`}
                                                        onClick={() => {
                                                            setIsSearchOpen(false);
                                                            setQuery('');
                                                        }}
                                                        className="flex items-center gap-3 rounded-xl px-2.5 py-2 transition hover:bg-slate-800/60"
                                                    >
                                                        <div className="h-10 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-800/70 bg-slate-950/40">
                                                            <Image
                                                                src={key.mainPicture}
                                                                alt={key.name}
                                                                width={96}
                                                                height={54}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex flex-1 items-center justify-between gap-3">
                                                            <div className="min-w-0">
                                                                <p className="truncate text-sm font-semibold text-slate-100">
                                                                    {key.name}
                                                                </p>
                                                            </div>
                                                            <span className="shrink-0 text-sm font-semibold text-amber-300">
                                                                {key.price} ₽
                                                            </span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={onModalButtonClick}
                                className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/30 px-2.5 py-2.5 md:px-3 md:py-3 text-slate-100 shadow-sm shadow-black/20 transition hover:bg-slate-800/60"
                                aria-label="Открыть меню"
                                aria-expanded={modalWindow}
                            >
                                {useMemo(() => <TextAlignJustify className="h-5 w-5" aria-hidden="true"/> , [])}
                            </button>
                        </div>
                    </div>

                    <div className="relative shrink-0 hidden lg:flex">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <IconYellowBtn
                                    IconComponent={ShoppingCart}
                                    onClick={() => goToPage('/cart')}
                                    className="mt-0 w-auto px-3 py-3 bg-slate-950/30 hover:bg-slate-800/60 border border-slate-800 text-slate-50"
                                />
                                {cartItemsCount > 0 && (
                                    <span className="absolute -right-1.5 top-1 min-w-[1.35rem] rounded-full bg-amber-400 px-1 py-1 text-center text-bold text-xs font-semibold leading-none text-slate-900">
                                        {cartBadgeValue}
                                    </span>
                                )}
                            </div>

                            {!isAuth ? (
                                <LinkYellowBtn
                                    label="Войти"
                                    href={'/auth/login'}
                                    className="mt-0 w-auto px-5 py-3"
                                />
                            ) : (
                                <IconYellowBtn
                                    IconComponent={CircleUser}
                                    onClick={() => goToPage('/user/profile')}
                                    className="mt-0 w-auto px-3 py-3 bg-slate-950/30 hover:bg-slate-800/60 border border-slate-800 text-slate-50"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`absolute left-0 right-0 top-full z-50 transition-opacity duration-200 ${modalWindow ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                 aria-hidden={!modalWindow} onClick={toggleModalWindow}
            >
                <div className="h-screen">
                    <div className={` ${secondColorTheme} w-full bg-slate-900/70 border-b border-slate-800/70 px-4 py-4 sm:px-6 md:px-12 shadow-xl shadow-black/30 
                    transition-all duration-200 ease-out ${modalWindow ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex flex-wrap  items-center gap-3 justify-start md:justify-center">
                            {catalogItems.map((item, index) => (
                                <ShopNavBarItem
                                    key={index}
                                    text={item.text}
                                    href={item.href}
                                    toggle={toggleModalWindow}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}