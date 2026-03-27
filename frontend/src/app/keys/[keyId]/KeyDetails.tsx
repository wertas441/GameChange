'use client'

import {YellowBtn} from "@/shared/ui-kit/client";
import {activationPlatformIcons, genreOptions, operationSystemIcon} from "@/shared/lib/client";
import Image from "next/image";
import {addNewItem, useCartStore} from "@/entities/cart";
import {PCRequirements, KeyDetailsData} from "@/entities/key";

export default function KeyDetails({keyData}: {keyData: KeyDetailsData} ){

    const {
        id,
        name,
        price,
        keyUrl,
        mainPicture,
        description,
        genres,
        otherPictures,
        systemRequirements,
        developer,
        publisher,
        releaseDate,
        operationSystem,
        activationPlatform,
    } = keyData;
    
    const addData = {
        id,
        keyUrl,
        name,
        price,
        mainPicture,
        count: 0,
    }

    const addToCart = useCartStore(addNewItem)

    return (
        <div className="mx-auto w-full ">
            <main className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-2xl shadow-black/40">
                <div className="relative w-full aspect-video md:aspect-[2.6/0.8]">
                    <Image
                        src={mainPicture}
                        alt={`${name} cover art`}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                <div className="p-6 md:p-8 lg:p-10">
                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
                        {name}
                    </h1>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="mb-3 border-b border-slate-800/80 pb-2 text-2xl font-bold text-slate-50">
                                    Об игре
                                </h2>

                                <p className="mb-6 leading-relaxed text-slate-300">
                                    {description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {genres.map(genre => {
                                        const matchedGenre = genreOptions.find((option) => option.value === genre);
                                        return (
                                            <span
                                                key={genre}
                                                className="rounded-full border border-slate-700/70 bg-slate-950/40 px-3 py-1 text-sm font-medium text-slate-200"
                                            >
                                            {matchedGenre?.label}
                                        </span>
                                        )
                                    })}
                                </div>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold text-slate-50">Галерея</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {otherPictures.map((src, index) => (
                                        <div
                                            key={index}
                                            className="group relative aspect-video overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/30"
                                        >
                                            <Image
                                                src={src}
                                                alt={`Скриншот ${index + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/10"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="mb-4 text-2xl font-bold text-slate-50">Системные требования</h2>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <PCRequirements label={`Минимальные`} requirements={systemRequirements.minimal}/>

                                    <PCRequirements label={`Рекомендуемые`} requirements={systemRequirements.recommended}/>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="flex flex-col gap-5 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6">
                                <div className="text-center">
                                    <p className="text-sm text-slate-400">Цена</p>

                                    <p className="my-3 text-5xl font-extrabold tracking-tighter text-slate-50">
                                        {price} ₽
                                    </p>
                                </div>

                                <YellowBtn label={'Добавить в корзину'} onClick={() => addToCart(addData)} />

                                <div className="border-t border-slate-800/70 pt-5">
                                    <dl className={`space-y-2`}>
                                        <div className="flex items-center justify-between py-1 text-sm">
                                            <dt className="text-slate-400">Разработчик</dt>
                                            <dd className="font-medium text-slate-100">{developer}</dd>
                                        </div>

                                        <div className="flex items-center justify-between py-1 text-sm">
                                            <dt className="text-slate-400">Издатель</dt>
                                            <dd className="font-medium text-slate-100">{publisher}</dd>
                                        </div>

                                        <div className="flex items-center justify-between py-1 text-sm">
                                            <dt className="text-slate-400">Дата выхода</dt>
                                            <dd className="font-medium text-slate-100">{releaseDate}</dd>
                                        </div>

                                        <div className="flex items-center justify-between py-1 text-sm">
                                            <dt className="text-slate-400">Платформы</dt>
                                            <dd className="flex gap-3">
                                                {operationSystem.map(p => (
                                                    operationSystemIcon[p] && (
                                                        <Image key={p} src={operationSystemIcon[p]} width={20} height={20} alt={p} title={p} />
                                                    )
                                                ))}
                                            </dd>
                                        </div>

                                        <div className="flex items-center justify-between py-1 text-sm">
                                            <dt className="text-slate-400">Активация</dt>
                                            <dd className="flex gap-3">
                                                {activationPlatform.map(app => (
                                                    activationPlatformIcons[app] && (
                                                        <Image key={app} src={activationPlatformIcons[app]} width={20} height={20} alt={app} title={app} />
                                                    )
                                                ))}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}


