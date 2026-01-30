import InputError from "@/components/errors/InputError";
import {inputColorTheme} from "@/styles/styles";
import {MainInputProps} from "@/types";
import {memo} from "react";

function MainInput(
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
                    className={`${inputColorTheme} block w-full rounded-2xl border
                    px-4 py-3 text-sm outline-none ring-0 transition 
                    ${error ? 'border-red-500/60 focus:border-red-400' : ''} ${className}`}
                    {...rest}
                />
            </div>

            <InputError error={error} />
        </div>
    )
}

export default memo(MainInput);


