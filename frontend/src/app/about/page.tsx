import {Metadata} from "next";
import About from "@/app/about/About";

export const metadata: Metadata = {
    title: 'О нас | GameChange',
    description: 'Узнайте больше о нас и нашем магазине, станьте частью сообщества GameChange',
}

export default function AboutPage() {

    return <About />
}