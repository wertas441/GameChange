import {Metadata} from "next";
import Spotify from "@/app/services/spotify/Spotify";

export const metadata: Metadata = {
    title: 'Купить подписку Spotify | GameChange',
    description: 'Укажите данные для аккаунта и выберите какую подписку хотите приобрести, после оплаты вы моментально получите товар',
}

export default function SpotifyPage() {

    return <Spotify />
}