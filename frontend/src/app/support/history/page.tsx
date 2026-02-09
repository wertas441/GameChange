import type { Metadata } from 'next';
import TicketHistory from "@/app/support/history/TicketHistory";

export const metadata: Metadata = {
    title: 'История обращений | GameChange',
    description: 'История обращений в поддержку GameChange',
}

export default function SupportHistoryPage() {
    return <TicketHistory />
}