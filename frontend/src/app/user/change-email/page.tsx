import {Metadata} from "next";
import ChangeEmail from "@/app/user/change-email/ChangeEmail";

export const metadata:Metadata = {
    title: 'Сменить почту | GameChange',
    description: 'Страница смены почты для пользовательского аккаунта в сервисе GameChane',
}

export default function ChangeEmailPage() {

    return <ChangeEmail />
}