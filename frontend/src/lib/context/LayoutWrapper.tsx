'use client'

import {ReactNode} from "react";
import MainHeader from "@/components/UI/context/MainHeader";
import {usePathname} from "next/navigation";
import MainFooter from "@/components/UI/context/MainFooter";

export default function LayoutWrapper({children}: {children: ReactNode}) {

    const pathname = usePathname();
    const isAuthPage: boolean = pathname.startsWith('/auth');

    return (
        <div className={``}>
            {!isAuthPage && (
                <MainHeader />
            )}

            <div className={`px-6 md:px-12`}>
                {children}
            </div>

            {!isAuthPage && (
                <MainFooter />
            )}
        </div>
    )
}