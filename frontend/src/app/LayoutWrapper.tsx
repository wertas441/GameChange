'use client'

import {ReactNode} from "react";
import Header from "@/widgets/Header";
import {usePathname} from "next/navigation";
import MainFooter from "@/widgets/Footer";

export default function LayoutWrapper({children}: {children: ReactNode}) {

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
                <MainFooter />
            )}
        </div>
    )
}