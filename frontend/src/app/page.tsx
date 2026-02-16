import type { Metadata } from 'next';
import Dashboard from "@/app/Dashboard";

export const metadata:Metadata = {
    title: 'Главная | GameChange',
    description: `Интернет магазин GameChange предлагает огромный ассортимент игровых ключей, подписок и всеразличных способ пополнить
       кошелёк в своих любимых сервисах. Присоединяйся к нам!`,
}

export default function Home() {

    return <Dashboard />
}
