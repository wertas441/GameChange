'use client'

import {useForm} from "react-hook-form";
import HideInput from "@/components/inputs/HideInput";
import SubmitYellowBtn from "@/components/buttons/yellow/SubmitYellowBtn";
import ServerFormError from "@/components/errors/ServerFormError";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import MainInput from "@/components/inputs/MainInput";

interface ChangePasswordValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export default function ChangePassword() {
    const {register, handleSubmit, formState: {errors}} = useForm<ChangePasswordValues>({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    const {serverError, setServerError, isSubmitting, setIsSubmitting} = usePageUtils();

    const onSubmit = async () => {
        setServerError(null);
        setIsSubmitting(true);
        setTimeout(() => setIsSubmitting(false), 600);
    };

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Безопасность</p>
                    <h1 className="mt-2 text-2xl font-semibold text-slate-50">Смена пароля</h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Используйте сложный пароль и не повторяйте его на других сайтах
                    </p>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-slate-50">Обновить пароль</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Сначала введите текущий пароль, затем придумайте новый
                    </p>

                    <ServerFormError error={serverError} />

                    <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="currentPassword"
                            label="Текущий пароль"
                            error={errors.currentPassword?.message}
                            {...register('currentPassword')}
                        />
                        <HideInput
                            id="newPassword"
                            label="Новый пароль"
                            error={errors.newPassword?.message}
                            {...register('newPassword')}
                        />
                        <MainInput
                            id="confirmPassword"
                            label="Подтверждение пароля"
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword')}
                        />

                        <SubmitYellowBtn
                            label={!isSubmitting ? 'Сохранить изменения' : 'Сохраняем…'}
                            disabled={isSubmitting}
                        />
                    </form>
                </section>

                <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-slate-50">Рекомендации</h3>
                    <ul className="mt-4 space-y-4 text-sm md:text-lg text-slate-300 list-disc pl-5">
                        <li>
                            Используйте минимум 10–12 символов, добавьте цифры и разные регистры. Хороший пароль —
                            это не слово, а фраза с заменами, например: «GameChange_2026».
                        </li>
                        <li>
                            Не повторяйте пароль на других сервисах. Если где-то случится утечка, это защитит аккаунт
                            от автоматических подборов.
                        </li>
                        <li>
                            После смены пароля может потребоваться повторная авторизация на новых устройствах и
                            в браузерах. Это нормальная мера безопасности.
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}