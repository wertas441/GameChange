'use client'

import {useCallback, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {serverApi, showErrorMessage} from "@/shared/utils";
import {BackendApiResponse} from "@/shared/type";
import {MainInput, YellowBtn, ServerFormError, } from "@/shared/ui-kit/client";
import {
    ServiceReceive,
    ServiceNeedToKnow,
    validatePromoCode,
    validateXboxLogin,
    ServiceFeatures,
    ServiceProductBtn,
    ServiceHeader
} from "@/entities/services";
import {xboxFeatures, xboxPlans, xboxReceive, xboxText, xboxTiers} from "@/app/services/(all)/data";
import {getServerErrorMessage, usePageUtils} from "@/shared/lib/client";

interface XboxForm {
    login: string;
    planId: string;
    promoCode: string;
}

export default function Xbox() {

    const [activePlanId, setActivePlanId] = useState<string>(xboxPlans[0].id);

    const activePlan = useMemo(() => {
        return xboxPlans.find((plan) => plan.id === activePlanId) ?? xboxPlans[0]
    }, [activePlanId]);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<XboxForm>({
        defaultValues: {
            planId: xboxPlans[0].id,
        },
    });

    const { serverError, setServerError, isSubmitting, setIsSubmitting, goToPage } = usePageUtils();

    const onSubmit = async (values: XboxForm) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            login: values.login,
            planId: values.planId,
            promoCode: values.promoCode,
            price: activePlan.price,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/services/xbox`, payload);

            goToPage('/services');
        } catch (err) {
            const message: string = getServerErrorMessage(err);
            setServerError(message);

            if (showErrorMessage) console.error('Xbox Game Pass refill error:', err);

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
                            id="login"
                            label="Xbox логин"
                            error={errors.login?.message}
                            {...register('login', {validate: (value) => validateXboxLogin(value) || true })}
                        />

                        <div className="space-y-4">
                            {xboxTiers.map((tier) => (
                                <div key={tier}>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        {tier}
                                    </p>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {xboxPlans
                                            .filter(({label}) => label === tier)
                                            .map(({id, duration, price, description}) => (
                                            <ServiceProductBtn
                                                key={id}
                                                label={duration}
                                                onClick={() => onClick(id)}
                                                isActive={id === activePlanId}
                                                price={price}
                                                description={description}
                                            />
                                        ))}
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
                    <ServiceFeatures data={xboxFeatures} />

                    <ServiceReceive label={`Что входит в Game Pass`} data={xboxReceive} />

                    <ServiceNeedToKnow text={xboxText} />
                </div>
            </div>
        </section>
    );
}