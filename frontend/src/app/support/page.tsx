import type { Metadata } from 'next';
import Support from "@/app/support/Support";

export const metadata: Metadata = {
    title: 'Поддержка | GameChange',
    description: 'Наша поддержка работает 24/7 и всегда старается помочь клиенту с возникшими вопросами',
}

export default function SupportPage() {

    return <Support />
}