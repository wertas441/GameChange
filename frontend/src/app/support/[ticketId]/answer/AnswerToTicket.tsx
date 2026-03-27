'use client'

import {TicketHeader, Ticket, UserSupportQuestion, validateTicketAnswer} from "@/entities/support";
import {ShieldCheck} from "lucide-react";
import {useForm} from "react-hook-form";
import {usePageUtils, getServerErrorMessage} from "@/shared/lib/client";
import {MainTextArea, ServerFormError, YellowBtn} from "@/shared/ui-kit/client";
import {BackendApiResponse} from "@/shared/type";
import {serverApi, showErrorMessage} from "@/shared/utils";

interface AnswerToTicketForm {
    answer: string;
}

export default function AnswerToTicket({ticketData}: {ticketData: Ticket}) {

    const { register, handleSubmit, formState: { errors } } = useForm<AnswerToTicketForm>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, goToPage } = usePageUtils();

    const { id, description, ownerName, title, type, answeredAt, createdAt, category, status } = ticketData;

    const onSubmit = async (values: AnswerToTicketForm) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            ticketId: id,
            answer: values.answer,
        };

        try {
            await serverApi.post<BackendApiResponse>(`/support/ticket/answer`, payload);

            goToPage('/support');
        } catch (err) {
            const message:string = getServerErrorMessage(err)

            setServerError(message);
            if (showErrorMessage) console.error('Add answer to ticket error:', err);

            setIsSubmitting(false)
        }
    };
    
    return (
        <div className="space-y-6">
            <TicketHeader
                id={id}
                createdAt={createdAt}
                answeredAt={answeredAt}
                ownerName={ownerName}
                category={category}
                status={status}
            />

            <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                <UserSupportQuestion
                    type={type}
                    title={title}
                    description={description}
                />

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-2xl space-y-6 border border-slate-800/70 bg-slate-900/60 p-5 shadow-lg shadow-black/20"
                >
                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                        <ShieldCheck className="h-4 w-4 text-amber-300" />
                        Ответ поддержки
                    </div>

                    <ServerFormError error={serverError} />

                    <MainTextArea
                        id="answer"
                        label="Ответ для пользовтеля"
                        error={errors.answer?.message}
                        {...register('answer', {validate: (value) => validateTicketAnswer(value) || true })}
                    />

                    <YellowBtn
                        label={!isSubmitting ? 'Ответить' : 'Процесс…'}
                        type={`submit`}
                        disabled={isSubmitting}
                    />
                </form>
            </section>
        </div>
    )
}

