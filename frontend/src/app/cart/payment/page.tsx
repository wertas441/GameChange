import {Metadata} from "next";
import Payment from "@/app/cart/payment/Payment";
import {cookies} from "next/headers";
import ServerErrorState from "@/components/errors/ServerErrorState";

export const metadata: Metadata = {
    title: "Оплата заказа | GameChange",
    description: 'Оплатите товары из корзины любым удобным для вас способом и сразу получите товар',
}

export default async function PaymentPage() {

    const tokenValue = (await cookies()).get('token')?.value;

    if (!tokenValue) {
        return <ServerErrorState />
    }

    return <Payment token={tokenValue} />
}