'use client'

import { ReactNode, useState } from "react";
import { ChevronDown } from 'lucide-react';

interface IProps {
    children: ReactNode;
    label: string;
    className?: string;
    defaultOpen?: boolean;
    contentClassName?: string;
    triggerClassName?: string;
}

export default function DropDownContent(
    {
        children,
        label,
        className = '',
        defaultOpen = false,
        contentClassName = '',
        triggerClassName = '',
    }: IProps) {

    const [open, setOpen] = useState<boolean>(defaultOpen);

    return (
        <section
            className={`rounded-2xl border border-slate-800/80 bg-slate-950/30 shadow-sm shadow-black/20 backdrop-blur
            ${open ? 'ring-2 ring-amber-400/15' : ''} ${className}`}
        >
            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
                className={`flex cursor-pointer w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition
                hover:bg-slate-800/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/30 ${triggerClassName}`}
            >
                <div className="min-w-0">
                    <h3 className={`truncate text-base sm:text-lg font-semibold tracking-tight text-slate-50`}>
                        {label}
                    </h3>
                </div>

                <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-200 transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
                    aria-hidden="true"
                />
            </button>

            <div
                aria-hidden={!open}
                className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className={`border-t border-slate-800/70 px-4 py-4 ${contentClassName}`}>
                        <div className="space-y-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}