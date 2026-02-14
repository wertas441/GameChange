'use client'

import {useForm} from "react-hook-form";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {serverApi, getServerErrorMessage, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {secondColorTheme} from "@/styles/styles";
import ServerFormError from "@/components/errors/ServerFormError";
import MainInput from "@/components/inputs/MainInput";
import SubmitYellowBtn from "@/components/buttons/yellow/SubmitYellowBtn";
import HideInput from "@/components/inputs/HideInput";
import {
    validateUserConfirmPassword,
    validateUserEmail,
    validateUserName,
    validateUserPassword
} from "@/lib/validators/user";
import PixelBlast from "@/components/PixelBlast";

interface RegistrationFormValues {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Registration(){

    const {register, handleSubmit, getValues, formState: { errors }} = useForm<RegistrationFormValues>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: RegistrationFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            userName: values.userName,
            email: values.email,
            password: values.password,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/user/registration`, payload);

            router.push('/auth/login');
        } catch (err) {
            const message:string = getServerErrorMessage(err)

            setServerError(message);
            if (showErrorMessage) console.error('Registration error:', err);

            setIsSubmitting(false)
        }
    };

    return (
        <div className={`min-h-screen  text-slate-50 flex items-center justify-center`}>

            <div className="absolute inset-0 z-0">
                <PixelBlast
                    variant="square"
                    pixelSize={3}
                    color="#d2e826"
                    patternScale={2}
                    patternDensity={1}
                    enableRipples
                    rippleSpeed={0.5}
                    rippleThickness={0.1}
                    rippleIntensityScale={1}
                    speed={0.7}
                    transparent
                    edgeFade={0.5}
                />
            </div>

            <div className="relative z-10 w-full max-w-3xl items-center">
                <section className={`relative rounded-3xl border ${secondColorTheme} px-6 py-8 `}>
                    <header className="mb-6">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-300/80">
                            Регистрация
                        </p>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">Добро пожаловать в{' '}
                            <span className="bg-amber-400 bg-clip-text text-transparent">
                                GameChange
                            </span>
                        </h2>
                        <p className="mt-2 text-sm text-slate-400">
                            Придумайте данные для аккаунта, чтобы продолжить покупки и управлять своими цифровыми продуктами
                        </p>
                    </header>

                    <ServerFormError error={serverError} />

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <MainInput
                            id="userName"
                            label="Имя пользователя"
                            error={errors.userName?.message}
                            {...register('userName', {validate: (value) => validateUserName(value) || true})}
                        />

                        <MainInput
                            id="email"
                            type="email"
                            label="E-mail"
                            error={errors.email?.message}
                            {...register('email', {validate: (value) => validateUserEmail(value) || true})}
                        />

                        <HideInput
                            id="password"
                            label="Пароль"
                            error={errors.password?.message}
                            {...register('password', {validate: (value) => validateUserPassword(value) || true})}
                        />

                        <MainInput
                            id="confirmPassword"
                            type="password"
                            label="Подтверждение пароля"
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword', {
                                validate: (value) =>
                                    validateUserConfirmPassword(getValues("password"), value) || true,
                            })}
                        />

                        <SubmitYellowBtn
                            label={!isSubmitting ? 'Зарегистрироваться' : 'Регистрируем…'}
                            disabled={isSubmitting}
                        />
                    </form>

                    <p className="mt-7 text-center text-sm text-slate-400">
                        Уже есть аккаунт?{' '}
                        <a
                            href="/auth/login"
                            className="font-medium text-sky-300 hover:text-sky-200"
                        >
                            Войти
                        </a>
                    </p>
                </section>
            </div>
        </div>
    )
}