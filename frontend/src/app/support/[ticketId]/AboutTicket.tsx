'use client'

import {Ticket} from "@/types/support";
import {ShieldCheck} from "lucide-react";
import TicketHeader from "@/components/UI/support/TicketHeader";
import UserSupportQuestion from "@/components/UI/support/UserSupportQuestion";

export default function AboutTicket({ticketData}: {ticketData: Ticket}) {

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

                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5 shadow-lg shadow-black/20">
                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                        <ShieldCheck className="h-4 w-4 text-amber-300" />
                        Ответ поддержки
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-300">
                        {ticketData.answer ? ticketData.answer : 'Ответ пока не получен. Мы обязательно вернемся к вам как можно скорее.'}
                    </p>
                </div>
            </section>
        </div>
    )
}