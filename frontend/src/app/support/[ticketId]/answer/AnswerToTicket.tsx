'use client'

import {Ticket} from "@/types/support";
import TicketHeader from "@/components/UI/support/TicketHeader";
import UserSupportQuestion from "@/components/UI/support/UserSupportQuestion";
import {ShieldCheck} from "lucide-react";
import {useForm} from "react-hook-form";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import MainTextarea from "@/components/inputs/MainTextArea";
import {api, getServerErrorMessage, showErrorMessage} from "@/lib";
import {BackendApiResponse} from "@/types";
import SubmitYellowBtn from "@/components/buttons/yellowButton/SubmitYellowBtn";
import ServerFormError from "@/components/errors/ServerFormError";

interface AnswerToTicketFormValues {
    answer: string;
}

export default function AnswerToTicket({ticketData}: {ticketData: Ticket}) {

    const { register, handleSubmit, formState: { errors } } = useForm<AnswerToTicketFormValues>();

    const { serverError, setServerError, isSubmitting, setIsSubmitting, router } = usePageUtils();

    const onSubmit = async (values: AnswerToTicketFormValues) => {
        setServerError(null);
        setIsSubmitting(true);

        const payload = {
            answer: values.answer,
        };

        try {
            await api.post<BackendApiResponse>(`/support/ticket/answer`, payload);

            router.push('/support');
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
                id={ticketData.id}
                createdAt={ticketData.createdAt}
                answeredAt={ticketData.answeredAt}
                ownerName={ticketData.ownerName}
                category={ticketData.category}
                status={ticketData.status}
            />

            <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                <UserSupportQuestion
                    type={ticketData.type}
                    title={ticketData.title}
                    description={ticketData.description}
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

                    <MainTextarea
                        id="answer"
                        label="Ответ для пользовтеля"
                        error={errors.answer?.message}
                        {...register('answer')}
                    />

                    <SubmitYellowBtn
                        label={!isSubmitting ? 'Ответить' : 'Процесс…'}
                        disabled={isSubmitting}
                    />

                </form>
            </section>
        </div>
    )
}

