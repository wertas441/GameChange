import InputError from "@/components/errors/InputError";
import { InputHTMLAttributes } from "react";

interface MainInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    error?: string;
    className?: string;
}

export default function MainInput(
    {
        label,
        error,
        id,
        className = '',
        type = 'text',
        placeholder = '',
        ...rest
    }: MainInputProps) {

    return (
        <div className="space-y-1.5">
            <label
                htmlFor={id}
                className={`block text-xs ml-2 font-medium tracking-wide text-slate-200`}
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className={`block w-full rounded-2xl border border-slate-700  px-4 py-3 text-sm text-slate-50 
                    outline-none ring-0 transition placeholder:text-slate-500 
                    ${error ? 'border-red-500/60 focus:border-red-400' : ''} ${className}`}
                    {...rest}
                />
            </div>

            <InputError error={error} />
        </div>
    )
}



