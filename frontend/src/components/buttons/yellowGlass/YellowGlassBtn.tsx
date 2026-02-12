import {FuncButtonTypes} from "@/types";
import {memo} from "react";

function YellowGlassBtn({label, className = '', IconComponent, onClick}: FuncButtonTypes) {

    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-500/10 
                px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:border-amber-300/70
                hover:bg-amber-500/20 cursor-pointer ${className}`}
        >
            {IconComponent && (
                <IconComponent className="h-4 w-4" />
            )}

            {label}
        </button>
    )
}

export default memo(YellowGlassBtn);
