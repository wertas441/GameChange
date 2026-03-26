'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {dashboardFeedBackData} from "@/entities/dashboard/model/dashboardData";
import Feedback from "@/entities/dashboard/UI/Feedback";
import DashboardHero from "@/entities/dashboard/UI/DashboardHero";
import DashboardFAQ from "@/entities/dashboard/UI/DashboardFAQ";
import DashboardPrivileges from "@/entities/dashboard/UI/DashboardPrivileges";
import DashboardTopSell from "@/entities/dashboard/UI/DashboardTopSell";

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