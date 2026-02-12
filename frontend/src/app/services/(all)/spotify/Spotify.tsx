'use client'

import {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {serverApi, getServerErrorMessage, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import MainInput from "@/components/inputs/MainInput";
import SubmitYellowBtn from "@/components/buttons/yellow/SubmitYellowBtn";
import ServerFormError from "@/components/errors/ServerFormError";
import Features from "@/components/UI/servicesUI/Features";
import Receive from "@/components/UI/servicesUI/Receive";
import NeedToKnow from "@/components/UI/servicesUI/NeedToKnow";
import ProductBtn from "@/components/UI/servicesUI/ProductBtn";
import ServiceHeader from "@/components/UI/servicesUI/ServiceHeader";
import {validatePromoCode, validateSpotifyLogin} from "@/lib/validators/service";

interface SpotifyFormValues {
    spotifyLogin: string;
    planId: string;
    promoCode: string;
}

const plans = [
    {
        id: "month",
        label: "1 месяц",
        price: 399,
        description: "Для быстрого старта",
    },
    {
        id: "3months",
        label: "3 месяца",
        price: 999,
        description: "Экономия до 15%",
    },
    {
        id: "6months",
        label: "6 месяцев",
        price: 1890,
        description: "Оптимальный вариант",
    },
    {
        id: "year",
        label: "12 месяцев",
        price: 3490,
        description: "Максимальная выгода",
    },
];

const features = [
    "Официальная подписка Spotify Premium",
    "Моментальная активация после оплаты",
    "Поддержка любых регионов аккаунта",
    "Поддержка 24/7 в чате",
];

const receive = [
    {
        title: "Без рекламы",
        text: "Слушайте музыку и подкасты без пауз и баннеров.",
    },
    {
        title: "Офлайн режим",
        text: "Скачивайте треки и слушайте без интернета.",
    },
    {
        title: "Высокое качество",
        text: "Максимальное качество звука для ваших устройств.",
    },
    {
        title: "Любые устройства",
        text: "Телефон, ПК, планшет и смарт-колонки.",
    },
];

const text = `Оплата безопасна: мы не запрашиваем пароль от аккаунта. Достаточно логина или почты, на которую зарегистрирован Spotify.`

export default function Spotify() {

    const [activePlanId, setActivePlanId] = useState<string>(plans[0].id);

    const activePlan = useMemo(
        () => plans.find((plan) => plan.id === activePlanId) ?? plans[0],
        [activePlanId]
    );

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<SpotifyFormValues>({
        defaultValues: {
            planId: plans[0].id,
        },
    });

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: SpotifyFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            spotifyLogin: values.spotifyLogin,
            planId: values.planId,
            promoCode: values.promoCode,
            price: activePlan.price,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/services/spotify`, payload);

            router.push('/services');
        } catch (err) {
            const message: string = getServerErrorMessage(err);
            setServerError(message);

            if (showErrorMessage) console.error('Spotify refill error:', err);
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full">
            <ServiceHeader
                label={`Подписка Spotify Premium`}
                text={`Выберите срок подписки и оформите оплату за пару минут. После подтверждения подписка активируется автоматически.`}
                imageAlt={`Spotify`}
                imageSrc={`/spotify-logo.png`}
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold text-slate-50">Выбор подписки</h2>

                        <p className="text-sm text-slate-400">
                            Укажите логин Spotify и выберите длительность подписки.
                        </p>
                    </div>

                    <ServerFormError error={serverError} />

                    <form className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="spotifyLogin"
                            label="Логин Spotify"
                            error={errors.spotifyLogin?.message}
                            {...register('spotifyLogin', {validate: (value) => validateSpotifyLogin(value) || true })}
                        />

                        <div>
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                                Длительность подписки
                            </p>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {plans.map((plan) => {
                                    const onClick = () => {
                                        setActivePlanId(plan.id);
                                        setValue("planId", plan.id, { shouldValidate: true });
                                    }

                                    return (
                                        <ProductBtn
                                            key={plan.id}
                                            label={plan.label}
                                            onClick={onClick}
                                            isActive={plan.id === activePlanId}
                                            price={plan.price}
                                            description={plan.description}
                                        />
                                    );
                                })}
                            </div>

                            <input type="hidden" {...register("planId")} />
                        </div>

                        <MainInput
                            id="promoCode"
                            label="Промокод"
                            placeholder="Если есть"
                            error={errors.promoCode?.message}
                            {...register('promoCode', {validate: (value) => validatePromoCode(value) || true })}
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

                    <Receive label={`Что входит в Spotify Premium`} data={receive} />

                    <NeedToKnow text={text} />
                </div>
            </div>
        </section>
    );
}