import {Metadata} from "next";
import ChangePassword from "@/app/user/change-password/ChangePassword";

export const metadata:Metadata = {
    title: 'Сменить пароль | GameChange',
    description: 'Страница смены пароля от пользовательского аккаунта в сервисе GameChane',
}

export default function ChangePasswordPage() {

    return <ChangePassword />
}