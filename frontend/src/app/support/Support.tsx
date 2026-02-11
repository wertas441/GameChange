'use client'

import Link from "next/link";
import {History, Plus} from "lucide-react";
import {getUserData, useUserStore} from "@/lib/store/userStore";
import ServerErrorState from "@/components/errors/ServerErrorState";
import {useMemo} from "react";
import {Ticket} from "@/types/support";
import SupportRow from "@/components/elements/SupportRow";

export default function Support({ticketList} : {ticketList: Ticket[]}) {

    const userData = useUserStore(getUserData);

    const { isAdmin, userName } = userData ?? { isAdmin: false, userName: '' };

    const normalizedTickets = useMemo(() => {
        if (isAdmin) return ticketList;
        return ticketList.map((ticket, index) => {
            if (index > 1) return ticket;
            return {
                ...ticket,
                ownerName: userName,
            };
        });
    }, [isAdmin, ticketList, userName]);

    const visibleTickets = useMemo(() => {
        if (isAdmin) return normalizedTickets;
        return normalizedTickets.filter((ticket) => ticket.ownerName === userName);
    }, [isAdmin, normalizedTickets, userName]);

    if (!userData) {
        return <ServerErrorState />
    }

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Поддержка</p>
                        <h1 className="mt-2 text-2xl font-semibold text-slate-50">
                            {isAdmin ? 'Центр обработки обращений' : 'Ваши обращения в поддержку'}
                        </h1>
                        <p className="mt-2 text-sm text-slate-400">
                            {isAdmin
                                ? 'Отслеживайте активные тикеты и отвечайте пользователям.'
                                : 'Создайте тикет или следите за статусом уже открытых вопросов.'}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                            href="/support/add"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:border-amber-300/70 hover:bg-amber-500/20"
                        >
                            <Plus className="h-4 w-4" />
                            Создать обращение
                        </Link>

                        <Link
                            href="/support/history"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600/80 hover:bg-slate-800/60"
                        >
                            <History className="h-4 w-4 text-amber-300" />
                            История ваших обращений
                        </Link>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-50">Активные обращения</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            {isAdmin
                                ? 'Все обращения, ожидающие действий.'
                                : 'Ваши открытые запросы в поддержку.'}
                        </p>
                    </div>
                    <p className="text-sm text-slate-400">
                        Показано: {visibleTickets.length}
                    </p>
                </div>

                {visibleTickets.length !== 0 ? (
                    <div className="space-y-5">
                        {visibleTickets.map((ticket) => (
                            <SupportRow
                                key={ticket.id}
                                ticket={ticket}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/40 p-6 text-center">
                        <p className="text-lg font-semibold text-slate-200">
                            Пока нет активных обращений
                        </p>
                        <p className="mt-2 text-sm text-slate-400">
                            {isAdmin
                                ? 'Здесь появятся новые обращения пользователей.'
                                : 'Создайте обращение, если вам нужна помощь.'}
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
}