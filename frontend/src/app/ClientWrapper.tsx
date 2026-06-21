'use client'

import {ReactNode} from "react";
import {Header, Footer} from "@/widgets";
import {usePathname} from "next/navigation";

export default function ClientWrapper({children}: {children: ReactNode}) {

    const pathname = usePathname();
    const isAuthPage: boolean = pathname.startsWith('/auth');
    const isDashboardPage: boolean = pathname === '/';

    return (
        <div className={``}>
            {!isAuthPage && (
                <Header className={!isDashboardPage ? 'mb-23' : 'mb-0'} />
            )}

            {!isDashboardPage ? (
                <div className={`px-6 md:px-12`}>
                    {children}
                </div>
            ) : (
                <div className={``}>
                    {children}
                </div>
            )}

            {!isAuthPage && (
                <Footer />
            )}
        </div>
    )
}