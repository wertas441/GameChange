import {goldColorTheme} from "@/styles/styles";
import {memo, useMemo} from "react";
import {ButtonProps} from "@/types";

function YellowBtn({label, type = 'button', IconComponent, disabled = false, className = '', onClick}: ButtonProps) {

    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold 
            text-slate-950 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-80 disabled:shadow-none 
            ${IconComponent ? 'text-sm' : 'text-base'} ${goldColorTheme} ${className} `}
        >
            {IconComponent && (
                useMemo(() => <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-slate-50" aria-hidden="true" />, [IconComponent])
            )}

            {label}
        </button>
    )
}

export default memo(YellowBtn);