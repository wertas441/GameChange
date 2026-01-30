import {LinkButtonTypes} from "@/types";
import {goldColorTheme} from "@/styles/styles";
import Link from "next/link";

export default function LinkYellowBtn({label, className = '', href}:LinkButtonTypes) {

    return (
        <Link
            href={href}
            className={`${className} mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl 
            px-4 py-3 text-base font-semibold text-slate-950 transition cursor-pointer
            disabled:cursor-not-allowed disabled:opacity-80 disabled:shadow-none ${goldColorTheme}`}
        >
            {label}
        </Link>
    )
}