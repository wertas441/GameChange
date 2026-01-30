'use client'

import Link from "next/link";
import Image from "next/image";
import {clearCart, getCartItems, useCartStore} from "@/lib/store/cartStore";
import {useForm} from "react-hook-form";
import MainInput from "@/components/inputs/MainInput";
import SubmitYellowBtn from "@/components/buttons/yellowButton/SubmitYellowBtn";
import LinkYellowBtn from "@/components/buttons/yellowButton/LinkYellowBtn";
import {addPurchases} from "@/lib/controllers/userController";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import ServerFormError from "@/components/errors/ServerFormError";

interface PaymentFormValues {
    email: string;
    cardNumber: string;
    cardDate: string;
    cardCVC: string;
}

export default function Payment({token}: {token: string}) {

    const {register, handleSubmit, formState: { errors }} = useForm<PaymentFormValues>();

    const cartItems = useCartStore(getCartItems);
    const makeClearCart = useCartStore(clearCart);

    const totalItemsCount = cartItems.reduce((sum, item) => sum + item.count, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * item.count, 0);

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();


    const onSubmit = async () => {

        if (cartItems.length === 0) {
            setServerError('На данный момент ваша корзина пуста, выберите товары для продолжения оплаты')
            return;
        }

        const response = await addPurchases(token, cartItems);

        if (response) {
            makeClearCart();
            return alert(`Покупка успешно оформлена`);
        }

        return alert(`Не удалось оформить покупку`);
    };

    if (cartItems.length === 0) {
        return (
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 text-center">
                <h1 className="text-2xl font-semibold text-slate-50">Оплата недоступна</h1>
                <p className="mt-2 text-sm text-slate-400">
                    Ваша корзина пуста. Добавьте товары, чтобы перейти к оплате.
                </p>
                <div className="mt-4 flex justify-center">
                    <LinkYellowBtn label="Перейти в каталог" href="/keys/catalog" className="w-auto px-6" />
                </div>
            </section>
        );
    }

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Оплата заказа</p>
                    <h1 className="mt-2 text-2xl font-semibold text-slate-50">Завершите покупку</h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Проверьте данные заказа и выберите удобный способ оплаты
                    </p>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-50">Данные карты</h2>
                        <p className="text-sm text-slate-400">
                            Мы не сохраняем данные карты — платеж проходит через защищённый шлюз.
                        </p>
                    </div>

                    <ServerFormError error={serverError} />

                    <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="email"
                            type="email"
                            label="Email для чека"
                            placeholder="you@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <MainInput
                            id="cardNumber"
                            label="Номер карты"
                            placeholder="0000 0000 0000 0000"
                            error={errors.cardNumber?.message}
                            {...register('cardNumber')}
                        />

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <MainInput
                                id="cardDate"
                                label="Срок действия"
                                placeholder="MM/YY"
                                error={errors.cardDate?.message}
                                {...register('cardDate')}
                            />
                            <MainInput
                                id="cardCVC"
                                label="CVC / CVV"
                                placeholder="123"
                                error={errors.cardCVC?.message}
                                {...register('cardCVC')}
                            />
                        </div>

                        <SubmitYellowBtn
                            label={!isSubmitting ? 'Оплатить заказ' : 'Проводим оплату…'}
                            disabled={isSubmitting}
                        />
                    </form>
                </section>

                <aside className="space-y-6">
                    <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8">
                        <div className="flex items-center justify-between border-b border-slate-800/70 pb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-50">Итоги заказа</h3>
                                <p className="text-sm text-slate-400">Проверьте состав и сумму</p>
                            </div>
                        </div>


                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-300">Товаров ({totalItemsCount} шт.)</p>
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
                    </section>

                    <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8">
                        <h4 className="text-lg font-semibold text-slate-50">Возникли вопросы?</h4>
                        <p className="mt-2 text-sm text-slate-400">
                            Мы готовы помочь с оплатой, возвратами и выдачей ключей.
                        </p>
                        <div className="mt-4">
                            <Link
                                href="/user/profile"
                                className="text-sm font-medium text-sky-300 hover:text-sky-200 transition-colors"
                            >
                                Перейти в центр поддержки
                            </Link>
                        </div>
                    </section>
                </aside>
            </div>

            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8">
                <h2 className="text-lg font-semibold text-slate-50">Состав заказа</h2>
                <p className="mt-2 text-sm text-slate-400">
                    Вы получите ключи сразу после подтверждения оплаты.
                </p>
                <ul role="list" className="mt-6 space-y-4">
                    {cartItems.map((item) => (
                        <li
                            key={item.id}
                            className="flex flex-col gap-4 rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4 sm:flex-row sm:items-center"
                        >
                            <div className="w-full shrink-0 sm:w-32">
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

                            <div className="flex flex-1 flex-col gap-2">
                                <Link
                                    href={`/keys/${item.keyUrl}`}
                                    className="text-base font-semibold text-slate-50 transition-colors hover:text-amber-400"
                                >
                                    {item.name}
                                </Link>
                                <p className="text-sm text-slate-400">Количество: {item.count}</p>
                            </div>

                            <div className="text-right text-lg font-semibold text-slate-50">
                                {(Number(item.price || 0) * item.count).toFixed(2)} ₽
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}

