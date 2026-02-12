'use client'

import {Controller, useForm} from "react-hook-form";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {serverApi, getServerErrorMessage, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {secondColorTheme} from "@/styles/styles";
import ServerFormError from "@/components/errors/ServerFormError";
import SubmitYellowBtn from "@/components/buttons/yellow/SubmitYellowBtn";
import MultiSelectInput from "@/components/inputs/MultiSelectInput";
import {reviewCategorys} from "@/lib/data";
import MainTextarea from "@/components/inputs/MainTextArea";
import InputError from "@/components/errors/InputError";
import {
    validateReviewCategory,
    validateReviewDescription,
    validateReviewRating,
} from "@/lib/validators/review";

interface AddReviewFormValues {
    category: string[];
    rating: number;
    description: string;
}

export default function AddReview() {

    const { register, handleSubmit, control, formState: { errors } } = useForm<AddReviewFormValues>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: AddReviewFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            tag: values.category[0],
            rating: values.rating,
            description: values.description,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/review/review`, payload);

            router.push('/reviews');
        } catch (err) {
            const message:string = getServerErrorMessage(err)

            setServerError(message);
            if (showErrorMessage) console.error('Add new review error:', err);

            setIsSubmitting(false)
        }
    };

    return (
        <div className={`min-h-full  text-slate-50 flex items-center justify-center`}>
            <div className="relative z-10 w-full max-w-3xl items-center">
                <section className={`relative rounded-3xl border ${secondColorTheme} px-6 py-8 `}>
                    <header className="mb-6">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-300/80">
                            Добавление
                        </p>
                        <h2 className="mt-2 text-xl sm:text-3xl font-semibold tracking-tight text-slate-50">
                            Оставить отзыв о магазине
                        </h2>
                    </header>

                    <ServerFormError error={serverError} />

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                        <Controller
                            control={control}
                            name="category"
                            rules={{validate: (value) => validateReviewCategory(value) || true}}
                            render={({field, fieldState}) => (
                                <MultiSelectInput
                                    id="categorys"
                                    label="Категория"
                                    options={reviewCategorys}
                                    value={reviewCategorys.filter(o => (field.value ?? []).includes(o.value as never))}
                                    onChange={(vals) => field.onChange(vals.map(v => v.value as never))}
                                    isMulti={false}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="rating"
                            rules={{validate: (value) => validateReviewRating(value) || true}}
                            render={({field, fieldState}) => (
                                <div className="space-y-2">
                                    <label
                                        htmlFor="rating"
                                        className="block text-xs ml-2 font-medium tracking-wide text-slate-200"
                                    >
                                        Оценка
                                    </label>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((value) => {
                                            const isActive = value <= (field.value ?? 0);
                                            return (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    onClick={() => field.onChange(value)}
                                                    className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-lg transition ${
                                                        isActive
                                                            ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                                                            : "border-slate-800/70 bg-slate-950/40 text-slate-400 hover:border-amber-400/40 hover:text-amber-300"
                                                    }`}
                                                    aria-label={`Оценка ${value}`}
                                                >
                                                    {isActive ? "★" : "☆"}
                                                </button>
                                            );
                                        })}

                                        <span className="text-sm text-slate-400">
                                            {field.value ? `${field.value} из 5` : ""}
                                        </span>
                                    </div>

                                    <InputError error={fieldState.error?.message} />
                                </div>
                            )}
                        />

                        <MainTextarea
                            id="description"
                            label="Описание"
                            error={errors.description?.message}
                            {...register('description', {validate: (value) => validateReviewDescription(value) || true })}
                        />

                        <SubmitYellowBtn
                            label={!isSubmitting ? 'Оставить отзыв' : 'Процесс…'}
                            disabled={isSubmitting}
                        />
                    </form>
                </section>
            </div>
        </div>
    )
}