'use client'

import KeyCard from "@/components/UI/cards/KeyCard";
import {useForm, Controller} from "react-hook-form";
import {KeyListData} from "@/types/key";
import MainInput from "@/components/inputs/MainInput";
import MultiSelectInput, {OptionType} from "@/components/inputs/MultiSelectInput";
import {
    activationPlatformOptions,
    genreOptions,
    operationSystemOptions
} from "@/lib/data";
import YellowBtn from "@/components/buttons/yellowButton/YellowBtn";
import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";
import {getUserStatus, useUserStore} from "@/lib/store/userStore";
import GrayBtn from "@/components/buttons/grayButton/GrayBtn";

interface KeysFilterFormValues {
    minPrice: string;
    maxPrice: string;
    genres: string[];
    activationPlatform: string[];
    operationSystem: string[];
}

const defaultFilters: KeysFilterFormValues = {
    minPrice: '',
    maxPrice: '',
    genres: [],
    activationPlatform: [],
    operationSystem: [],
} as const;

export default function KeysCatalog({keysData} : {keysData: KeyListData[]}){

    const { control, register, reset, handleSubmit } = useForm<KeysFilterFormValues>({
        defaultValues: defaultFilters,
    });

    const isAdmin = useUserStore(getUserStatus)
    const router = useRouter();
    const [appliedFilters, setAppliedFilters] = useState<KeysFilterFormValues>(defaultFilters);

    const {
        minPrice,
        maxPrice,
        genres = [],
        activationPlatform = [],
        operationSystem = [],
    } = appliedFilters;

    const normalizePrice = (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return NaN;
        return Number(trimmed.replace(',', '.'));
    };

    const hasIntersection = (values: string[], target: string[]) => values.some((value) => target.includes(value));

    const filteredKeys = keysData.filter((key) => {
        const keyPrice = normalizePrice(key.price);
        const min = normalizePrice(minPrice ?? '');
        const max = normalizePrice(maxPrice ?? '');

        if (!Number.isNaN(min) && keyPrice < min) return false;
        if (!Number.isNaN(max) && keyPrice > max) return false;
        if (genres.length > 0 && !hasIntersection(genres, key.genres)) return false;
        if (activationPlatform.length > 0 && !hasIntersection(activationPlatform, key.activationPlatform)) return false;
        if (operationSystem.length > 0 && !hasIntersection(operationSystem, key.operationSystem)) return false;

        return true;
    });

    const handleReset = useCallback(() => {
        reset(defaultFilters);
        setAppliedFilters(defaultFilters);
    }, [reset]);

    const handleApplyFilters = useCallback((values: KeysFilterFormValues) => setAppliedFilters(values), []);

    const addKeyPage = useCallback(() => router.push(`/keys/add`), [router]);

    return (
        <div className="flex flex-col gap-6 lg:flex-row">
            <aside className="w-full lg:w-80 xl:w-96">
                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg shadow-black/25">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-50">Фильтры</h2>

                        <GrayBtn label={`Сбросить`} onClick={handleReset} />
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                            <MainInput
                                id="minPrice"
                                label="Цена от"
                                placeholder="0"
                                min={0}
                                {...register('minPrice')}
                            />
                            <MainInput
                                id="maxPrice"
                                label="Цена до"
                                placeholder="9999"
                                min={0}
                                {...register('maxPrice')}
                            />
                        </div>

                        <Controller
                            name="genres"
                            control={control}
                            render={({ field }) => (
                                <MultiSelectInput
                                    id="genres"
                                    label="Жанры"
                                    value={genreOptions.filter((opt) => field.value.includes(opt.value))}
                                    options={genreOptions}
                                    onChange={(vals: OptionType[]) => field.onChange(vals.map((val) => val.value))}
                                    placeholder="Выберите жанры"
                                    error={undefined}
                                />
                            )}
                        />

                        <Controller
                            name="activationPlatform"
                            control={control}
                            render={({ field }) => (
                                <MultiSelectInput
                                    id="activationPlatform"
                                    label="Платформа активации"
                                    value={activationPlatformOptions.filter((opt) => field.value.includes(opt.value))}
                                    options={activationPlatformOptions}
                                    onChange={(vals: OptionType[]) => field.onChange(vals.map((val) => val.value))}
                                    placeholder="Steam, Epic Games..."
                                    error={undefined}
                                />
                            )}
                        />

                        <Controller
                            name="operationSystem"
                            control={control}
                            render={({ field }) => (
                                <MultiSelectInput
                                    id="operationSystem"
                                    label="Операционная система"
                                    value={operationSystemOptions.filter((opt) => field.value.includes(opt.value))}
                                    options={operationSystemOptions}
                                    onChange={(vals: OptionType[]) => field.onChange(vals.map((val) => val.value))}
                                    placeholder="Windows, macOS..."
                                    error={undefined}
                                />
                            )}
                        />
                    </div>

                    <div className="space-y-2 mt-4">
                        <YellowBtn label={`Применить фильтры`} onClick={handleSubmit(handleApplyFilters)} />

                        {isAdmin && (
                            <YellowBtn label={`Добавить игру`} onClick={addKeyPage} />
                        )}
                    </div>
                </div>
            </aside>

            <div className="flex-1">
                {filteredKeys.length === 0 ? (
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 text-center">
                        <p className="text-base font-semibold text-slate-100">Ничего не найдено</p>
                        <p className="mt-2 text-sm text-slate-400">Попробуйте изменить фильтры</p>

                        <YellowBtn label={`Сбросить фильтры`} onClick={handleReset} className={`!max-w-sm mt-5`} />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredKeys.map(key => (
                            <KeyCard
                                key={key.id}
                                keyData={key}
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

