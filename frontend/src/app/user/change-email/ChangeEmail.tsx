'use client'

import {useForm} from "react-hook-form";
import MainInput from "@/components/inputs/MainInput";
import SubmitYellowBtn from "@/components/buttons/yellow/SubmitYellowBtn";
import ServerFormError from "@/components/errors/ServerFormError";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {validateUserConfirmEmail, validateUserEmail, validateUserPassword} from "@/lib/validators/user";
import {getServerErrorMessage, serverApi, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {changeEmail, useUserStore} from "@/lib/store/userStore";

interface ChangeEmailValues {
    newEmail: string;
    confirmEmail: string;
    password: string;
}

export default function ChangeEmail() {

    const { register, handleSubmit, getValues, formState: {errors} } = useForm<ChangeEmailValues>();

    const { serverError, setServerError, router, isSubmitting, setIsSubmitting } = usePageUtils();

    const makeChangeEmail = useUserStore(changeEmail)

    const onSubmit = async (values: ChangeEmailValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            newEmail: values.newEmail,
            password: values.password,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/user/change-email`, payload);

            makeChangeEmail(values.newEmail)
            router.replace('/user/profile');
        } catch (err) {
            const message:string = getServerErrorMessage(err)

            setServerError(message);
            if (showErrorMessage) console.error('change-email error:', err);

            setIsSubmitting(false)
        }
    };

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Контактные данные</p>

                <h1 className="mt-2 text-2xl font-semibold text-slate-50">Смена почты</h1>

                <p className="mt-2 text-sm text-slate-400">
                    Мы отправим подтверждение на новый адрес электронной почты
                </p>
            </section>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-slate-50">Новый адрес</h2>

                    <p className="mt-2 text-sm text-slate-400">
                        Для смены почты введите новый адрес и подтвердите действующий пароль
                    </p>

                    <ServerFormError error={serverError} />

                    <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="newEmail"
                            type="email"
                            label="Новый email"
                            error={errors.newEmail?.message}
                            {...register('newEmail', {validate: (value) => validateUserEmail(value) || true})}
                        />

                        <MainInput
                            id="confirmEmail"
                            type="email"
                            label="Подтверждение email"
                            error={errors.confirmEmail?.message}
                            {...register('confirmEmail', {
                                validate: (value) =>
                                    validateUserConfirmEmail(getValues("newEmail"), value) || true,
                            })}
                        />

                        <MainInput
                            id="password"
                            label="Пароль от аккаунта"
                            error={errors.password?.message}
                            {...register('password', {validate: (value) => validateUserPassword(value) || true})}
                        />

                        <SubmitYellowBtn
                            label={!isSubmitting ? 'Сохранить новый email' : 'Сохраняем…'}
                            disabled={isSubmitting}
                        />
                    </form>
                </section>

                <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-slate-50">Что важно знать</h3>

                    <ul className="mt-4 space-y-5 text-sm md:text-lg text-slate-300 list-disc pl-5">
                        <li>
                            Новый адрес нужно подтвердить — мы отправим письмо со ссылкой, активной 24 часа.
                            Пока подтверждение не завершено, старый email продолжит использоваться для входа и
                            получения важных уведомлений.
                        </li>

                        <li>
                            Для защиты аккаунта требуется пароль. Если вы его не помните, сначала восстановите
                            доступ через страницу входа — это сохранит ваши покупки и данные.
                        </li>

                        <li>
                            Мы уведомим вас письмом о результате смены почты и активности входов.
                            Если это были не вы — смените пароль и свяжитесь с поддержкой как можно быстрее.
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

