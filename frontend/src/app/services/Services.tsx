'use client'

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import {services} from "@/lib/data";

const tags = [
    {
        label: 'Все',
        value: 'Все',
    },
    {
        label: 'Кошельки',
        value: 'Кошелёк',
    },
    {
        label: 'Консоли',
        value: 'Консоль',
    },
    {
        label: 'Подписки',
        value: 'Подписка',
    },
    {
        label: 'Нейросети',
        value: 'Нейросеть',
    },
] as const;

export default function Services() {

    const [activeTag, setActiveTag] = useState<string>("Все");

    const filteredServices = useMemo(() => {
        if (activeTag === "Все") return services;

        return services.filter((service) => service.tag === activeTag);
    }, [activeTag]);

    return (
        <section className="w-full">
            <div className="mx-auto flex w-full flex-col px-4 pb-12 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-3 text-center sm:text-left">
                    <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
                        Пополнение популярных сервисов
                    </h1>

                    <p className=" text-sm text-slate-400 sm:text-base">
                        Выберите сервис, который хотите пополнить, и переходите на страницу
                        с доступными вариантами. Все способы оплаты и условия уже внутри.
                    </p>
                </div>

                <div className="mt-8 md:mt-6 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    {tags.map((tag) => {
                        const isActive = tag.value === activeTag;
                        return (
                            <button
                                key={tag.value}
                                type="button"
                                onClick={() => setActiveTag(tag.value)}
                                className={`rounded-full cursor-pointer border px-4 py-2 text-sm transition ${
                                    isActive
                                        ? "border-amber-400/70 bg-amber-400/10 text-amber-300"
                                        : "border-slate-800/70 bg-slate-950/40 text-slate-300 hover:border-amber-400/40 hover:text-amber-300"
                                }`}
                            >
                                {tag.label}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-8 md:mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredServices.map((service) => (
                        <Link
                            key={service.id}
                            href={service.href}
                            className="group relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5 shadow-lg
                            shadow-black/30 transition hover:-translate-y-1  hover:border-amber-400/40 hover:bg-slate-900/80"
                        >
                            <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${service.accent}`}/>

                            <div className="relative flex h-full flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/50">
                                        <Image
                                            src={service.logo}
                                            alt={`${service.title} logo`}
                                            width={48}
                                            height={48}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <span className="rounded-full border border-slate-700/70 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
                                        {service.tag}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col gap-2">
                                    <h2 className="text-lg font-semibold text-slate-50 transition-colors group-hover:text-amber-400">
                                        {service.title}
                                    </h2>

                                    <p className="text-sm text-slate-400">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-sm text-slate-400">
                                    <span className={`group-hover:text-amber-400 transition-colors`}>Перейти к пополнению</span>

                                    <span className="text-amber-400 transition group-hover:translate-x-1">
                                        -&gt;
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}