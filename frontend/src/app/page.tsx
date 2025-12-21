import type { Metadata } from 'next';
import Dashboard from "@/app/Dashboard";

export const metadata:Metadata = {
    title: 'GameChange',
    description: 'Game change',
}

export default function Home() {

    return <Dashboard />
}
