'use client'

import {useCallback, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {showErrorMessage} from "@/shared";
import {BackendApiResponse} from "@/shared/type";
import {usePageUtils} from "@/shared/lib/hooks/usePageUtils";
import MainInput from "@/shared/ui-kit/inputs/MainInput";
import YellowBtn from "@/shared/ui-kit/buttons/YellowBtn";
import ServerFormError from "@/shared/ui-kit/errors/ServerFormError";
import Features from "@/entities/services/ui/ServiceFeatures";
import Receive from "@/entities/services/ui/ServiceReceive";
import NeedToKnow from "@/entities/services/ui/ServiceNeedToKnow";
import ProductBtn from "@/entities/services/ui/ServiceProductBtn";
import ServiceHeader from "@/entities/services/ui/ServiceHeader";
import {validatePromoCode, validateSpotifyLogin} from "@/entities/services/model/validation";
import {spotifyFeatures, spotifyPlans, spotifyReceive, spotifyText} from "@/app/services/(all)/data";
import {getServerErrorMessage} from "@/shared/lib/server";
import {serverApi} from "@/shared/api";

interface SpotifyForm {
    login: string;
    planId: string;
    promoCode: string;
}

export default function Spotify() {

    const [activePlanId, setActivePlanId] = useState<string>(spotifyPlans[0].id);

    const activePlan = useMemo(() => {
        return spotifyPlans.find((plan) => plan.id === activePlanId) ?? spotifyPlans[0];
    }, [activePlanId]);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<SpotifyForm>({
        defaultValues: {
            planId: spotifyPlans[0].id,
        },
    });

    const { serverError, setServerError, isSubmitting, setIsSubmitting, goToPage } = usePageUtils();

    const onSubmit = async (values: SpotifyForm) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            spotifyLogin: values.login,
            planId: values.planId,
            promoCode: values.promoCode,
            price: activePlan.price,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/services/spotify`, payload);

            goToPage('/services');
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
                            id="login"
                            label="Логин Spotify"
                            error={errors.login?.message}
                            {...register('login', {validate: (value) => validateSpotifyLogin(value) || true })}
                        />

                        <div>
                            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                                Длительность подписки
                            </p>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {spotifyPlans.map(({id, label, price, description}) => (
                                    <ProductBtn
                                        key={id}
                                        label={label}
                                        onClick={() => onClick(id)}
                                        isActive={id === activePlanId}
                                        price={price}
                                        description={description}
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

                        <YellowBtn
                            label={!isSubmitting ? 'Перейти к оплате' : 'Переходим…'}
                            type={`submit`}
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