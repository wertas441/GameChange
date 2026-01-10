'use client'

import Select from "react-select";
import {memo} from "react";
import InputError from "@/components/errors/InputError";

export type OptionType = { value: string; label: string };

interface MainMultiSelectProps {
    id: string;
    label?: string;
    value: OptionType[];
    options: OptionType[];
    onChange: (vals: OptionType[]) => void;
    placeholder?: string;
    error: string | undefined;
    noOptionsMessage?: () => string;
    isMulti?: boolean;
}

function MultiSelectInput(
    {
        id,
        label,
        value,
        options,
        onChange,
        placeholder = "Выберите...",
        error,
        noOptionsMessage = () => 'Нет опций',
        isMulti = true,
    }: MainMultiSelectProps) {

    return (
        <div className="space-y-1.5">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-xs ml-2 font-medium tracking-wide text-slate-200"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <Select
                    inputId={id}
                    classNamePrefix="rs"
                    isMulti={isMulti}
                    // Для одиночного выбора передаём один объект либо null
                    value={isMulti ? value : (value[0] ?? null)}
                    options={options}
                    onChange={(vals) => {
                        if (isMulti) {
                            onChange(vals as OptionType[]);
                        } else {
                            const single = vals as OptionType | null;
                            onChange(single ? [single] : []);
                        }
                    }}
                    placeholder={placeholder}
                    noOptionsMessage={noOptionsMessage}
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            minHeight: 48, // ~ py-3
                            borderRadius: 16, // rounded-2xl
                            backgroundColor: 'transparent',
                            borderColor: error
                                ? 'rgba(239,68,68,0.6)'
                                : (state.isFocused ? '#cbd5e1' : '#334155'), // slate-300 : slate-700
                            boxShadow: state.isFocused
                                ? (error
                                    ? '0 0 0 2px rgba(239,68,68,0.18)'
                                    : '0 0 0 2px rgba(251,191,36,0.18)') // red/18 : amber/18
                                : 'none',
                            transition: 'box-shadow 150ms, border-color 150ms',
                            ':hover': {
                                borderColor: error
                                    ? 'rgba(239,68,68,0.6)'
                                    : (state.isFocused ? '#cbd5e1' : '#64748b'), // slate-300 : slate-500
                            },
                        }),
                        input: (base) => ({
                            ...base,
                            color: '#f8fafc', // slate-50
                        }),
                        singleValue: (base) => ({
                            ...base,
                            color: '#f8fafc',
                        }),
                        multiValue: (base) => ({
                            ...base,
                            backgroundColor: 'rgba(251,191,36,0.16)', // amber-400/16
                            border: '1px solid rgba(251,191,36,0.22)',
                            borderRadius: 9999,
                        }),
                        multiValueLabel: (base) => ({
                            ...base,
                            color: '#fef3c7', // amber-100
                            paddingRight: 4,
                        }),
                        multiValueRemove: (base) => ({
                            ...base,
                            color: '#fde68a', // amber-200
                            ':hover': {
                                backgroundColor: 'rgba(251,191,36,0.22)',
                                color: '#f8fafc',
                            },
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color: '#64748b', // slate-500
                        }),
                        valueContainer: (base) => ({
                            ...base,
                            padding: '2px 8px',
                        }),
                        menu: (base) => ({
                            ...base,
                            backgroundColor: 'rgba(2,6,23,0.95)', // slate-950
                            borderRadius: 16,
                            overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
                            border: '1px solid rgba(51,65,85,0.8)', // slate-700/80
                        }),
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected
                                ? 'rgba(251,191,36,0.18)'
                                : (state.isFocused ? 'rgba(251,191,36,0.10)' : 'transparent'),
                            color: '#f8fafc',
                            ':active': {
                                backgroundColor: 'rgba(251,191,36,0.22)',
                            },
                        }),
                        indicatorsContainer: (base) => ({
                            ...base,
                            color: '#cbd5e1', // slate-300
                        }),
                        indicatorSeparator: (base) => ({
                            ...base,
                            backgroundColor: 'rgba(51,65,85,0.8)', // slate-700/80
                        }),
                        clearIndicator: (base) => ({ ...base, padding: 6 }),
                        dropdownIndicator: (base) => ({ ...base, padding: 6 }),
                    }}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 16,
                        colors: {
                            ...theme.colors,
                            primary: '#fbbf24', // amber-400
                            primary25: 'rgba(251,191,36,0.12)',
                            neutral0: 'transparent',
                            neutral80: '#f8fafc',
                            neutral20: '#334155',
                            neutral30: '#64748b',
                            neutral50: '#64748b',
                        },
                    })}
                />
            </div>

            <InputError error={error} />
        </div>
    );
}

export default memo(MultiSelectInput)

















