'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { baseBackendUrl } from '@/lib';
import { usePageUtils } from '@/lib/hooks/usePageUtils';
import MainInput from '@/components/inputs/MainInput';
import { loginSchema, type LoginFormValues } from './validation';
import {BackendApiResponse} from "@/types";
import ServerFormError from "@/components/errors/ServerFormError";
import SubmitYellowBtn from "@/components/buttons/yellowButton/SubmitYellowBtn";

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

        const config = {
            withCredentials: true,
        };

        try {
            const response = await axios.post<BackendApiResponse>(
                `${baseBackendUrl}/api/auth/login`,
                payload,
                config
            );

            const data = response.data;

            if (response.status >= 200 && response.status < 300) {
                router.replace('/');
                return;
            }

            setServerError(data.error || data.message || 'Ошибка авторизации. Проверьте правильность введенных данных.');
            setIsSubmitting(false);
        } catch (error) {
            const data = error?.response?.data as BackendApiResponse | undefined;
            setServerError(data?.error || data?.message || 'Не удалось связаться с сервером. Пожалуйста, проверьте ваше интернет-соединение или попробуйте позже.');
            console.error('Login error:', error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-4 py-8">
            <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-10 lg:gap-14 items-center">
                <section className="relative rounded-3xl bg-slate-950/80 border border-sky-500/30 shadow-[0_0_40px_rgba(56,189,248,0.25)] px-6 py-8 sm:px-8 sm:py-10 backdrop-blur-xl">
                    <header className="mb-6">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-300/80">
                            Вход в аккаунт
                        </p>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">Добро пожаловать в{' '}
                            <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                                GameChange
                            </span>
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Введите данные аккаунта, чтобы продолжить покупки и управлять
                            своими цифровыми продуктами.
                        </p>
                    </header>

                    <ServerFormError error={serverError} />

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
                                <span>Запомнить меня на этом устройстве</span>
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

                    <p className="mt-5 text-center text-xs text-slate-400">
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