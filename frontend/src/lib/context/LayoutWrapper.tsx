'use client'

import {ReactNode} from "react";
import MainHeader from "@/components/UI/context/MainHeader";
import {usePathname} from "next/navigation";
import MainFooter from "@/components/UI/context/MainFooter";

export default function LayoutWrapper({children}: {children: ReactNode}) {

    const pathname = usePathname();
    const isAuthPage: boolean = pathname.startsWith('/auth');
    const isDashboardPage: boolean = pathname === '/';

    return (
        <div className={``}>
            {!isAuthPage && (
                <MainHeader className={!isDashboardPage ? 'mb-23' : 'mb-0'} />
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