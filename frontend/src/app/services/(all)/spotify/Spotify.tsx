'use client'

import {useCallback, useMemo, useState} from "react";
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
import {spotifyFeatures, spotifyPlans, spotifyReceive, spotifyText} from "@/app/services/(all)/data";

interface SpotifyFormValues {
    spotifyLogin: string;
    planId: string;
    promoCode: string;
}

export default function Spotify() {

    const [activePlanId, setActivePlanId] = useState<string>(spotifyPlans[0].id);

    const activePlan = useMemo(
        () => spotifyPlans.find((plan) => plan.id === activePlanId) ?? spotifyPlans[0],
        [activePlanId]
    );

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<SpotifyFormValues>({
        defaultValues: {
            planId: spotifyPlans[0].id,
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

    const onClick = useCallback((id: string) => {
        setActivePlanId(id);
        setValue("planId", id, { shouldValidate: true });
    }, [setValue])

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
                                {spotifyPlans.map((plan) => (
                                    <ProductBtn
                                        key={plan.id}
                                        label={plan.label}
                                        onClick={() => onClick(plan.id)}
                                        isActive={plan.id === activePlanId}
                                        price={plan.price}
                                        description={plan.description}
                                    />
                                ))}
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
                    <Features data={spotifyFeatures} />

                    <Receive label={`Что входит в Spotify Premium`} data={spotifyReceive} />

                    <NeedToKnow text={spotifyText} />
                </div>
            </div>
        </section>
    );
}