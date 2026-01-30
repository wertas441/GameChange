import { memo } from "react";
import {Ban} from 'lucide-react'

interface IProps {
    title?: string;
    description?: string;
    /** Центрирование блока по высоте (для страниц) */
    fullHeight?: boolean;
}

function ServerErrorState(
    {
        title = "Не удалось загрузить данные",
        description = "Похоже, возникла проблема с сервером или подключением к интернету. Попробуйте обновить страницу чуть позже.",
        fullHeight = true,
    }: IProps) {

    return (
        <div className={`w-full ${fullHeight ? "min-h-[60vh] flex items-center justify-center" : ""}`}>
            <div
                className="mx-auto max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 text-center shadow-lg shadow-black/20"
                 role="alert"
            >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-rose-500/30 bg-rose-500/10">
                    <Ban className="h-7 w-7 text-rose-300" />
                </div>

                <h2 className="text-lg font-semibold text-slate-50">
                    {title}
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default memo(ServerErrorState);
