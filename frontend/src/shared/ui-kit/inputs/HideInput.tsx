'use client'

import {MainInputProps} from "@/shared/type";
import {inputColorTheme} from "@/shared/styles/styles";
import InputError from "@/shared/ui-kit/errors/InputError";
import {useState} from "react";
import {Eye, EyeOff} from 'lucide-react';

export function HideInput(
    {
        label,
        error,
        id,
        className = '',
        placeholder = '',
        ...rest
    }: MainInputProps) {

    const [showText, setShowText] = useState<boolean>(true);

    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className={`block text-xs ml-2 font-medium tracking-wide text-slate-200`}>
                {label}
            </label>

            <div className="relative">
                <input
                    id={id}
                    type={showText ? 'text' : 'password'}
                    placeholder={placeholder}
                    className={`${inputColorTheme} block w-full rounded-2xl border
                    pl-4 pr-12 py-3 text-sm outline-none ring-0 transition 
                    ${error ? 'border-red-500/60 focus:border-red-400' : ''} ${className}`}
                    {...rest}
                />

                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowText(!showText)}
                    aria-label={showText ? 'Скрыть пароль' : 'Показать пароль'}
                >
                    {showText ? (
                        <EyeOff className="h-5 w-5 md:h-6 md:w-6 text-slate-50 mr-1" aria-hidden="true" />
                    ) : (
                        <Eye className="h-5 w-5 md:h-6 md:w-6 text-slate-50 mr-1" aria-hidden="true" />
                    )}
                </button>
            </div>

            <InputError error={error} />
        </div>
    )
}