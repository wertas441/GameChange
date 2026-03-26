'use client'

import KeyCard from "@/entities/key/UI/KeyCard";
import {useForm, Controller} from "react-hook-form";
import MainInput from "@/shared/UI-kit/inputs/MainInput";
import MultiSelectInput, {OptionType} from "@/shared/UI-kit/inputs/MultiSelectInput";
import {
    activationPlatformOptions,
    genreOptions,
    operationSystemOptions
} from "@/shared/data";
import YellowBtn from "@/shared/UI-kit/buttons/YellowBtn";
import {useCallback, useMemo, useState} from "react";
import {getUserStatus, useUserStore} from "@/entities/user/model/store";
import GrayBtn from "@/shared/UI-kit/buttons/GrayBtn";
import ServerErrorState from "@/shared/UI-kit/errors/ServerErrorState";
import useGameKeys from "@/entities/key/model/data";
import {usePageUtils} from "@/shared/hooks/usePageUtils";
import SpinnerLoader from "@/shared/UI-kit/errors/SpinnerLoader";
import YellowGlassBtn from "@/shared/UI-kit/buttons/YellowGlassBtn";
import usePagination from "@/shared/hooks/usePagination";
import Pagination from "@/widgets/Pagination";

interface KeysFilterForm {
    minPrice: string;
    maxPrice: string;
    genres: string[];
    activationPlatform: string[];
    operationSystem: string[];
}

const defaultFilters: KeysFilterForm = {
    minPrice: '',
    maxPrice: '',
    genres: [],
    activationPlatform: [],
    operationSystem: [],
} as const;

export default function KeysCatalog(){

    const { keysData, isLoading, isError } = useGameKeys()

    const { control, register, reset, handleSubmit } = useForm<KeysFilterForm>({
        defaultValues: defaultFilters,
    });

    const { goToPage } = usePageUtils();

    const isAdmin = useUserStore(getUserStatus)

    const [appliedFilters, setAppliedFilters] = useState<KeysFilterForm>(defaultFilters);

    const { minPrice, maxPrice, genres, activationPlatform, operationSystem } = appliedFilters;

    const normalizePrice = (value: string) => {
        const trimmed = value.trim();

        if (!trimmed) return NaN;

        return Number(trimmed);
    };

    const hasIntersection = (values: string[], target: string[]) => {
        return values.some((value) => target.includes(value));
    }

    const filteredKeys = useMemo(() => {
        if (!keysData) return [];

        return keysData.filter((key) => {
            const keyPrice = key.price;
            const min = normalizePrice(minPrice ?? '');
            const max = normalizePrice(maxPrice ?? '');

            if (keyPrice < min) return false;
            if (keyPrice > max) return false;

            if (genres.length > 0 && !hasIntersection(genres, key.genres)) return false;

            if (activationPlatform.length > 0 && !hasIntersection(activationPlatform, key.activationPlatform)) return false;

            if (operationSystem.length > 0 && !hasIntersection(operationSystem, key.operationSystem)) return false;

            return true
        })
    }, [activationPlatform, genres, keysData, maxPrice, minPrice, operationSystem]);

    const {
        currentPage,
        totalPages,
        paginatedItems,
        goToSelectPage,
        resetPage,
        listRef
    } = usePagination({
        items: filteredKeys,
        itemsPerPage: 8,
        scrollOnPageChange: true,
    });

    const handleReset = useCallback(() => {
        reset(defaultFilters);

        setAppliedFilters(defaultFilters);

        resetPage();
    }, [reset, resetPage]);

    const handleApplyFilters = useCallback((values: KeysFilterForm) => {
        setAppliedFilters(values);

        resetPage();
    }, [resetPage]);

    if (isLoading) return <SpinnerLoader text="Загрузка списка игр..." />;

    if (isError || keysData === undefined) return <ServerErrorState />;

    return (
        <div className="flex flex-col gap-6 lg:flex-row">
            <aside className="w-full lg:w-80 xl:w-96">
                <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg shadow-black/25">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-50">Фильтры</h2>

                        <GrayBtn label={`Сбросить`} onClick={handleReset} className={`!w-auto`} />
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
                                    value={genreOptions.filter((opt) => (field.value ?? []).includes(opt.value))}
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
                                    value={activationPlatformOptions.filter((opt) => (field.value ?? []).includes(opt.value))}
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
                                    value={operationSystemOptions.filter((opt) => (field.value ?? []).includes(opt.value))}
                                    options={operationSystemOptions}
                                    onChange={(vals: OptionType[]) => field.onChange(vals.map((val) => val.value))}
                                    placeholder="Windows, macOS..."
                                    error={undefined}
                                />
                            )}
                        />
                    </div>

                    <div className="space-y-4 mt-4">
                        <YellowGlassBtn
                            label={`Применить фильтры`}
                            onClick={handleSubmit(handleApplyFilters)}
                            className={`!w-full !py-3`}
                        />

                        {isAdmin && (
                            <YellowGlassBtn
                                label={`Добавить игру`}
                                onClick={() => goToPage(`/keys/add`)}
                                className={`!w-full !py-3`}
                            />
                        )}
                    </div>
                </div>
            </aside>

            <div ref={listRef} className="flex-1">
                {paginatedItems.length === 0 ? (
                    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 text-center">
                        <p className="text-base font-semibold text-slate-100">Ничего не найдено</p>

                        <p className="mt-2 text-sm text-slate-400">Попробуйте изменить фильтры</p>

                        <YellowBtn label={`Сбросить фильтры`} onClick={handleReset} className={`!max-w-sm mt-5`} />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            {paginatedItems.map(key => (
                                <KeyCard
                                    key={key.id}
                                    keyData={key}
                                    isAdmin={isAdmin}
                                />
                            ))}
                        </div>

                        <div className="pt-2">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={goToSelectPage}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

