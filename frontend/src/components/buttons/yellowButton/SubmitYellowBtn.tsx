import {SubmitButtonTypes} from "@/types";

export default function SubmitYellowBtn({label, disabled = false, className = ''}:SubmitButtonTypes) {

    return (
        <button
            type="submit"
            disabled={disabled}
            className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r
                from-yellow-400 via-amber-300 to-yellow-500 px-4 py-3 text-sm font-semibold text-slate-950
                shadow-[0_18px_40px_rgba(250,204,21,0.35)] transition hover:shadow-[0_20px_45px_rgba(250,204,21,0.5)]
                hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-80 disabled:shadow-none ${className}`}
        >
            {label}
        </button>
    )
}