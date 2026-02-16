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
import {validatePromoCode} from "@/lib/validators/service";
import {validateUserEmail} from "@/lib/validators/user";
import {chatGptFeatures, chatGptPlans, chatGptReceive, chatGptText, chatGptTiers} from "@/app/services/(all)/data";

interface ChatGptFormValues {
    email: string;
    planId: string;
    promoCode: string;
}

export default function ChatGpt() {

    const [activePlanId, setActivePlanId] = useState<string>(chatGptPlans[0].id);

    const activePlan = useMemo(
        () => chatGptPlans.find((plan) => plan.id === activePlanId) ?? chatGptPlans[0],
        [activePlanId]
    );

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ChatGptFormValues>({
        defaultValues: {
            planId: chatGptPlans[0].id,
        },
    });

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: ChatGptFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            email: values.email,
            planId: values.planId,
            promoCode: values.promoCode,
            price: activePlan.price,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/services/chat-gpt`, payload);

            router.push('/services');
        } catch (err) {
            const message: string = getServerErrorMessage(err);
            setServerError(message);

            if (showErrorMessage) console.error('ChatGPT subscription error:', err);

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
                label={`Подписка ChatGPT`}
                text={`Выберите тариф и срок подписки, чтобы получить доступ к расширенным возможностям.`}
                imageAlt={`ChatGPT`}
                imageSrc={`/chat-gpt-logo.png`}
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold text-slate-50">Выбор подписки</h2>

                        <p className="text-sm text-slate-400">
                            Укажите почту аккаунта и выберите подходящий тариф.
                        </p>
                    </div>

                    <ServerFormError error={serverError} />

                    <form className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="email"
                            label="Почта от аккаунта"
                            type="email"
                            error={errors.email?.message}
                            {...register('email', {validate: (value) => validateUserEmail(value) || true })}
                        />

                        <div className="space-y-4">
                            {chatGptTiers.map((tier) => (
                                <div key={tier}>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        {tier}
                                    </p>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {chatGptPlans.filter((plan) => plan.label === tier).map((plan) => (
                                            <ProductBtn
                                                key={plan.id}
                                                label={plan.duration}
                                                onClick={() => onClick(plan.id)}
                                                isActive={plan.id === activePlanId}
                                                price={plan.price}
                                                description={plan.description}
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

                        <SubmitYellowBtn
                            label={!isSubmitting ? 'Перейти к оплате' : 'Переходим…'}
                            disabled={isSubmitting}
                        />
                    </form>
                </div>

                <div className="flex flex-col gap-6">
                    <Features data={chatGptFeatures} />

                    <Receive label={`Что вы получаете с GPT Plus`} data={chatGptReceive} />

                    <NeedToKnow text={chatGptText} />
                </div>
            </div>
        </section>
    );
}