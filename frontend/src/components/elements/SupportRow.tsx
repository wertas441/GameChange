import {ArrowUpRight, Clock, MessageSquare, User} from "lucide-react";
import Link from "next/link";
import {Ticket} from "@/types/support";

interface IProps {
    ticket: Ticket;
    isAdmin: boolean;
}

const statusStyles = {
    'Ожидает ответа': 'border-amber-400/40 bg-amber-500/10 text-amber-300',
    'Ответ получен': 'border-sky-400/40 bg-sky-500/10 text-sky-300',
};

export default function SupportRow({ticket, isAdmin}: IProps) {

    return (
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5 md:p-6 shadow-lg shadow-black/20">
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
                                {ticket.answeredAt ? `Ответ получен: ${ticket.answeredAt}` : 'Ожидает ответа администратора'}
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
    )
}