import {memo, TextareaHTMLAttributes} from "react";
import InputError from "@/components/errors/InputError";
import {inputColorTheme} from "@/styles/styles";

export interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    label: string;
    error?: string;
    className?: string;
}

function MainTextarea(
    {
        label,
        id,
        required = false,
        placeholder,
        error,
        className = '',
        ...rest
    }: TextAreaInputProps) {

    return (
        <div className="space-y-1.5">
            <label
                htmlFor={id}
                className="block text-xs ml-2 font-medium tracking-wide text-slate-200"
            >
                {label}
            </label>
            <div className="relative">
                <textarea
                    id={id}
                    name={id}
                    required={required}
                    placeholder={placeholder}
                    rows={4}
                    className={`${inputColorTheme} textDescriptionArea block w-full resize-y rounded-2xl border px-4 py-3 text-sm outline-none ring-0 transition
                    ${error ? 'border-red-500/60 focus:border-red-400' : ''} ${className}`}
                    {...rest}
                />
            </div>

            <InputError error={error} />
        </div>
    )
}

export default memo(MainTextarea);










