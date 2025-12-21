'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { baseBackendUrl } from '@/lib';
import { usePageUtils } from '@/lib/hooks/usePageUtils';
import MainInput from '@/components/inputs/MainInput';
import { loginSchema, type LoginFormValues } from './validation';

export default function Login() {

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const {register, handleSubmit, formState: { errors },} = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: true,
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        setServerError(null);
        setIsSubmitting(true);
        try {
            await axios.post(
                `${baseBackendUrl}/api/auth/login`,
                {
                    email: values.email,
                    password: values.password,
                    remember: values.remember,
                },
                {
                    withCredentials: true,
                },
            );

            router.push('/dashboard');
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                'Не удалось войти. Попробуйте ещё раз.';
            setServerError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-center justify-center px-4 py-8">

            <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-10 lg:gap-14 items-center">

                {/* Правая часть — сама форма логина */}
                <section className="relative rounded-3xl bg-slate-950/80 border border-sky-500/30 shadow-[0_0_40px_rgba(56,189,248,0.25)] px-6 py-8 sm:px-8 sm:py-10 backdrop-blur-xl">
                    <header className="mb-6">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-300/80">
                            Вход в аккаунт
                        </p>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
                            Добро пожаловать в{' '}
                            <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                GameChange
              </span>
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Введите данные аккаунта, чтобы продолжить покупки и управлять
                            своими цифровыми продуктами.
                        </p>
                    </header>

                    {serverError && (
                        <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-100">
                            {serverError}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="email"
                            type="email"
                            autoComplete="email"
                            label="E-mail"
                            placeholder="you@example.com"
                            error={errors.email?.message as string | undefined}
                            {...register('email')}
                        />

                        <MainInput
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            label="Пароль"
                            placeholder="Ваш пароль"
                            error={errors.password?.message as string | undefined}
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

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(250,204,21,0.35)] transition hover:shadow-[0_20px_45px_rgba(250,204,21,0.5)] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-80 disabled:shadow-none"
                        >
                            {isSubmitting ? 'Входим…' : 'Войти в аккаунт'}
                        </button>
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