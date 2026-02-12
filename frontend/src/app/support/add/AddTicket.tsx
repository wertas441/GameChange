'use client'

import {Controller, useForm} from "react-hook-form";
import {TicketCategory, TicketType} from "@/types/support";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {serverApi, getServerErrorMessage, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import {secondColorTheme} from "@/styles/styles";
import ServerFormError from "@/components/errors/ServerFormError";
import MultiSelectInput from "@/components/inputs/MultiSelectInput";
import {ticketCategorys, ticketTypes} from "@/lib/data";
import MainTextarea from "@/components/inputs/MainTextArea";
import SubmitYellowBtn from "@/components/buttons/yellow/SubmitYellowBtn";
import MainInput from "@/components/inputs/MainInput";

interface AddTicketFormValues {
    type: TicketType;
    category: TicketCategory;
    title: string;
    description: string;
}

export default function AddTicket() {

    const { register, handleSubmit, control, formState: { errors } } = useForm<AddTicketFormValues>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: AddTicketFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            type: values.type[0],
            category: values.category[0],
            title: values.title,
            description: values.description,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/support/ticket`, payload);

            router.push('/support');
        } catch (err) {
            const message:string = getServerErrorMessage(err)

            setServerError(message);
            if (showErrorMessage) console.error('Add new ticket error:', err);

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
                            Создать новое обращение в поддержку магазина
                        </h2>
                    </header>

                    <ServerFormError error={serverError} />

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                        <Controller
                            control={control}
                            name="type"
                            render={({field, fieldState}) => (
                                <MultiSelectInput
                                    id="type"
                                    label="Тип обращения"
                                    options={ticketTypes}
                                    value={ticketTypes.filter(o => (field.value ?? []).includes(o.value as never))}
                                    onChange={(vals) => field.onChange(vals.map(v => v.value as never))}
                                    isMulti={false}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="category"
                            render={({field, fieldState}) => (
                                <MultiSelectInput
                                    id="categorys"
                                    label="Категория обращения"
                                    options={ticketCategorys}
                                    value={ticketCategorys.filter(o => (field.value ?? []).includes(o.value as never))}
                                    onChange={(vals) => field.onChange(vals.map(v => v.value as never))}
                                    isMulti={false}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />

                        <MainInput
                            id="title"
                            label="Названпие вопроса / жалобы"
                            error={errors.title?.message}
                            {...register('title')}
                        />

                        <MainTextarea
                            id="description"
                            label="Описание"
                            error={errors.description?.message}
                            {...register('description')}
                        />

                        <SubmitYellowBtn
                            label={!isSubmitting ? 'Оставить обращение' : 'Процесс…'}
                            disabled={isSubmitting}
                        />
                    </form>
                </section>
            </div>
        </div>
    )
}