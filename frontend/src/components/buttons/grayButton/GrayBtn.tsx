import {FuncButtonTypes} from "@/types";
import {memo} from "react";

function GrayBtn({label, className = '', onClick}: FuncButtonTypes) {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-2xl cursor-pointer border border-slate-700/80 bg-slate-950/40 px-3 py-2
                text-xs font-medium text-slate-200 transition hover:bg-slate-800/60 ${className}`}
        >
            {label}
        </button>
    )
}

export default memo(GrayBtn);