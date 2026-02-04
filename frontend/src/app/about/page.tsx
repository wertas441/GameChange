import {Metadata} from "next";
import LinkYellowBtn from "@/components/buttons/yellowButton/LinkYellowBtn";
import Image from "next/image";

export const metadata: Metadata = {
    title: 'О нас | GameChange',
    description: 'Узнайте больше о нас и нашем магазине, станьте частью сообщества GameChange',
}

const stats = [
    { value: "25 000+", label: "ключей и подписок" },
    { value: "5 мин", label: "средняя выдача заказа" },
    { value: "98%", label: "положительных отзывов" },
    { value: "24/7", label: "поддержка без выходных" },
];

const features = [
    {
        title: "Моментальная доставка",
        description: "Ключи, подписки и пополнения выдаются автоматически сразу после оплаты.",
    },
    {
        title: "Честные цены",
        description: "Работаем напрямую с поставщиками, без скрытых комиссий и сюрпризов.",
    },
    {
        title: "Безопасная оплата",
        description: "Проверенные платежные системы, защита данных и прозрачные условия.",
    },
    {
        title: "Гарантия и помощь",
        description: "Если что-то пошло не так — решим быстро и по-человечески.",
    },
];

const steps = [
    {
        title: "Выберите продукт",
        description: "Ищите ключи, подписки и сервисы в каталоге или на витрине.",
    },
    {
        title: "Оплатите удобным способом",
        description: "Банковские карты, кошельки и быстрые платежи — всё на месте.",
    },
    {
        title: "Получите доступ",
        description: "Данные приходят мгновенно, а инструкции всегда под рукой.",
    },
];

const partnerLogos = [
    { src: "/steamIcon.svg", alt: "Steam" },
    { src: "/epic.svg", alt: "Epic Games" },
    { src: "/gog.svg", alt: "GOG" },
    { src: "/xboxIcon.svg", alt: "Xbox" },
    { src: "/ps-plus-logo.png", alt: "PlayStation Plus" },
];


export default function AboutPage() {

    return (
        <section className="w-full">
            <div className="mx-auto flex w-full space-y-4 flex-col gap-12 px-4 pb-16">
                <div className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/60 p-6 sm:p-10">
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-400/15 via-transparent to-slate-900/60" />

                    <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div className="flex flex-col gap-4">
                            <span className="w-fit text-xs rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1  font-semibold uppercase tracking-wider text-amber-300">
                                GameChange — магазин для геймеров
                            </span>

                            <h1 className="text-2xl font-semibold text-slate-50  lg:text-5xl">
                                Покупайте ключи и подписки легко, быстро и безопасно
                            </h1>

                            <p className="text-sm text-slate-300 sm:text-base">
                                Мы создали GameChange, чтобы каждый мог получать доступ к любимым играм и
                                сервисам без лишней суеты. Прозрачные условия, моментальная доставка и
                                поддержка, которая действительно помогает.
                            </p>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <LinkYellowBtn href="/keys/catalog" label="Перейти в каталог" className={`w-auto!`} />

                                <LinkYellowBtn href="/services" label="Посмотреть сервисы для пополнения" className={`w-auto!`}/>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {stats.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4"
                                >
                                    <div className="text-2xl font-semibold text-slate-50">{item.value}</div>
                                    <div className="text-sm text-slate-400">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl font-semibold text-slate-50">Почему GameChange</h2>
                        <p className="text-sm text-slate-400">
                            Мы работаем на рынке цифровых товаров более 5 лет и собрали всё, что нужно
                            для комфортных покупок: честные цены, скорость и забота о каждом заказе.
                        </p>
                    </div>

                    <div className="grid gap-4 lg:col-span-2 sm:grid-cols-2">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5"
                            >
                                <h3 className="text-lg font-semibold text-slate-50">{feature.title}</h3>
                                <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className=" gap-6 rounded-3xl border border-slate-800/70 bg-slate-950/50 p-6 sm:p-10">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl font-semibold text-slate-50">
                            Как всё происходит
                        </h2>
                        <p className="text-sm text-slate-400">
                            Мы убрали всё лишнее: всего несколько простых шагов до доступа к игре или
                            сервису.
                        </p>
                    </div>

                    <div className="flex-row space-y-5 md:space-y-0 md:flex items-center justify-between mt-5">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className="flex gap-4 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4"
                            >
                                <div className="flex w-18 rounded-full h-8 md:h-10 md:w-10 items-center justify-center md:rounded-xl border border-amber-400/40 bg-amber-400/10 text-sm font-semibold text-amber-300">
                                    0{index + 1}
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-slate-50">{step.title}</h3>
                                    <p className="mt-1 text-sm text-slate-400">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3 text-center">
                        <h2 className="text-2xl font-semibold text-slate-50">Наши партнёры и платформы</h2>
                        <p className="text-sm text-slate-400">
                            Работаем с самыми популярными экосистемами, чтобы вы могли выбирать
                            удобный формат покупок.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {partnerLogos.map((logo) => (
                            <div
                                key={logo.alt}
                                className="flex h-12 w-28 items-center justify-center rounded-2xl border border-slate-800/70 bg-slate-900/60 p-2"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    width={96}
                                    height={48}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6 text-center sm:p-10">
                    <h2 className="text-2xl font-semibold text-slate-50">
                        Готовы к выгодным покупкам?
                    </h2>
                    <p className="mt-3 text-sm text-slate-300">
                        Присоединяйтесь к сообществу GameChange и получайте доступ к лучшим предложениям
                        для геймеров.
                    </p>
                    <div className="mt-5 flex justify-center">
                        <div className="w-full sm:w-64">
                            <LinkYellowBtn href="/services" label="Начать покупки" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}