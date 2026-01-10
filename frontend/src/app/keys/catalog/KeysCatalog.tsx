'use client'


import {keysCatalogDataItems} from "@/lib/data";
import KeyCard from "@/components/UI/cards/KeyCard";
import {useForm} from "react-hook-form";

interface KeysFilterFormValues {
    minPrice: string;
    maxPrice: string;
    genres: string[];
    applications: string[];
    platforms: string[];
}

export default function KeysCatalog(){

    const { register, handleSubmit, formState: { errors } } = useForm<KeysFilterFormValues>({
        defaultValues: {
            minPrice: '',
            maxPrice: '',
            genres: [],
            applications: [],
            platforms: [],
        },
    });

    return (
        <div className="flex items-center justify-between">
            <div className="">

            </div>

            <div className="">

            </div>
        </div>
    )
}

