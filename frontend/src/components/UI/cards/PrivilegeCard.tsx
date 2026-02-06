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
        spotlightColor = "rgba(251, 191, 36, 0.2)",
        className = ''
    }: IProps) {

    return (
        <SpotlightCard
            className={`p-8 text-center ${className}`}
            spotlightColor={spotlightColor}
        >
            <IconComponent className="h-12 w-12 text-amber-400 mx-auto mb-4" />

            <h3 className="text-xl text-slate-50 font-semibold mb-2">{title}</h3>

            <p className="text-sm text-slate-400">{text}</p>
        </SpotlightCard>
    )
}