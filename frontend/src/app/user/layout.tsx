import {ReactNode} from "react";
import UserSideBar from "@/components/UI/context/UserSideBar";
import {cookies} from "next/headers";
import ServerErrorState from "@/components/errors/ServerErrorState";

export default async function UserLayout({children}:{children: ReactNode}) {

    const tokenValue = (await cookies()).get('token')?.value;

    if (!tokenValue) {
        return (
            <ServerErrorState
                title="Проблема с авторизацией"
                description="Чтобы использовать этот функционал необходимо аторизоваться в нашем магаизне"
            />
        );
    }

    return (
        <div className={`max-w-full mx-auto`}>
            <div className="w-full flex flex-col lg:flex-row gap-6">
                <UserSideBar />

                <main className={`w-full rounded-lg`}>
                    {children}
                </main>
            </div>
        </div>
    )
}