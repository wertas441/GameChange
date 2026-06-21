import FAQSection from "@/entities/dashboard/ui/FAQSection";
import {DASHBOARD_FAQ} from "@/entities/dashboard/model/dashboardData";

export function DashboardFAQ() {

    return (
        <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-semibold text-slate-50 sm:text-4xl">Частые вопросы</h2>
                <p className="mt-3 text-sm text-slate-400 sm:text-base">
                    Короткие ответы на то, что спрашивают чаще всего перед покупкой.
                </p>
            </div>

            <div className="mt-10">
                <FAQSection faqData={DASHBOARD_FAQ} />
            </div>
        </div>
    )
}