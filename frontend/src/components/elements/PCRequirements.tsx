import {SystemRequirements} from "@/types/key";

interface IProps {
    requirements: SystemRequirements;
    label: string;
}

export default function PCRequirements({requirements, label}: IProps) {

    return (
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5">
            <h3 className="mb-4 text-lg font-semibold text-slate-50">{label}</h3>

            <dl className="space-y-3">
                <div className="flex justify-between text-sm">
                    <dt className="text-slate-400">CPU</dt>
                    <dd className="text-right font-medium text-slate-100">{requirements.CPU}</dd>
                </div>

                <div className="flex justify-between text-sm">
                    <dt className="text-slate-400">GPU</dt>
                    <dd className="text-right font-medium text-slate-100">{requirements.GPU}</dd>
                </div>

                <div className="flex justify-between text-sm">
                    <dt className="text-slate-400">RAM</dt>
                    <dd className="text-right font-medium text-slate-100">{requirements.RAM} GB</dd>
                </div>

                <div className="flex justify-between text-sm">
                    <dt className="text-slate-400">Свободное место на диске</dt>
                    <dd className="text-right font-medium text-slate-100">{requirements.memory} GB</dd>
                </div>
            </dl>
        </div>
    )
}