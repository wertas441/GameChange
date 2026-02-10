import {Clock, MessageSquare, Tag, UserCircle} from "lucide-react";
import {Ticket} from "@/types/support";

const statusStyles: Record<Ticket['status'], string> = {
    'Ожидает ответа': 'border-amber-400/40 bg-amber-500/10 text-amber-300',
    'Ответ получен': 'border-sky-400/40 bg-sky-500/10 text-sky-300',
};

interface IProps {
    id: string;
    createdAt: string;
    answeredAt: string;
    ownerName: string;
    category: string;
    status: string;
}

export default function TicketHeader({id, createdAt, answeredAt, ownerName,  category, status}: IProps) {

    return (
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Поддержка</p>
                    <h1 className="mt-2 text-xl md:text-2xl font-semibold text-slate-50">
                        Обращение #{id}
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
                            <span>Создан: {createdAt}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-amber-300" />
                            <span>{answeredAt !== '-' ? `Ответ: ${answeredAt}` : 'Ожидаем ответ от администраторов' }</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <UserCircle className="h-4 w-4 text-amber-300" />
                            <span>Автор: {ownerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-amber-300" />
                            <span>Категория: {category}</span>
                        </div>
                    </div>
                </div>
                <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
                        {status}
                    </span>
            </div>
        </section>

    )
}
