'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {dashboardFeedBackData} from "@/entities/dashboard/model/dashboardData";
import Feedback from "@/entities/dashboard/ui/Feedback";
import DashboardHero from "@/entities/dashboard/ui/DashboardHero";
import DashboardFAQ from "@/entities/dashboard/ui/DashboardFAQ";
import DashboardPrivileges from "@/entities/dashboard/ui/DashboardPrivileges";
import DashboardTopSell from "@/entities/dashboard/ui/DashboardTopSell";

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