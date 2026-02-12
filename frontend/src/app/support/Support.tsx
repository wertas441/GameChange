'use client'

import {History, Plus} from "lucide-react";
import {getUserData, useUserStore} from "@/lib/store/userStore";
import ServerErrorState from "@/components/errors/ServerErrorState";
import {useMemo} from "react";
import {Ticket} from "@/types/support";
import SupportRow from "@/components/elements/SupportRow";
import GrayBtn from "@/components/buttons/gray/GrayBtn";
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import YellowGlassBtn from "@/components/buttons/yellowGlass/YellowGlassBtn";

export default function Support({ticketList} : {ticketList: Ticket[]}) {

    const userData = useUserStore(getUserData);

    const { isAdmin, userName } = userData ?? { isAdmin: false, userName: '' };

    const { goToPage } = usePageUtils();

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
                                ? 'Отслеживайте активные обращения и отвечайте пользователям'
                                : 'Создайте обращение или следите за статусом уже открытых вопросов'}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">

                        {/*{!isAdmin && (*/}
                            <YellowGlassBtn
                                label={`Создать обращение`}
                                onClick={() => goToPage('/support/add')}
                                IconComponent={Plus}
                            />
                        {/*)}*/}

                        <GrayBtn
                            label={!isAdmin ? `История ваших обращений` : 'История всех обращений'}
                            IconComponent={History}
                            onClick={() => goToPage('/support/history')}
                        />
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-50">Активные обращения</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            {isAdmin
                                ? 'Все обращения, ожидающие действий'
                                : 'Ваши открытые запросы в поддержку'}
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