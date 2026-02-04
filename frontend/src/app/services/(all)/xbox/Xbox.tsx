'use client'

import Image from "next/image";
import {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {api, getServerErrorMessage, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import MainInput from "@/components/inputs/MainInput";
import SubmitYellowBtn from "@/components/buttons/yellowButton/SubmitYellowBtn";
import ServerFormError from "@/components/errors/ServerFormError";
import Receive from "@/components/UI/servicesUI/Receive";
import NeedToKnow from "@/components/UI/servicesUI/NeedToKnow";
import Features from "@/components/UI/servicesUI/Features";
import ProductBtn from "@/components/UI/servicesUI/ProductBtn";
import ServiceHeader from "@/components/UI/servicesUI/ServiceHeader";

interface XboxFormValues {
    xboxLogin: string;
    planId: string;
    promoCode: string;
}

const plans = [
    {
        id: "pc-1",
        label: "Game Pass PC",
        duration: "1 месяц",
        price: 499,
        description: "Каталог игр для ПК",
    },
    {
        id: "pc-3",
        label: "Game Pass PC",
        duration: "3 месяца",
        price: 1290,
        description: "Экономия при продлении",
    },
    {
        id: "console-1",
        label: "Game Pass Console",
        duration: "1 месяц",
        price: 599,
        description: "Игры для Xbox консоли",
    },
    {
        id: "console-3",
        label: "Game Pass Console",
        duration: "3 месяца",
        price: 1490,
        description: "Удобный пакет на квартал",
    },
    {
        id: "ultimate-1",
        label: "Game Pass Ultimate",
        duration: "1 месяц",
        price: 899,
        description: "ПК + консоль + облако",
    },
    {
        id: "ultimate-12",
        label: "Game Pass Ultimate",
        duration: "12 месяцев",
        price: 8990,
        description: "Максимальная выгода",
    },
];

const tiers = ["Game Pass PC", "Game Pass Console", "Game Pass Ultimate"];

const features = [
    "Активация подписки после оплаты",
    "Поддержка разных регионов аккаунта",
    "Безопасная передача данных",
    "Поддержка 24/7 в чате",
];

const receive = [
    {
        title: "Сотни игр",
        text: "Большой каталог для ПК и консоли.",
    },
    {
        title: "Новинки в день релиза",
        text: "Игры Xbox Game Studios сразу в доступе.",
    },
    {
        title: "Облачный гейминг",
        text: "Играйте без загрузки на разных устройствах.",
    },
    {
        title: "Эксклюзивные скидки",
        text: "Специальные предложения для подписчиков.",
    },
];

const text = `Мы не запрашиваем пароль от аккаунта Xbox. Достаточно логина или почты, чтобы активировать подписку. Все платежи проходят через защищённые каналы.`

export default function Xbox() {

    const [activePlanId, setActivePlanId] = useState<string>(plans[0].id);

    const activePlan = useMemo(
        () => plans.find((plan) => plan.id === activePlanId) ?? plans[0],
        [activePlanId]
    );

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<XboxFormValues>({
        defaultValues: {
            planId: plans[0].id,
        },
    });

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: XboxFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            xboxLogin: values.xboxLogin,
            planId: values.planId,
            promoCode: values.promoCode,
            price: activePlan.price,
        };

        try {
            await api.post<BackendApiResponse>(`/services/xbox`, payload);

            router.push('/services');
        } catch (err) {
            const message: string = getServerErrorMessage(err);
            setServerError(message);

            if (showErrorMessage) console.error('Xbox Game Pass refill error:', err);

            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full">
            <ServiceHeader
                label={`Подписка Xbox Game Pass`}
                text={`Выберите тариф и срок подписки Game Pass, чтобы получить доступ к каталогу игр.`}
                imageAlt={`Xbox Game Pass`}
                imageSrc={`/xbox-logo.jpg`}
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold text-slate-50">Выбор подписки</h2>

                        <p className="text-sm text-slate-400">
                            Укажите Xbox логин и выберите тариф Game Pass.
                        </p>
                    </div>

                    <ServerFormError error={serverError} />

                    <form className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="xboxLogin"
                            label="Xbox логин"
                            error={errors.xboxLogin?.message}
                            {...register('xboxLogin')}
                        />

                        <div className="space-y-4">
                            {tiers.map((tier) => (
                                <div key={tier}>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        {tier}
                                    </p>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {plans.filter((plan) => plan.label === tier).map((plan) => {
                                            const onClick = () => {
                                                setActivePlanId(plan.id);
                                                setValue("planId", plan.id, { shouldValidate: true });
                                            }

                                            return (
                                                <ProductBtn
                                                    key={plan.id}
                                                    label={plan.duration}
                                                    onClick={onClick}
                                                    isActive={plan.id === activePlanId}
                                                    price={plan.price}
                                                    description={plan.description}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                            <input type="hidden" {...register("planId")} />
                        </div>

                        <MainInput
                            id="promoCode"
                            label="Промокод"
                            placeholder="Если есть"
                            error={errors.promoCode?.message}
                            {...register('promoCode')}
                        />

                        <div className="rounded-xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 text-xs text-slate-400">
                            Итоговая стоимость выбранного периода:{" "}
                            <span className="font-semibold text-slate-100">{activePlan.price} ₽</span>
                        </div>

                        <SubmitYellowBtn
                            label={!isSubmitting ? 'Перейти к оплате' : 'Переходим…'}
                            disabled={isSubmitting}
                        />
                    </form>
                </div>

                <div className="flex flex-col gap-6">
                    <Features data={features} />

                    <Receive label={`Что входит в Game Pass`} data={receive} />

                    <NeedToKnow text={text} />
                </div>
            </div>
        </section>
    );
}