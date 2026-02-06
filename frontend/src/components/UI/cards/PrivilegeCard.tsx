import {ElementType} from "react";
import SpotlightCard from "@/components/UI/modern/SpotlightCard";

interface IProps {
    IconComponent: ElementType;
    title: string;
    text: string;
    className?: string;
    spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
}

export default function PrivilegeCard(
    {
        IconComponent,
        title,
        text,
        spotlightColor = "rgba(0, 254, 146, 0.2)",
        className = ''
    }: IProps) {

    return (
        <SpotlightCard
            className={`p-10 rounded-xl border border-white/10 text-center ${className}`}
            spotlightColor={spotlightColor}
        >
            <IconComponent className="h-12 w-12 text-[#00FE92] mx-auto mb-4" />

            <h3 className="text-2xl text-white font-bold mb-2">{title}</h3>

            <p className="text-gray-400">{text}</p>
        </SpotlightCard>
    )
}