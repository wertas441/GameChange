'use client'

import {
    User,
    Lock,
    Mail,
    Handbag,
    Info,
    LogOut,
} from 'lucide-react'
import {usePageUtils} from "@/lib/hooks/usePageUtils";
import {makeLogout, useUserStore} from "@/lib/store/userStore";
import {useSimpleModalWindow} from "@/lib/hooks/useSimpleModalWindow";
import SimpleModalWindow from "@/components/elements/SimpleModalWindow";
import UserSideBarBtn from "@/components/buttons/UserSideBarBtn";
import {usePathname} from "next/navigation";

const settingsMenuItems = [
    { id: 'profile', link: '/user/profile',  label: 'Профиль', icon: User },
    { id: 'password', link: '/user/change-password', label: 'Сменить пароль', icon: Lock },
    { id: 'email', link: '/user/change-email', label: 'Сменить почту', icon: Mail },
    { id: 'purchases', link: '/user/purchases', label: 'История покупок', icon: Handbag },
    { id: 'projectInformation', link: '/user/information', label: 'Информация о проекте', icon: Info },
] as const;

export default function UserSideBar() {

    const pathname = usePathname()

    const { router } = usePageUtils();

    const { isRendered, isProcess, isExiting, toggleModalWindow, windowModalRef } = useSimpleModalWindow()

    const logout = useUserStore(makeLogout);

    const logOutButton = async () => {
        await logout();
        router.replace("/auth/login");
    }

    return (
        <>
            <aside className="w-full lg:w-100">
                <nav className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3 shadow-lg shadow-black/20">
                    {settingsMenuItems.map((item) => (
                        <UserSideBarBtn
                            key={item.id}
                            label={item.label}
                            link={item.link}
                            IconComponent={item.icon}
                            active={pathname === item.link}
                        />
                    ))}

                    <div className="my-2 border-t border-slate-800/70"></div>

                    <button
                        className="group w-full flex items-center cursor-pointer gap-3 py-2.5 px-3 rounded-xl border border-transparent transition-colors
                        text-left text-red-300 bg-slate-950/40 hover:border-red-500/40 hover:bg-red-500/10"
                        onClick={toggleModalWindow}
                    >
                        <LogOut className="h-5 w-5 text-red-300 transition group-hover:text-red-200" />
                        <span className="text-sm font-medium">Выйти</span>
                    </button>
                </nav>
            </aside>

            <SimpleModalWindow
                isExiting={isExiting}
                modalRef={windowModalRef}
                windowLabel={'Подтверждение выхода'}
                windowText={`Вы действительно хотите удалить выйти из своего пользовательского аккаунта? Это действие необратимо.`}
                cancelButtonLabel={'Остаться'}
                cancelFunction={toggleModalWindow}
                confirmButtonLabel={'Выйти'}
                confirmFunction={logOutButton}
                isProcess={isProcess}
                isRendered={isRendered}
            />
        </>
    )
}