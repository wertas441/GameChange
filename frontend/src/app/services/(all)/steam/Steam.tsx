'use client'

import {useForm} from "react-hook-form";
import {api, getServerErrorMessage, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import MainInput from "@/components/inputs/MainInput";
import SubmitYellowBtn from "@/components/buttons/yellowButton/SubmitYellowBtn";
import ServerFormError from "@/components/errors/ServerFormError";
import Image from "next/image";

interface SteamFormValues {
    steamLogin: string;
    amount: string;
    promoCode: string;
}

const whyUs = ["Быстрое зачисление без ожиданий", "Прозрачная комиссия и итоговая сумма", "Безопасный ввод данных", "Поддержка популярных способов оплаты"] as const;

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
] as const;

const features = ["Без пароля", "От 100 ₽", "Поддержка 24/7", "Официальные платежи"] as const;

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
            <div className="mx-auto w-full px-4 pb-16 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/50">
                            <Image
                                src="/steam-logo.jpg"
                                alt="Steam"
                                width={48}
                                height={48}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
                            Пополнение кошелька Steam
                        </h1>
                    </div>

                    <p className=" text-sm text-slate-400 sm:text-base">
                        Быстрое пополнение баланса для покупок игр, DLC и внутриигрового контента.
                        Укажите логин, сумму и подтвердите оплату — средства появятся в кратчайшие сроки.
                    </p>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
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
                                {...register('steamLogin')}
                            />

                            <MainInput
                                id="amount"
                                label="Сумма пополнения"
                                error={errors.amount?.message}
                                {...register('amount')}
                            />

                            <MainInput
                                id="promoCode"
                                label="Промокод"
                                placeholder="Если есть"
                                error={errors.promoCode?.message}
                                {...register('promoCode')}
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
                        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
                            <h2 className="text-lg font-semibold text-slate-50">Почему GameChange</h2>

                            <ul className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                                {whyUs.map((text) => (
                                    <li key={text} className="flex items-start gap-3">
                                        <span className="mt-2 h-2 w-2 rounded-full bg-amber-400" />
                                        <span>{text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
                            <h2 className="text-lg font-semibold text-slate-50">Как это работает</h2>
                            <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                {howItWork.map((step, index) => (
                                    <div key={step.title} className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-400/50 bg-amber-400/10 text-xs font-semibold text-amber-300">
                                                {index + 1}
                                            </span>

                                            <h3 className="text-sm font-semibold text-slate-100">
                                                {step.title}
                                            </h3>
                                        </div>

                                        <p className="mt-2 text-xs text-slate-400">{step.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
                            <h2 className="text-lg font-semibold text-slate-50">Важно знать</h2>

                            <p className="mt-3 text-sm text-slate-400">
                                Мы никогда не запрашиваем пароль от Steam. Достаточно логина
                                или публичного никнейма. Если возникнут сложности, служба поддержки
                                поможет в чате или по почте.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {features.map((feature) => (
                                    <span key={feature} className="rounded-full border border-slate-700/70 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}