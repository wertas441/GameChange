import Link from "next/link";

export default function DashboardHero() {

    return (
        <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-6 text-center sm:gap-10">
            <h1 className="text-4xl font-semibold text-slate-50 sm:text-5xl lg:text-6xl">
                <span className="bg-linear-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                    GameChange
                </span>
            </h1>

            <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
                Лицензионные ключи, официальные пополнения Steam, PS и Xbox, прозрачные цены и мгновенная доставка в личный кабинет.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
                <Link
                    href="/keys/catalog"
                    className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200
                                shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 hover:text-amber-200 hover:shadow-amber-500/20"
                >
                    Каталог игр
                </Link>

                <Link
                    href="/services"
                    className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200
                                shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/60 hover:text-amber-200 hover:shadow-amber-500/20"
                >
                    Пополнить баланс
                </Link>
            </div>
        </div>
    )
}
