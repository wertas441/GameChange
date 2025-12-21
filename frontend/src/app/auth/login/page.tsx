import {Metadata} from "next";
import Login from "@/app/auth/login/Login";

export const metadata:Metadata = {
    title: 'Авторизация | GameChange',
    description: "Страница авторизации в магазин цифровых товаров и услуг GameChange",
}

export default function LoginPage() {

    return <Login />
}