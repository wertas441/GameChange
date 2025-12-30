import {goldColorTheme} from "@/styles/styles";
import {IconBtnTypes} from "@/types";

export default function IconYellowBtn({IconComponent, onClick, disabled = false, className = ''}: IconBtnTypes){
    const Icon = IconComponent;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl 
            px-4 py-3 text-sm font-semibold text-slate-950 transition cursor-pointer
            disabled:cursor-not-allowed disabled:opacity-80 disabled:shadow-none ${goldColorTheme} ${className}`}
        >
            <Icon className="h-6 w-6" aria-hidden="true" />
        </button>
    )
}