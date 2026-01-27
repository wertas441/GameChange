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
import Link from "next/link";
import SimpleModalWindow from "@/components/elements/SimpleModalWindow";

const settingsMenuItems = [
    { id: 'profile', link: '/user/profile',  label: 'Профиль', icon: User },
    { id: 'password', link: '/user/change-password', label: 'Сменить пароль', icon: Lock },
    { id: 'email', link: '/user/change-email', label: 'Сменить почту', icon: Mail },
    { id: 'purchases', link: '/user/purchases', label: 'История покупок', icon: Handbag },
    { id: 'projectInformation', link: '/user/information', label: 'Информация о проекте', icon: Info },
] as const;

export default function UserSideBar({pathname}: {pathname: string}) {
    const { router } = usePageUtils();

    const { isRendered, isProcess, isExiting, toggleModalWindow, windowModalRef } = useSimpleModalWindow()

    const logout = useUserStore(makeLogout);

    const logOutButton = async () => {
        await logout();
        router.replace("/auth/login");
    }

    return (
        <>
            <aside className={`w-full lg:w-90`}>
                <nav className={`space-y-2 p-3 rounded-lg border border-emerald-100 shadow-sm`}>
                    {settingsMenuItems.map((item) => {
                        const IconComponent = item.icon;
                        const active = pathname === item.link;
                        return (
                            <Link
                                key={item.id}
                                href={item.link}
                                className={`w-full flex items-center gap-3 py-2.5 cursor-pointer px-3 rounded-md border transition text-left ${
                                    active
                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow '
                                        : 'text-emerald-700 border-white hover:bg-emerald-50 dark:hover:bg-neutral-800  dark:text-white dark:border-neutral-900'
                                }`}
                            >
                                <IconComponent className={`h-5 w-5 dark:group-hover:text-white ${!active ? 'text-emerald-600' : ''} `}/>
                                <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                        )
                    })}
                    <div className="border-t border-emerald-100 dark:border-neutral-700 my-2"></div>
                    <button
                        className={`w-full flex items-center cursor-pointer gap-3 py-2.5 px-3 rounded-md transition-colors
                        text-left text-red-700  hover:bg-red-50 dark:hover:bg-neutral-800 dark:hover:border-red-500 dark:text-red-400`}
                        onClick={toggleModalWindow}
                    >
                        <LogOut className="h-5 w-5" />
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