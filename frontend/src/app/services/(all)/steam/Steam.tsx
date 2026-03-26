'use client'

import {useForm} from "react-hook-form";
import {serverApi, showErrorMessage} from "@/shared";
import {BackendApiResponse} from "@/shared/type";
import {usePageUtils} from "@/shared/hooks/usePageUtils";
import MainInput from "@/shared/UI-kit/inputs/MainInput";
import YellowBtn from "@/shared/UI-kit/buttons/YellowBtn";
import ServerFormError from "@/shared/UI-kit/errors/ServerFormError";
import Features from "@/entities/services/UI/ServiceFeatures";
import HowItWork from "@/entities/services/UI/ServiceHowItWork";
import NeedToKnow from "@/entities/services/UI/ServiceNeedToKnow";
import ServiceHeader from "@/entities/services/UI/ServiceHeader";
import {
    validatePromoCode,
    validateServiceAmount,
    validateSteamLogin
} from "@/entities/services/model/validation";
import {steamFeatures, steamHowItWork, steamText} from "@/app/services/(all)/data";
import {getServerErrorMessage} from "@/features/server";

interface SteamForm {
    login: string;
    amount: number;
    promoCode: string;
}

export default function Steam() {

    const { register, handleSubmit, formState: { errors } } = useForm<SteamForm>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, goToPage } = usePageUtils();

    const onSubmit = async (values: SteamForm) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            steamLogin: values.login,
            amount: values.amount,
            promoCode: values.promoCode,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/services/steam`, payload);

            goToPage('/services');
        } catch (err) {
            const message:string = getServerErrorMessage(err)

            setServerError(message);
            if (showErrorMessage) console.error('Steam refill error:', err);

            setIsSubmitting(false)
        }
    };

    return (
        <section className="w-full">
            <ServiceHeader
                label={`Пополнение кошелька Steam`}
                text={`Быстрое пополнение баланса для покупок игр, DLC и внутриигрового контента. Укажите логин, сумму и подтвердите оплату — средства появятся в кратчайшие сроки.`}
                imageAlt={`Steam`}
                imageSrc={`/steam-logo.jpg`}
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold text-slate-50">Форма пополнения</h2>
                        <p className="text-sm text-slate-400">
                            Заполните данные, чтобы оформить пополнение Steam.
                        </p>
                    </div>

                    <ServerFormError error={serverError} />

                    <form className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="steamLogin"
                            label="Логин Steam"
                            error={errors.login?.message}
                            {...register('login', {validate: (value) => validateSteamLogin(value) || true })}

                        />

                        <MainInput
                            id="amount"
                            label="Сумма пополнения"
                            error={errors.amount?.message}
                            {...register('amount', {validate: (value) => validateServiceAmount(value) || true })}
                        />

                        <MainInput
                            id="promoCode"
                            label="Промокод"
                            placeholder="Если есть"
                            error={errors.promoCode?.message}
                            {...register('promoCode', {validate: (value) => validatePromoCode(value) || true })}

                        />

                        <div className="rounded-xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 text-xs text-slate-400">
                            Нажимая кнопку, вы подтверждаете корректность данных и соглашаетесь
                            с условиями сервиса.
                        </div>

                        <YellowBtn
                            label={!isSubmitting ? 'Перейти к оплате' : 'Переходим…'}
                            type={`submit`}
                            disabled={isSubmitting}
                        />
                    </form>
                </div>

                <div className="flex flex-col gap-6">
                    <Features data={steamFeatures} />

                    <HowItWork data={steamHowItWork} />

                    <NeedToKnow text={steamText} />
                </div>
            </div>
        </section>
    )
}