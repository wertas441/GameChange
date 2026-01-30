'use client'

import {usePathname} from "next/navigation";
import {ReactNode} from "react";
import UserSideBar from "@/components/UI/context/UserSideBar";

export default function UserLayout({children}:{children: ReactNode}) {

    const pathname = usePathname()

    return (
        <div className={`max-w-full mx-auto`}>
            <div className="w-full flex flex-col lg:flex-row gap-6">
                <UserSideBar pathname={pathname} />

                <main className={`w-full rounded-lg `}>
                    {children}
                </main>
            </div>
        </div>
    )
}