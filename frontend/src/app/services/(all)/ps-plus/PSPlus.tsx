'use client'

import {useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import {api, getServerErrorMessage, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import MainInput from "@/components/inputs/MainInput";
import SubmitYellowBtn from "@/components/buttons/yellowButton/SubmitYellowBtn";
import ServerFormError from "@/components/errors/ServerFormError";
import Receive from "@/components/UI/servicesUI/Receive";
import NeedToKnow from "@/components/UI/servicesUI/NeedToKnow";
import Features from "@/components/UI/servicesUI/Features";
import ProductBtn from "@/components/UI/servicesUI/ProductBtn";
import ServiceHeader from "@/components/UI/servicesUI/ServiceHeader";

interface PSPlusFormValues {
    psnLogin: string;
    planId: string;
    promoCode: string;
}

const plans = [
    {
        id: "essential-1",
        label: "Essential",
        duration: "1 месяц",
        price: 499,
        description: "Онлайн, облачные сохранения, скидки",
    },
    {
        id: "essential-12",
        label: "Essential",
        duration: "12 месяцев",
        price: 3990,
        description: "Максимальная выгода за год",
    },
    {
        id: "extra-1",
        label: "Extra",
        duration: "1 месяц",
        price: 799,
        description: "Каталог из сотен игр",
    },
    {
        id: "extra-12",
        label: "Extra",
        duration: "12 месяцев",
        price: 6990,
        description: "Лучший выбор по цене",
    },
    {
        id: "deluxe-1",
        label: "Deluxe",
        duration: "1 месяц",
        price: 1090,
        description: "Классика и пробные версии",
    },
    {
        id: "deluxe-12",
        label: "Deluxe",
        duration: "12 месяцев",
        price: 9290,
        description: "Полный доступ без ограничений",
    },
];

const tiers = ["Essential", "Extra", "Deluxe"] as const;

const receive = [
    {
        title: "Онлайн мультиплеер",
        text: "Играйте с друзьями без ограничений.",
    },
    {
        title: "Ежемесячные игры",
        text: "Получайте новые игры каждый месяц.",
    },
    {
        title: "Облачные сохранения",
        text: "Резервные копии всегда под рукой.",
    },
    {
        title: "Эксклюзивные скидки",
        text: "Специальные цены в PlayStation Store.",
    },
];

const features = [
    "Активация подписки после оплаты",
    "Поддержка разных регионов аккаунта",
    "Безопасная передача данных",
    "Поддержка 24/7 в чате",
];

const text = `Мы не запрашиваем пароль от PSN. Достаточно логина или почты, чтобы активировать подписку. Все платежи проходят через защищённые каналы.`

export default function PSPlus() {

    const [activePlanId, setActivePlanId] = useState<string>(plans[0].id);

    const activePlan = useMemo(
        () => plans.find((plan) => plan.id === activePlanId) ?? plans[0],
        [activePlanId]
    );

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<PSPlusFormValues>({
        defaultValues: {
            planId: plans[0].id,
        },
    });

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: PSPlusFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            psnLogin: values.psnLogin,
            planId: values.planId,
            promoCode: values.promoCode,
            price: activePlan.price,
        };

        try {
            await api.post<BackendApiResponse>(`/services/ps-plus`, payload);

            router.push('/services');
        } catch (err) {
            const message: string = getServerErrorMessage(err);
            setServerError(message);

            if (showErrorMessage) console.error('PS Plus refill error:', err);

            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full">
            <ServiceHeader
                label={`Подписка PlayStation Plus`}
                text={`Выберите уровень подписки и срок, чтобы активировать PS Plus без ожиданий.`}
                imageAlt={`PlayStation Plus`}
                imageSrc={`/ps-plus-logo.png`}
            />

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold text-slate-50">Выбор подписки</h2>
                        <p className="text-sm text-slate-400">
                            Укажите логин PSN и выберите тариф PS Plus.
                        </p>
                    </div>

                    <ServerFormError error={serverError} />

                    <form className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="psnLogin"
                            label="PSN логин"
                            error={errors.psnLogin?.message}
                            {...register('psnLogin')}
                        />

                        <div className="space-y-4">
                            {tiers.map((tier) => (
                                <div key={tier}>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                        {tier}
                                    </p>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {plans.filter((plan) => plan.label === tier).map((plan) => {
                                            const onClick = () => {
                                                setActivePlanId(plan.id);
                                                setValue("planId", plan.id, { shouldValidate: true });
                                            }

                                            return (
                                                <ProductBtn
                                                    key={plan.id}
                                                    label={plan.duration}
                                                    onClick={onClick}
                                                    isActive={plan.id === activePlanId}
                                                    price={plan.price}
                                                    description={plan.description}
                                                />
                                            );
                                        })}
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
                            {...register('promoCode')}
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

                    <Receive label={`Что входит в PS Plus`} data={receive} />

                    <NeedToKnow text={text} />
                </div>
            </div>
        </section>
    );
}