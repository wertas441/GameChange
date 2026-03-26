import Image from "next/image";
import {memo} from "react";

interface IProps {
    label: string;
    text: string;
    imageSrc: string;
    imageAlt: string;
    imageClassName?: string;
}

function ServiceHeader({label, text, imageSrc, imageAlt, imageClassName = ''}: IProps) {

    return (
        <div className="flex flex-col gap-4 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/50">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={48}
                        height={48}
                        className={`h-full w-full object-cover ${imageClassName}`}
                    />
                </div>

                <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
                    {label}
                </h1>
            </div>

            <p className=" text-sm text-slate-400 sm:text-base">
                {text}
            </p>
        </div>
    )
}

export default memo(ServiceHeader);