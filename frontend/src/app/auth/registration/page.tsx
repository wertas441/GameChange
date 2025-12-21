import {Metadata} from "next";
import Registration from "@/app/auth/registration/Registration";

export const metadata:Metadata = {
    title: 'Регистрация | GameChange',
    description: 'Регистрация нового пользовательского аккаунта в магазине цифровых товаров GameChange',
}

export default function RegistrationPage(){

    return <Registration />
}