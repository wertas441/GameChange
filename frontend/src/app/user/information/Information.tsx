'use client'

import LinkYellowBtn from "@/components/buttons/yellow/LinkYellowBtn";

const stackInformation = [
    'Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS.',
    'Backend: Node.js, Express, TypeScript.',
    'База данных: PostgreSQL.',
    'Инфраструктура: Docker и docker-compose.',
] as const;

const funcInformation = [
    'Каталог ключей с фильтрами по цене, жанрам, платформам и ОС.',
    'Страница товара с описанием, требованиями и ценой.',
    'Формы для пополнения различных онлайн сервисов',
    'Корзина, оформление покупки и история заказов.',
    'Регистрация, вход и личный кабинет с настройками профиля.',
    'Отзывы и рейтинг магазина.',
    'Админ‑режим для добавления и изменения ключей.',
] as const;

export default function Information() {

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
                <h1 className="text-2xl font-semibold text-slate-50">О проекте</h1>

                <p className="mt-2 text-sm text-slate-400">
                    GameChange — это магазин цифровых товаров. Я разработал его в целях улучшения своих навыков как fullstack разработчик.
                </p>
            </section>

            <section className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 md:p-8">
                <div className="space-y-4 text-sm text-slate-300">
                    <div>
                        <h2 className="text-sm font-semibold text-slate-200">Стек проекта</h2>

                        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
                            {stackInformation.map((item) => (
                                <li key={item}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-slate-200">Реализованный функционал</h2>

                        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">
                            {funcInformation.map((item) => (
                                <li key={item}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p>
                        Репозиторий проекта и исходный код доступны на GitHub — буду рад обратной связи и предложениям по улучшениям.
                    </p>
                </div>

                <LinkYellowBtn
                    label={`Перейти на GitHub`}
                    href="https://github.com/wertas441/GameChange"
                    className="mt-3 w-full px-4 py-2 sm:w-auto"
                />
            </section>
        </div>
    )
}