import {ReactNode} from "react";
import {cookies} from "next/headers";
import ServerErrorState from "@/components/errors/ServerErrorState";

export default async function SupportLayout({children}: {children: ReactNode}) {

    const tokenValue = (await cookies()).get('token')?.value;

    if (!tokenValue) {
        return (
            <ServerErrorState
                title="Проблема с авторизацией"
                description="Чтобы вспользоваться поддержкой вам необходимо аторизоваться в нашем магаизне"
            />
        );
    }

    return children
}