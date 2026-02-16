import Link from "next/link";
import LinkYellowBtn from "@/components/buttons/yellow/LinkYellowBtn";

const cardBlocks = [
    {
        title: "Каталог ключей",
        description: "Сотни цифровых ключей для популярных игр.",
        href: "/keys/catalog",
    },
    {
        title: "Пополнение сервисов",
        description: "Удобные способы оплаты подписок и кошельков.",
        href: "/services",
    },
    {
        title: "Отзывы покупателей",
        description: "Узнайте, что думают о GameChange другие пользователи.",
        href: "/reviews",
    },
] as const;

export default function NotFound() {

    return (
        <section className="w-full">
            <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
                <div className="rounded-3xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-xl shadow-black/30 sm:p-10">
                    <div className="flex flex-col items-center gap-6 text-center">
                        <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-amber-300">
                            Ошибка 404
                        </span>

                        <div className="space-y-3">
                            <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
                                Страница не найдена
                            </h1>

                            <p className="mx-auto max-w-2xl text-sm text-slate-400 sm:text-base">
                                Похоже, ссылка устарела или страница была перемещена. Вернитесь
                                на главную или выберите один из популярных разделов ниже.
                            </p>
                        </div>

                        <LinkYellowBtn label="На главную" href="/" className="mt-0 w-full px-6 py-3 sm:w-auto"/>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {cardBlocks.map((block) => (
                            <Link key={block.href} href={block.href} className="group rounded-2xl border border-slate-800/70
                            bg-slate-950/40 p-5 text-left transition hover:-translate-y-1 hover:border-amber-400/40 hover:bg-slate-900/80"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-slate-50 transition-colors group-hover:text-amber-400">
                                        {block.title}
                                    </h2>

                                    <span className="text-amber-400 transition group-hover:translate-x-1">
                                        -&gt;
                                    </span>
                                </div>

                                <p className="mt-2 text-sm text-slate-400">{block.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}