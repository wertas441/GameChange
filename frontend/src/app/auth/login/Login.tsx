'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {api, getServerErrorMessage, showErrorMessage} from '@/lib';
import { usePageUtils } from '@/lib/hooks/usePageUtils';
import MainInput from '@/components/inputs/MainInput';
import { loginSchema, LoginFormValues } from './validation';
import {BackendApiResponse} from "@/types";
import ServerFormError from "@/components/errors/ServerFormError";
import SubmitYellowBtn from "@/components/buttons/yellowButton/SubmitYellowBtn";
import {firstColorTheme, secondColorTheme} from "@/styles/styles";

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: LoginFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            email: values.email,
            password: values.password,
            remember: values.remember,
        };

        try {
            await api.post<BackendApiResponse>(`/auth/login`, payload);

            router.replace('/');
        } catch (err) {
            const message:string = getServerErrorMessage(err)

            setServerError(message);
            if (showErrorMessage) console.error('Login error:', err);

            setIsSubmitting(false)
        }
    };

    return (
        <div className={`${firstColorTheme} min-h-screen  text-slate-50 flex items-center justify-center px-4 py-8`}>
            <div className="relative z-10 w-full max-w-3xl items-center">
                <section className={`relative rounded-3xl border ${secondColorTheme} px-6 py-8 `}>
                    <header className="mb-6">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-300/80">
                            Вход в аккаунт
                        </p>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">Добро пожаловать в{' '}
                            <span className="bg-amber-400 bg-clip-text text-transparent">
                                GameChange
                            </span>
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Введите данные аккаунта, чтобы продолжить покупки и управлять своими цифровыми продуктами
                        </p>
                    </header>

                    <ServerFormError error={serverError} />

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="email"
                            type="email"
                            label="E-mail"
                            placeholder="you@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <MainInput
                            id="password"
                            type="password"
                            label="Пароль"
                            placeholder="Ваш пароль"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        <div className="flex items-center justify-between gap-4 pt-1">
                            <label className="inline-flex items-center gap-2 text-xs text-slate-300">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-400 focus:ring-sky-400"
                                    {...register('remember')}
                                />
                                <span>Запомнить меня</span>
                            </label>

                            <button
                                type="button"
                                className="text-xs font-medium text-sky-300 hover:text-sky-200 transition-colors"
                            >
                                Забыли пароль?
                            </button>
                        </div>

                        <SubmitYellowBtn
                            label={!isSubmitting ? 'Войти в аккаунт' : 'Входим…'}
                            disabled={isSubmitting}
                        />
                    </form>

                    <p className="mt-7 text-center text-sm text-slate-400">
                        Нет аккаунта?{' '}
                        <a
                            href="/auth/registration"
                            className="font-medium text-sky-300 hover:text-sky-200"
                        >
                            Зарегистрироваться
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}