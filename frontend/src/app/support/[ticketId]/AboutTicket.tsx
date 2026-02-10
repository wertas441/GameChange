'use client'

import {Ticket} from "@/types/support";
import {Clock, MessageSquare, Tag, UserCircle, ShieldCheck} from "lucide-react";

const statusStyles: Record<Ticket['status'], string> = {
    'Ожидает ответа': 'border-amber-400/40 bg-amber-500/10 text-amber-300',
    'Ответ получен': 'border-sky-400/40 bg-sky-500/10 text-sky-300',
};

export default function AboutTicket({ticketData}: {ticketData: Ticket}) {

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Поддержка</p>
                        <h1 className="mt-2 text-xl md:text-2xl font-semibold text-slate-50">
                            Обращение #{ticketData.id}
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            Подробная информация по вашему запросу в службу поддержки.
                        </p>
                        <h3 className="text-sm  mt-4 font-semibold uppercase tracking-[0.2em] text-slate-400">
                            Детали
                        </h3>
                        <div className="flex-row md:flex space-y-4 md:space-y-0 mt-4 gap-3 text-sm text-slate-300">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-amber-300" />
                                <span>Создан: {ticketData.createdAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-amber-300" />
                                <span>{ticketData.answeredAt !== '-' ? `Ответ: ${ticketData.answeredAt}` : 'Ожидаем ответ от администраторов' }</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <UserCircle className="h-4 w-4 text-amber-300" />
                                <span>Автор: {ticketData.ownerName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-amber-300" />
                                <span>Категория: {ticketData.category}</span>
                            </div>
                        </div>
                    </div>
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[ticketData.status]}`}>
                        {ticketData.status}
                    </span>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-slate-700/70 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
                                {ticketData.type}
                            </span>
                        </div>
                        <h2 className="text-xl font-semibold text-slate-50">
                            {ticketData.title}
                        </h2>
                        <p className="text-sm leading-relaxed text-slate-300">
                            {ticketData.description}
                        </p>
                    </div>
                </div>

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