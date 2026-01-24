'use client'

import {KeyDetailsData} from "@/types/keys";
import YellowBtn from "@/components/buttons/yellowButton/YellowBtn";
import {activationPlatformIcons, operationSystemIcon} from "@/lib/data";
import Image from "next/image";
import {addNewItem, useCartStore} from "@/lib/store/cartStore";

export default function KeyDetails({keyData}: {keyData: KeyDetailsData} ){

    const addData = {
        id: keyData.id,
        keyUrl: keyData.keyUrl,
        name: keyData.name,
        price: keyData.price,
        mainPicture: keyData.mainPicture,
    }

    const addToCart = useCartStore(addNewItem)
    const minimalRequirements = Object.entries(keyData.systemRequirements?.minimal ?? {});
    const recommendedRequirements = Object.entries(keyData.systemRequirements?.recommended ?? {});

    return (
        <div className="mx-auto w-full py-8 md:py-12">
            <main className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-2xl shadow-black/40">
                <div className="relative w-full aspect-video md:aspect-[2.6/0.8]">
                    <Image
                        src={keyData.mainPicture}
                        alt={`${keyData.name} cover art`}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                <div className="p-6 md:p-8 lg:p-10">
                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
                        {keyData.name}
                    </h1>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="mb-3 border-b border-slate-800/80 pb-2 text-2xl font-bold text-slate-50">
                                    Об игре
                                </h2>
                                <p className="mb-6 leading-relaxed text-slate-300">
                                    {keyData.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {keyData.genres.map(genre => (
                                        <span
                                            key={genre}
                                            className="rounded-full border border-slate-700/70 bg-slate-950/40 px-3 py-1 text-sm font-medium text-slate-200"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* ---  ГАЛЕРЕЯ СКРИНШОТОВ --- */}
                            <div>
                                <h2 className="mb-4 text-2xl font-bold text-slate-50">Галерея</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {keyData.otherPictures.map((src, index) => (
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

                            {/* --- СИСТЕМНЫЕ ТРЕБОВАНИЯ --- */}
                            <div>
                                <h2 className="mb-4 text-2xl font-bold text-slate-50">Системные требования</h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5">
                                        <h3 className="mb-4 text-lg font-semibold text-slate-50">Минимальные</h3>
                                        {minimalRequirements.length > 0 ? (
                                            <dl className="space-y-3">
                                                {minimalRequirements.map(([key, value]) => (
                                                    <div key={key} className="flex justify-between text-sm">
                                                        <dt className="text-slate-400">{key}</dt>
                                                        <dd className="text-right font-medium text-slate-100">{value}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        ) : (
                                            <p className="text-sm text-slate-400">Данные уточняются</p>
                                        )}
                                    </div>
                                    <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5">
                                        <h3 className="mb-4 text-lg font-semibold text-slate-50">Рекомендуемые</h3>
                                        {recommendedRequirements.length > 0 ? (
                                            <dl className="space-y-3">
                                                {recommendedRequirements.map(([key, value]) => (
                                                    <div key={key} className="flex justify-between text-sm">
                                                        <dt className="text-slate-400">{key}</dt>
                                                        <dd className="text-right font-medium text-slate-100">{value}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        ) : (
                                            <p className="text-sm text-slate-400">Данные уточняются</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* --- ПРАВАЯ КОЛОНКА: ПОКУПКА --- */}
                        <div className="lg:col-span-1">
                            <div className="flex flex-col gap-5 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-6">
                                <div className="text-center">
                                    <p className="text-sm text-slate-400">Цена</p>
                                    <p className="my-3 text-5xl font-extrabold tracking-tighter text-slate-50">
                                        {keyData.price} ₽
                                    </p>
                                </div>

                                <YellowBtn
                                    label={'Добавить в корзину'}
                                    onClick={() => addToCart(addData)}
                                />

                                <div className="space-y-3 border-t border-slate-800/70 pt-5">
                                    <dl>
                                        <div className="flex items-center justify-between py-1 text-sm">
                                            <dt className="text-slate-400">Разработчик</dt>
                                            <dd className="font-medium text-slate-100">{keyData.developer}</dd>
                                        </div>
                                        <div className="flex items-center justify-between py-1 text-sm">
                                            <dt className="text-slate-400">Издатель</dt>
                                            <dd className="font-medium text-slate-100">{keyData.publisher}</dd>
                                        </div>
                                        <div className="flex items-center justify-between py-1 text-sm">
                                            <dt className="text-slate-400">Дата выхода</dt>
                                            <dd className="font-medium text-slate-100">{keyData.releaseDate}</dd>
                                        </div>
                                        <div className="flex items-center justify-between py-1 text-sm">
                                            <dt className="text-slate-400">Платформы</dt>
                                            <dd className="flex gap-3">
                                                {keyData.operationSystem.map(p => (
                                                    operationSystemIcon[p] && (
                                                        <Image key={p} src={operationSystemIcon[p]} width={20} height={20} alt={p} title={p} />
                                                    )
                                                ))}
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between py-1 text-sm">
                                            <dt className="text-slate-400">Активация</dt>
                                            <dd className="flex gap-3">
                                                {keyData.activationPlatform.map(app => (
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


