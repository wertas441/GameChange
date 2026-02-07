import { memo } from "react";

interface IProps {
    text?: string;
    className?: string;
}

function SpinnerLoader({text = "Загрузка данных...", className = "",}: IProps) {

    return (
        <div className={`rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 text-center shadow-lg shadow-black/20 ${className}`}
            role="status" aria-live="polite"
        >
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-slate-600/70 border-t-amber-400" />

            <p className="text-base font-semibold text-slate-100">{text}</p>

            <p className="mt-2 text-sm text-slate-400">Пожалуйста, подождите</p>
        </div>
    );
}

export default memo(SpinnerLoader);
