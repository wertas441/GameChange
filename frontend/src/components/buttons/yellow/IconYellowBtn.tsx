import {goldColorTheme} from "@/styles/styles";
import {IconBtnTypes} from "@/types";
import {memo, useMemo} from "react";

function IconYellowBtn({IconComponent, onClick, disabled = false, className = ''}: IconBtnTypes){

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl 
            px-4 py-3 text-sm font-semibold text-slate-950 transition cursor-pointer
            disabled:cursor-not-allowed disabled:opacity-80 disabled:shadow-none ${goldColorTheme} ${className}`}
        >
            {useMemo(() => <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-slate-50" aria-hidden="true" />, [IconComponent] )}
        </button>
    )
}

export default memo(IconYellowBtn);