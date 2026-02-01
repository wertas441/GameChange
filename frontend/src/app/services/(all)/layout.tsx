import {ReactNode} from "react";
import ServicesSideBar from "@/components/UI/context/ServicesSideBar";

export default function ServicesLayout({children}: {children: ReactNode}) {

    return (
        <section className="w-full">
            <div className="mx-auto w-full px-4 pb-16 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6 lg:flex-row">
                    <ServicesSideBar />

                    <main className="w-full lg:flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </section>
    )
}