import {FuncButtonTypes} from "@/types";
import {memo} from "react";

function GrayBtn({label, className = '', IconComponent, onClick}: FuncButtonTypes) {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex w-full md:w-auto justify-center items-center gap-2 rounded-2xl border border-slate-800/70 
            bg-slate-950/40 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600/80 
            hover:bg-slate-800/60 cursor-pointer ${className}`}
        >
            {IconComponent && (
                <IconComponent className="h-4 w-4 text-amber-300" />
            )}

            {label}
        </button>
    )
}

export default memo(GrayBtn);
