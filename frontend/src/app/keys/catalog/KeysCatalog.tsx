'use client'

import KeyCard from "@/components/UI/cards/KeyCard";
import {useForm} from "react-hook-form";
import {KeysStructures} from "@/types/keys";

interface KeysFilterFormValues {
    minPrice: string;
    maxPrice: string;
    genres: string[];
    applications: string[];
    platforms: string[];
}

export default function KeysCatalog({keysData} : {keysData: KeysStructures[]}){

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
                {keysData.map(key => (
                    <KeyCard
                        key={key.id}
                        keyData={key}
                    />
                ))}
            </div>
        </div>
    )
}

