'use client'

import Image from "next/image";
import Link from "next/link";
import {PurchaseItem} from "@/types";
import usePagination from "@/lib/hooks/usePagination";
import Pagination from "@/components/UI/Pagination";

export default function Purchases({purchases}:{purchases: PurchaseItem[]}) {

    const {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
        listRef
    } = usePagination({
        items: purchases,
        itemsPerPage: 10,
        scrollOnPageChange: true,
    });

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
                <h1 className="text-2xl font-semibold text-slate-50">История покупок</h1>
                <p className="mt-2 text-sm text-slate-400">
                    Здесь собраны все ваши покупки.
                </p>
            </section>

            <div className="space-y-4">
                <div ref={listRef} className="space-y-4">
                    {paginatedItems.map((item, index) => (
                        <div key={`${item.keyUrl}-${index}`}
                             className="flex flex-col md:flex-row items-center gap-4 md:gap-6 rounded-2xl border
                          border-slate-800/70 hover:border-amber-400/40 transition cursor-pointer bg-slate-900/60 p-4 md:p-6 shadow-lg shadow-black/30"
                        >
                            <Link href={`/keys/${item.keyUrl}`} className="w-full md:w-48 lg:w-56 shrink-0">
                                <Image
                                    className="rounded-md w-full object-cover aspect-video"
                                    src={item.mainImage}
                                    width={1920}
                                    height={1080}
                                    alt={item.name}
                                />
                            </Link>

                            <div className="flex flex-col lg:flex-row grow items-center justify-between w-full gap-4">
                                <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                                    <Link href={`/keys/${item.keyUrl}`}>
                                        <h2 className="text-white text-lg md:text-xl font-semibold hover:text-amber-400 transition-colors">
                                            {item.name}
                                        </h2>
                                    </Link>
                                    <p className="mt-1 text-sm text-slate-400">Дата покупки: {item.date}</p>
                                </div>

                                <div className="flex flex-col items-center lg:items-end w-full lg:w-auto shrink-0">
                                    <p className="text-sm text-slate-400">Количество: {item.count}</p>
                                    <p className="text-sm text-slate-400">Цена за шт: {item.price} ₽</p>
                                    <p className="mt-2 text-2xl font-bold text-slate-50">
                                        {item.price * item.count} ₽
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-2">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                    />
                </div>
            </div>
        </div>
    )
}