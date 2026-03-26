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
import {validatePromoCode, validatePSNLogin, validateServiceAmount} from "@/entities/services/model/validation";
import {psStoreFeatures, psStoreHowItWork, psStoreText} from "@/app/services/(all)/data";
import {getServerErrorMessage} from "@/features/server";

interface PSStoreForm {
    login: string;
    amount: number;
    promoCode: string;
}

export default function PSStore() {

    const { register, handleSubmit, formState: { errors } } = useForm<PSStoreForm>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, goToPage } = usePageUtils();

    const onSubmit = async (values: PSStoreForm) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            psnLogin: values.login,
            amount: values.amount,
            promoCode: values.promoCode,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/services/ps-store`, payload);

            goToPage('/services');
        } catch (err) {
            const message: string = getServerErrorMessage(err);
            setServerError(message);

            if (showErrorMessage) console.error('PS Store refill error:', err);

            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full">
            <ServiceHeader
                label={`Пополнение кошелька PS Store`}
                text={`Пополните баланс PlayStation Store для покупки игр, подписок и внутриигрового контента. Укажите логин, сумму и подтвердите оплату.`}
                imageAlt={`PlayStation Store`}
                imageSrc={`/ps-store-logo.jpg`}
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold text-slate-50">Форма пополнения</h2>

                        <p className="text-sm text-slate-400">
                            Введите данные аккаунта и сумму пополнения.
                        </p>
                    </div>

                    <ServerFormError error={serverError} />

                    <form className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="login"
                            label="PSN логин"
                            error={errors.login?.message}
                            {...register('login', {validate: (value) => validatePSNLogin(value) || true })}
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
                    <Features data={psStoreFeatures} />

                    <HowItWork data={psStoreHowItWork} />

                    <NeedToKnow text={psStoreText} />
                </div>
            </div>
        </section>
    );
}