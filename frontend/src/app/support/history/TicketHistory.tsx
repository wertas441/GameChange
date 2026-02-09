'use client'

import Link from "next/link";
import {ArrowUpRight, History, Mail, User} from "lucide-react";
import {getUserData, useUserStore} from "@/lib/store/userStore";
import ServerErrorState from "@/components/errors/ServerErrorState";
import {useMemo} from "react";

type HistoryTicket = {
    id: string;
    title: string;
    category: string;
    closedAt: string;
    ownerName: string;
    ownerEmail: string;
    result: string;
};

const historyTickets: HistoryTicket[] = [
    {
        id: '1320',
        title: 'Перепутал почту при регистрации',
        category: 'Аккаунт',
        closedAt: '06 фев 2026, 18:55',
        ownerName: 'Илья С.',
        ownerEmail: 'ilya@example.com',
        result: 'Почта изменена, доступ восстановлен.',
    },
    {
        id: '1332',
        title: 'Не прошла оплата подписки',
        category: 'Оплата',
        closedAt: '07 фев 2026, 14:22',
        ownerName: 'Юлия Р.',
        ownerEmail: 'yulia@example.com',
        result: 'Оплата принята вручную, подписка активна.',
    },
    {
        id: '1338',
        title: 'Нужно уточнить регион ключа',
        category: 'Ключи',
        closedAt: '08 фев 2026, 09:40',
        ownerName: 'Максим Д.',
        ownerEmail: 'maxim@example.com',
        result: 'Подобран ключ по нужному региону.',
    },
];

export default function TicketHistory() {
    const userData = useUserStore(getUserData);

    if (!userData) {
        return <ServerErrorState />
    }

    const { isAdmin, email, userName } = userData;

    const normalizedTickets = useMemo(() => {
        if (isAdmin) return historyTickets;
        return historyTickets.map((ticket, index) => {
            if (index > 0) return ticket;
            return {
                ...ticket,
                ownerEmail: email,
                ownerName: userName || ticket.ownerName,
            };
        });
    }, [isAdmin, email, userName]);

    const visibleTickets = useMemo(() => {
        if (isAdmin) return normalizedTickets;
        return normalizedTickets.filter((ticket) => ticket.ownerEmail === email);
    }, [isAdmin, normalizedTickets, email]);

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">История</p>
                        <h1 className="mt-2 text-2xl font-semibold text-slate-50">История обращений</h1>
                        <p className="mt-2 text-sm text-slate-400">
                            {isAdmin
                                ? 'Закрытые тикеты, завершенные службой поддержки.'
                                : 'Все ваши завершенные обращения.'}
                        </p>
                    </div>
                    <Link
                        href="/support"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600/80 hover:bg-slate-800/60"
                    >
                        <History className="h-4 w-4 text-amber-300" />
                        Вернуться к активным
                    </Link>
                </div>
            </section>

            <section className="space-y-4">
                {visibleTickets.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/40 p-6 text-center">
                        <p className="text-lg font-semibold text-slate-200">История пока пуста</p>
                        <p className="mt-2 text-sm text-slate-400">
                            {isAdmin
                                ? 'Закрытые тикеты появятся здесь после завершения.'
                                : 'Сюда попадут закрытые обращения.'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {visibleTickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5 md:p-6 shadow-lg shadow-black/20"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                                                Закрыт
                                            </span>
                                            <span className="rounded-full border border-slate-700/70 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
                                                {ticket.category}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-50">{ticket.title}</h3>
                                        <p className="text-sm text-slate-400">{ticket.result}</p>
                                        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                                            <span className="inline-flex items-center gap-2">
                                                <History className="h-3.5 w-3.5 text-amber-300" />
                                                Закрыт: {ticket.closedAt}
                                            </span>
                                            {isAdmin && (
                                                <>
                                                    <span className="inline-flex items-center gap-2">
                                                        <User className="h-3.5 w-3.5 text-amber-300" />
                                                        {ticket.ownerName}
                                                    </span>
                                                    <span className="inline-flex items-center gap-2">
                                                        <Mail className="h-3.5 w-3.5 text-amber-300" />
                                                        {ticket.ownerEmail}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <Link
                                        href={`/support/${ticket.id}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600/80 hover:bg-slate-800/60"
                                    >
                                        Открыть тикет
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}