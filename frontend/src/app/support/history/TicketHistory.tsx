'use client'

import Link from "next/link";
import {ArrowUpRight, History, User} from "lucide-react";
import {getUserData, useUserStore} from "@/lib/store/userStore";
import ServerErrorState from "@/components/errors/ServerErrorState";
import {useMemo} from "react";
import {Ticket} from "@/types/support";
import usePagination from "@/lib/hooks/usePagination";
import Pagination from "@/components/UI/Pagination";

export default function TicketHistory({ticketData} : {ticketData: Ticket[]}) {

    const userData = useUserStore(getUserData);

    const { isAdmin, userName } = userData ?? { isAdmin: false, userName: '' };

    const normalizedTickets = useMemo(() => {
        if (isAdmin) return ticketData;

        return ticketData.map((ticket, index) => {
            if (index > 0) return ticket;
            return {
                ...ticket,
                ownerName: ticket.ownerName,
            };
        });
    }, [isAdmin, ticketData]);

    const visibleTickets = useMemo(() => {
        if (isAdmin) return normalizedTickets;

        return normalizedTickets.filter((ticket) => ticket.ownerName === userName);
    }, [isAdmin, normalizedTickets, userName]);

    const {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
        listRef,
    } = usePagination({
        items: visibleTickets,
        itemsPerPage: 8,
        scrollOnPageChange: true,
    });

    if (!userData) {
        return <ServerErrorState />
    }

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
                {paginatedItems.length === 0 ? (
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
                       <div ref={listRef} className="space-y-4">
                           {paginatedItems.map((ticket) => (
                               <div key={ticket.id} className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5 md:p-6 shadow-lg shadow-black/20">
                                   <div className="flex flex-col gap-4 lg:flex-row items-start md:items-center lg:justify-between">
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
                                           <p className="text-sm text-slate-400">{ticket.description}</p>
                                           <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                                            <span className="inline-flex items-center gap-2">
                                                <History className="h-3.5 w-3.5 text-amber-300" />
                                                Закрыт: {ticket.answeredAt}
                                            </span>
                                               {isAdmin && (
                                                   <span className="inline-flex items-center gap-2">
                                                    <User className="h-3.5 w-3.5 text-amber-300" />
                                                       {ticket.ownerName}
                                                </span>
                                               )}
                                           </div>
                                       </div>

                                       <Link
                                           href={`/support/${ticket.id}`}
                                           className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600/80 hover:bg-slate-800/60"
                                       >
                                           Подробности
                                           <ArrowUpRight className="h-4 w-4" />
                                       </Link>
                                   </div>
                               </div>
                           ))}
                       </div>

                        <div className="pt-2">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={goToPage}
                            />
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}