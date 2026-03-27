'use client'

import {usePathname} from "next/navigation";
import {services} from "@/shared/lib/data/global";
import {ServicesSideBarRow} from "@/entities/services/ui";

export function ServicesSideBar() {

    const pathname = usePathname();

    return (
        <aside className="w-full lg:w-80 mb-14 md:mb-0">
            <div className="space-y-4 lg:top-6">
                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg shadow-black/20">
                    <h2 className="text-lg font-semibold text-slate-50">Сервисы для пополнения</h2>

                    <div className="mt-4 grid gap-4">
                        {services.map(({id, href, logo, title, tag}) => (
                            <ServicesSideBarRow
                                key={id}
                                id={id}
                                href={href}
                                isActive={pathname === href}
                                logo={logo}
                                title={title}
                                tag={tag}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
