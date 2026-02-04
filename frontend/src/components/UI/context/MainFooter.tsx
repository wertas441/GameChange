import FooterNavItem from "@/components/elements/FooterNavItem";

export default function MainFooter() {

    return (
        <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/60 text-slate-300">
            <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">

                    <div className="md:col-span-2 lg:col-span-2">
                        <h2 className="text-2xl font-semibold text-amber-400 mb-2">
                            GameChange
                        </h2>
                        <p className="max-w-xs text-sm text-slate-400 mb-6">
                            Надежный портал в мир цифровых товаров и подписок.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100">Магазин</h3>
                        <ul className="mt-4 space-y-4">
                            <FooterNavItem text={'Игровые ключи'} link={'/keys/catalog'} />
                            <FooterNavItem text={'Пополнение сервисов'} link={'/services'} />
                            <FooterNavItem text={'Ваша корзина'} link={'/cart'} />
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100">Информация</h3>
                        <ul className="mt-4 space-y-4">
                            <FooterNavItem text={'Отзывы'} link={'/reviews'} />
                            <FooterNavItem text={'О нас'} link={'/about'} />
                            <FooterNavItem text={'История покупок'} link={'/user/purchases'} />

                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-100">Помощь</h3>
                        <ul className="mt-4 space-y-4">
                            <FooterNavItem text={'Поддержка'} link={'/support'} />
                        </ul>
                    </div>

                </div>

                <div className="mt-12 border-t border-slate-800/80 pt-6 text-center text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} GameChange. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
}