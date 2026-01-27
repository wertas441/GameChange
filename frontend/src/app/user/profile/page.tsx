import {Metadata} from "next";
import Profile from "@/app/user/profile/Profile";

export const metadata: Metadata = {
    title: 'Профиль | GameChange',
    description: 'Данные о вашем пользовательском ',
}

export default function ProfilePage() {

    return <Profile />
}