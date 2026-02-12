'use client'

import {useForm} from "react-hook-form";
import {serverApi, getServerErrorMessage, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import MainInput from "@/components/inputs/MainInput";
import SubmitYellowBtn from "@/components/buttons/yellow/SubmitYellowBtn";
import ServerFormError from "@/components/errors/ServerFormError";
import Features from "@/components/UI/servicesUI/Features";
import HowItWork from "@/components/UI/servicesUI/HowItWork";
import NeedToKnow from "@/components/UI/servicesUI/NeedToKnow";
import ServiceHeader from "@/components/UI/servicesUI/ServiceHeader";
import {validatePromoCode, validatePSNLogin, validateServiceAmount} from "@/lib/validators/service";

interface PSStoreFormValues {
    psnLogin: string;
    amount: number;
    promoCode: string;
}

const features = [
    "Быстрое зачисление на баланс PS Store",
    "Поддержка популярных способов оплаты",
    "Безопасный ввод данных без пароля",
    "Поддержка 24/7 при любых вопросах",
];

const howItWork = [
    {
        title: "Введите PSN логин",
        text: "Укажите никнейм или почту от аккаунта PlayStation.",
    },
    {
        title: "Выберите сумму",
        text: "Сумма пополнения от 100 ₽ и выше.",
    },
    {
        title: "Оплатите",
        text: "Баланс обновится автоматически после оплаты.",
    },
] ;

const text = `Мы не запрашиваем пароль от PSN. Достаточно логина или почты. Если возникнут вопросы, поддержка поможет в чате или по почте.`

export default function PSStore() {

    const { register, handleSubmit, formState: { errors } } = useForm<PSStoreFormValues>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: PSStoreFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            psnLogin: values.psnLogin,
            amount: values.amount,
            promoCode: values.promoCode,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/services/ps-store`, payload);

            router.push('/services');
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
                            id="psnLogin"
                            label="PSN логин"
                            error={errors.psnLogin?.message}
                            {...register('psnLogin', {validate: (value) => validatePSNLogin(value) || true })}
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

                        <SubmitYellowBtn
                            label={!isSubmitting ? 'Перейти к оплате' : 'Переходим…'}
                            disabled={isSubmitting}
                        />
                    </form>
                </div>

                <div className="flex flex-col gap-6">
                    <Features data={features} />

                    <HowItWork data={howItWork} />

                    <NeedToKnow text={text} />
                </div>
            </div>
        </section>
    );
}