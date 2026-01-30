import {ElementType, memo} from "react";

interface IProps {
    IconComponent: ElementType;
    label: string;
    data: string;
}

function ProfileDataLine({IconComponent, label, data}: IProps) {

    return (
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <dt className="flex items-center gap-2 text-sm text-slate-400">
                <IconComponent className="h-4 w-4 text-amber-300" />
                {label}
            </dt>
            <dd className="text-sm font-medium text-slate-100">{data}</dd>
        </div>
    )
}

export default memo(ProfileDataLine);