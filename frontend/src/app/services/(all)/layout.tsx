import {ReactNode} from "react";
import ServicesSideBar from "@/components/UI/context/ServicesSideBar";


export default function ServicesLayout({children}: {children: ReactNode}) {

    return (
        <div className="flex">
            <ServicesSideBar />

            {children}
        </div>
    )
}