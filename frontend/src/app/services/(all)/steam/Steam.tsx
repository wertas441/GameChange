'use client'

import {useForm} from "react-hook-form";
import {api, getServerErrorMessage, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import MainInput from "@/components/inputs/MainInput";
import SubmitYellowBtn from "@/components/buttons/yellowButton/SubmitYellowBtn";
import ServerFormError from "@/components/errors/ServerFormError";
import Features from "@/components/UI/servicesUI/Features";
import HowItWork from "@/components/UI/servicesUI/HowItWork";
import NeedToKnow from "@/components/UI/servicesUI/NeedToKnow";
import ServiceHeader from "@/components/UI/servicesUI/ServiceHeader";
import {
    validatePromoCode,
    validateServiceAmount,
    validateSteamLogin
} from "@/lib/validators/service";

interface SteamFormValues {
    steamLogin: string;
    amount: number;
    promoCode: string;
}

const features = ["Быстрое зачисление без ожиданий", "Прозрачная комиссия и итоговая сумма", "Безопасный ввод данных", "Поддержка популярных способов оплаты"];

const howItWork = [
    {
        title: "Введите логин",
        text: "Укажите свой Steam логин или никнейм.",
    },
    {
        title: "Выберите сумму",
        text: "Сумма пополнения от 100 ₽ и выше.",
    },
    {
        title: "Подтвердите оплату",
        text: "После оплаты баланс обновится автоматически.",
    },
];

const text = `Мы никогда не запрашиваем пароль от Steam. Достаточно логина или публичного никнейма. Если возникнут сложности, служба поддержки поможет в чате или по почте.`

export default function Steam() {

    const { register, handleSubmit, formState: { errors } } = useForm<SteamFormValues>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: SteamFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            steamLogin: values.steamLogin,
            amount: values.amount,
            promoCode: values.promoCode,
        };

        try {
            await api.post<BackendApiResponse>(`/services/steam`, payload);

            router.push('/services');
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
                            error={errors.steamLogin?.message}
                            {...register('steamLogin', {validate: (value) => validateSteamLogin(value) || true })}

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
    )
}