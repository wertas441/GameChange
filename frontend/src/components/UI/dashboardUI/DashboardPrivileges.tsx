import {dashboardPrivileges} from "@/lib/dashboardData";
import PrivilegeCard from "@/components/UI/cards/PrivilegeCard";

export default function DashboardPrivileges() {

    return (
        <div className="mx-auto w-full px-6 md:px-12">
            <div className="flex flex-col gap-3 text-center">
                <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">Почему GameChange</h2>

                <p className="text-sm text-slate-400 sm:text-base">
                    Сервис для тех, кто ценит скорость, честные цены и поддержку без ожиданий.
                </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {dashboardPrivileges.map(privilege => (
                    <PrivilegeCard
                        key={privilege.title}
                        title={privilege.title}
                        IconComponent={privilege.icon}
                        text={privilege.text}
                    />
                ))}
            </div>
        </div>
    )
}