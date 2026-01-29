import {Metadata} from "next";
import Purchases from "@/app/user/purchases/Purchases";
import {getPurchases} from "@/lib/controllers/userController";
import {cookies} from "next/headers";
import ServerErrorState from "@/components/errors/ServerErrorState";

export const metadata: Metadata = {
    title: 'Game Change',
    description: 'Game Change',
}

export default async function PurchasesPage() {

    const tokenValue = (await cookies()).get('token')?.value;

    if (!tokenValue) {
        return <ServerErrorState />
    }

    const purchasesList = await getPurchases(tokenValue);

    if (typeof purchasesList === "undefined") {
        return <ServerErrorState />
    }

    if (!purchasesList?.length) {
        return (
            <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
                <h1 className="text-2xl font-semibold text-slate-50">История покупок</h1>
                <p className="mt-2 text-sm text-slate-400">
                    У вас пока нет покупок. Самое время выбрать что-нибудь новое.
                </p>
            </section>
        );
    }

    return <Purchases purchases={purchasesList} />
}