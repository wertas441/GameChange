'use client'

import {useMemo} from "react";
import Link from "next/link";
import {Calendar, IdCard, Mail, Shield, User , KeyRound} from "lucide-react";
import {getUserData, useUserStore} from "@/lib/store/userStore";
import {formatDateForProfile} from "@/lib";
import ProfileDataLine from "@/components/elements/ProfileDataLine";

const getInitials = (name?: string, email?: string) => {
    const source = (name || email || '').trim();
    if (!source) return 'GC';
    const parts = source.split(/\s+/).filter(Boolean);
    const initials = parts.length >= 2
        ? `${parts[0][0]}${parts[1][0]}`
        : source.slice(0, 2);
    return initials.toUpperCase();
};

export default function Profile() {

    const userData = useUserStore(getUserData);

    if (!userData) {
        return (
            <h1>error</h1>
        )
    }

    const {userName, email, createdAt, isAdmin, publicId} = userData;

    const createdAtLabel = formatDateForProfile(createdAt);

    const initials = getInitials(userName, email);

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800/70 bg-slate-950/40 text-xl font-semibold text-amber-300">
                            {initials}
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Ваш аккаунт</p>
                            <h1 className="mt-1 text-2xl font-semibold text-slate-50">
                                {userName}
                            </h1>
                            <p className="mt-1 text-sm text-slate-400">{email}</p>
                        </div>
                    </div>

                    <div className="flex-row md:flex flex-wrap gap-3 space-y-3 md:space-y-0">
                        <Link
                            href="/user/change-password"
                            className="inline-flex w-full md:w-auto justify-center items-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600/80 hover:bg-slate-800/60"
                        >
                            <KeyRound className="h-4 w-4 text-amber-300" />
                            Сменить пароль
                        </Link>
                        <Link
                            href="/user/change-email"
                            className="inline-flex items-center w-full justify-center md:w-auto gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-600/80 hover:bg-slate-800/60"
                        >
                            <Mail className="h-4 w-4 text-amber-300" />
                            Сменить почту
                        </Link>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6">
                <section className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-slate-50">Данные профиля</h2>
                    <p className="mt-2 text-sm text-slate-400">
                        Управляйте персональными данными и настройками безопасности вашего аккаунта.
                    </p>

                    <dl className="mt-6 space-y-4">
                        <ProfileDataLine IconComponent={User} label={`Имя пользователя`} data={userName} />
                        <ProfileDataLine IconComponent={Mail} label={`Email`} data={email} />
                        <ProfileDataLine IconComponent={IdCard} label={`ID аккаунта`} data={publicId} />
                        <ProfileDataLine IconComponent={Calendar} label={`Дата регистрации`} data={createdAtLabel} />
                        <ProfileDataLine IconComponent={Shield} label={`Роль`} data={isAdmin ? 'Администратор' : 'Пользователь'} />
                    </dl>
                </section>
            </div>
        </div>
    )
}