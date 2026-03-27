'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {dashboardFeedBackData} from "@/entities/dashboard/model/dashboardData";
import {Feedback} from "@/entities/dashboard";
import {DashboardHero} from "@/entities/dashboard";
import {DashboardFAQ} from "@/entities/dashboard";
import {DashboardPrivileges} from "@/entities/dashboard";
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