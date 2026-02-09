'use client'

import Link from "next/link";
import {ArrowUpRight, Clock, History, MessageSquare, Plus, User} from "lucide-react";
import {getUserData, useUserStore} from "@/lib/store/userStore";
import ServerErrorState from "@/components/errors/ServerErrorState";
import {useMemo} from "react";

interface Ticket {
    id: string;
    type: 'Вопрос' | 'Жалоба';
    category: string;
    title: string;
    description: string;
    status: 'Ожидает ответа' | 'Ответ получен';
    createdAt: string;
    answeredAt: string;
    ownerName: string;
}

const tickets: Ticket[] = [
    {
        id: '1423',
        title: 'Не приходит письмо с подтверждением',
        category: 'Аккаунт',
        status: 'Ожидает ответа',
        createdAt: '08 фев 2026, 12:15',
        answeredAt: '08 фев 2026, 13:02',
        ownerName: 'Артем Г.',
    },
    {
        id: '1424',
        title: 'Ошибка при оплате заказа',
        category: 'Оплата',
        status: 'Ожидает ответа',
        createdAt: '08 фев 2026, 18:41',
        answeredAt: '09 фев 2026, 09:20',
        ownerName: 'Мария К.',
    },
    {
        id: '1427',
        title: 'Не могу активировать ключ',
        category: 'Ключи',
        status: 'Ожидает ответа',
        createdAt: '09 фев 2026, 10:05',
        answeredAt: '09 фев 2026, 10:42',
        ownerName: 'Иван П.',
    },
    {
        id: '1429',
        title: 'Вопрос по возврату',
        category: 'Сервис',
        status: 'Ожидает ответа',
        createdAt: '09 фев 2026, 11:12',
        answeredAt: '09 фев 2026, 11:30',
        ownerName: 'Николай Т.',
    }
];

const statusStyles = {
    'Ожидает ответа': 'border-amber-400/40 bg-amber-500/10 text-amber-300',
    'Ответ получен': 'border-sky-400/40 bg-sky-500/10 text-sky-300',
};


export default function Support() {

    const userData = useUserStore(getUserData);

    const { isAdmin, userName } = userData;

    const normalizedTickets = useMemo(() => {
        if (isAdmin) return tickets;
        return tickets.map((ticket, index) => {
            if (index > 1) return ticket;
            return {
                ...ticket,
                ownerName: userName,
            };
        });
    }, [isAdmin, userName]);

    const visibleTickets = useMemo(() => {
        if (isAdmin) return normalizedTickets;
        return normalizedTickets.filter((ticket) => ticket.ownerName === userName);
    }, [isAdmin, normalizedTickets, userName]);

    const waitingCount = useMemo(() => (
        visibleTickets.filter((ticket) => ticket.status === 'Ожидает ответа').length
    ), [visibleTickets]);

    const inWorkCount = useMemo(() => (
        visibleTickets.filter((ticket) => ticket.status === 'Ответ получен').length
    ), [visibleTickets]);

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

                    {!isAdmin && (
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
                    )}
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-50">Активные тикеты</h2>
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

                {visibleTickets.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/40 p-6 text-center">
                        <p className="text-lg font-semibold text-slate-200">
                            Пока нет активных тикетов
                        </p>
                        <p className="mt-2 text-sm text-slate-400">
                            {isAdmin
                                ? 'Здесь появятся новые обращения пользователей.'
                                : 'Создайте тикет, если вам нужна помощь.'}
                        </p>
                        <Link
                            href="/support/add"
                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:border-amber-300/70 hover:bg-amber-500/20"
                        >
                            <Plus className="h-4 w-4" />
                            Создать тикет
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {visibleTickets.map((ticket) => (
                            <div key={ticket.id}
                                className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5 md:p-6 shadow-lg shadow-black/20"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[ticket.status]}`}>
                                                {ticket.status}
                                            </span>
                                            <span className="rounded-full border border-slate-700/70 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
                                                {ticket.category}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-semibold text-slate-50">
                                            {ticket.title}
                                        </h3>

                                        <p className="text-sm text-slate-400">{ticket.description}</p>

                                        <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                                            <span className="inline-flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5 text-amber-300" />
                                                Создан: {ticket.createdAt}
                                            </span>
                                            <span className="inline-flex items-center gap-2">
                                                <MessageSquare className="h-3.5 w-3.5 text-amber-300" />
                                                Ответ получен: {ticket.answeredAt}
                                            </span>
                                            {isAdmin && (
                                                <span className="inline-flex items-center gap-2">
                                                    <User className="h-3.5 w-3.5 text-amber-300" />
                                                    {ticket.ownerName}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                        {isAdmin ? (
                                            <>
                                                <Link
                                                    href={`/support/${ticket.id}`}
                                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600/80 hover:bg-slate-800/60"
                                                >
                                                    Подробности
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/support/${ticket.id}/answer`}
                                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:border-amber-300/70 hover:bg-amber-500/20"
                                                >
                                                    Ответить
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </Link>
                                            </>
                                        ) : (
                                            <Link
                                                href={`/support/${ticket.id}`}
                                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:border-amber-300/70 hover:bg-amber-500/20"
                                            >
                                                Подробности
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}