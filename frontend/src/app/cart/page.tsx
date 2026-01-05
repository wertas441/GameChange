import {Metadata} from "next";
import Cart from "@/app/cart/Cart";

export const metadata: Metadata = {
    title: 'Корзина товаров | GameChange ',
    description: 'Корзина выбранных пользователем товаров для дальнейшей покупки в магазине GameChange',
}

export default function CartPage(){

    return <Cart />
}