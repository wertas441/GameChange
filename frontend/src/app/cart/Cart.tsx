'use client'

import Link from "next/link";
import Image from "next/image";
import {X} from "lucide-react";
import LinkYellowBtn from "@/components/buttons/yellowButton/LinkYellowBtn";
import {useCartStore} from "@/lib/store/cartStore";
import YellowBtn from "@/components/buttons/yellowButton/YellowBtn";
import GrayBtn from "@/components/buttons/grayButton/GrayBtn";

export default function Cart(){

    const cartItems = useCartStore((s) => s.cartState);
    const clearCart = useCartStore((s) => s.clearCart);
    const removeItem = useCartStore((s) => s.removeKey);
    const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);

    const goToBuyPage = () => {

    }

    return (
        <div className="mx-auto w-full py-8 md:py-12">
            <h1 className="mb-6 text-2xl font-bold text-slate-50 md:mb-8 md:text-3xl">Ваша корзина</h1>

            {cartItems.length !== 0 ? (
                <div className="flex flex-col gap-8 md:gap-12 lg:flex-row">
                    {/* Список товаров */}
                    <div className="lg:w-2/3">
                        <ul role="list" className="space-y-4 md:space-y-5">
                            {cartItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex flex-col gap-4 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 sm:flex-row md:p-6"
                                >

                                    <div className="w-full shrink-0 self-center sm:w-48 md:w-56">
                                        <div className="aspect-video overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/30">
                                            <Image
                                                src={item.mainPicture}
                                                alt={item.name}
                                                width={1920}
                                                height={1080}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Контент справа от картинки */}
                                    <div className="flex flex-1 flex-col sm:ml-4 md:ml-6">
                                        <div className="flex items-start justify-between text-base font-medium text-slate-50">
                                            <h2 className="pr-4 text-lg font-semibold md:text-xl">
                                                <Link href={`/keys/${item.keyUrl}`} className="transition-colors hover:text-amber-400">
                                                    {item.name}
                                                </Link>
                                            </h2>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="shrink-0 cursor-pointer rounded-xl border border-slate-800 bg-slate-950/40 p-1.5 text-slate-300 transition hover:text-amber-400 hover:border-amber-400/60"
                                                title="Удалить товар"
                                            >
                                                <X className="h-5 w-5 md:h-6 md:w-6" />
                                            </button>
                                        </div>

                                        <div className="mt-4 flex flex-1 items-end justify-between">
                                            <p className="text-xl font-semibold text-slate-50 md:text-2xl">
                                                {Number(item.price || 0).toFixed(2)} ₽
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <aside className="h-fit rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 lg:w-1/3">
                        <div className="flex items-center justify-between border-b border-slate-800/70 pb-4">
                            <h2 className="text-lg font-medium text-slate-50">Итоги заказа</h2>

                            <GrayBtn label={`Очистить корзину`} onClick={clearCart} />
                        </div>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-300">Товаров ({cartItems.length} шт.)</p>
                                <p className="text-sm font-medium text-slate-50">{totalPrice.toFixed(2)} ₽</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-300">Скидка</p>
                                <p className="text-sm font-medium text-emerald-400">- 0.00 ₽</p>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-800/70 pt-4">
                                <p className="text-base font-medium text-slate-50">Итого к оплате</p>
                                <p className="text-base font-medium text-slate-50">{totalPrice.toFixed(2)} ₽</p>
                            </div>
                        </div>

                        <YellowBtn
                            label={`Перейти к оформлению`}
                            onClick={goToBuyPage}
                            className={`mt-5`}
                        />
                    </aside>
                </div>
            ) : (
                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 text-center">
                    <p className="text-base font-semibold text-slate-100">Корзина пуста</p>
                    <p className="mt-2 text-sm text-slate-400">Добавьте товары из каталога.</p>
                    <div className="mt-5">
                        <LinkYellowBtn label="Перейти в каталог" href="/keys/catalog" className="mt-0 w-auto px-6 py-3" />
                    </div>
                </div>
            )}
        </div>
    )
}