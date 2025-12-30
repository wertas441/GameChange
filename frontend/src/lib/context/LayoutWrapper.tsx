'use client'

import {ReactNode} from "react";
import MainHeader from "@/components/UI/headers/MainHeader";
import {usePathname} from "next/navigation";

export default function LayoutWrapper({children}: {children: ReactNode}) {

    const pathname = usePathname();
    const isAuthPage: boolean = pathname.startsWith('/auth');

    return (
        <div className={``}>
            {!isAuthPage && (
                <MainHeader />
            )}

            {children}
        </div>
    )
}