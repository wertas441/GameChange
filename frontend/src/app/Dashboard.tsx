'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {dashboardFeedBackData} from "@/lib/dashboardData";
import Feedback from "@/components/UI/Feedback";
import DashboardHero from "@/components/UI/dashboardUI/DashboardHero";
import DashboardFAQ from "@/components/UI/dashboardUI/DashboardFAQ";
import DashboardPrivileges from "@/components/UI/dashboardUI/DashboardPrivileges";
import DashboardTopSell from "@/components/UI/dashboardUI/DashboardTopSell";

export default function Dashboard(){

    return (
        <div className="w-full space-y-50">
            <DashboardHero />

            <DashboardTopSell />

            <DashboardPrivileges />

            <Feedback feedBackData={dashboardFeedBackData} />

            <DashboardFAQ />
        </div>
    )
}