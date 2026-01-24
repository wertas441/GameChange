"use client"

import Link from "next/link";
import Image from "next/image";
import {
    activationPlatformIcons,
    operationSystemIcon,
    ActivationPlatform,
    OperationSystem
} from "@/lib/data";
import {KeyListData} from "@/types/keys";
import {addNewItem, useCartStore} from "@/lib/store/cartStore";

export default function KeyCard ({ keyData }:{ keyData: KeyListData }) {

    const {
        id,
        keyUrl,
        name,
        price,
        mainPicture,
        releaseDate,
        operationSystem = [],
        activationPlatform = [],
        genres = []
    } = keyData;

    const addData = {
        id: id,
        keyUrl: keyData.keyUrl,
        name: name,
        price: price,
        mainPicture: mainPicture,
    }

    const addToCart = useCartStore(addNewItem)

    const isActivationPlatform = (value: string): value is ActivationPlatform => value in activationPlatformIcons;
    const isOperationSystem = (value: string): value is OperationSystem => value in operationSystemIcon;

    const linkUrl = `/keys/${keyUrl}`

    return (
        <div
            key={id}
            className={`flex flex-col md:flex-row items-center gap-4 md:gap-6 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 md:p-6 shadow-lg shadow-black/30 transition
            hover:border-amber-400/40 hover:bg-slate-900/80`}
        >

            <Link href={linkUrl} className="w-full md:w-48 lg:w-56 shrink-0">
                <Image
                    className="rounded-md w-full object-cover aspect-video"
                    src={mainPicture}
                    width={1920}
                    height={1080}
                    alt={name}
                />
            </Link>

            <div className="flex flex-col lg:flex-row grow items-center justify-between w-full gap-4">

                <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                    <Link href={linkUrl}>
                        <h1 className="text-white text-lg md:text-xl font-semibold hover:text-amber-400 transition-colors">
                            {name}
                        </h1>
                    </Link>
                    <p className="mt-1 text-sm text-slate-400">Дата выхода: {releaseDate}</p>

                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 mt-3">

                        <div className="flex items-center gap-3">
                            {activationPlatform.filter(isActivationPlatform).map(app => {
                                const iconSrc = activationPlatformIcons[app];
                                return iconSrc
                                    ? <Image key={app} src={iconSrc} width={23} height={23} alt={`${app} Icon`} title={app} />
                                    : null;
                            })}
                        </div>

                        {activationPlatform.length > 0 && operationSystem.length > 0 && (
                            <div className="h-5 border-r border-slate-600/70"></div>
                        )}

                        <div className="flex items-center gap-2">
                            {operationSystem.filter(isOperationSystem).map(platform => {
                                const iconSrc = operationSystemIcon[platform];
                                return iconSrc
                                    ? <Image key={platform} src={iconSrc} width={23} height={23} alt={`${platform} Icon`} title={platform} />
                                    : null;
                            })}
                        </div>

                        {genres.map(genre => (
                            <p key={genre} className="rounded-full border border-slate-700/70 bg-slate-950/40 px-2.5 py-1 text-xs text-slate-300">
                                {genre}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center lg:items-end w-full lg:w-auto shrink-0 mt-2 lg:mt-0">
                    <h2 className="mb-5 text-3xl font-bold text-slate-50 md:text-4xl">
                        {price} ₽
                    </h2>

                    <button
                        onClick={() => addToCart(addData)}
                        className={`w-full lg:w-auto rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-md shadow-amber-400/20 transition
                        hover:bg-amber-500 cursor-pointer hover:shadow-amber-400/30 active:translate-y-px`}
                    >
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    );
}