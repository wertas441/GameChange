import {SystemRequirements} from "@/entities/key/model/type";

interface Props {
    requirements: SystemRequirements;
    label: string;
}

export function PCRequirements({ requirements, label }: Props) {

    const { CPU, GPU, RAM, memory } = requirements;

    return (
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-5">
            <h3 className="mb-4 text-lg font-semibold text-slate-50">{label}</h3>

            <dl className="space-y-3">
                <div className="flex justify-between text-sm">
                    <dt className="text-slate-400">CPU</dt>

                    <dd className="text-right font-medium text-slate-100">{CPU}</dd>
                </div>

                <div className="flex justify-between text-sm">
                    <dt className="text-slate-400">GPU</dt>

                    <dd className="text-right font-medium text-slate-100">{GPU}</dd>
                </div>

                <div className="flex justify-between text-sm">
                    <dt className="text-slate-400">RAM</dt>

                    <dd className="text-right font-medium text-slate-100">{RAM} GB</dd>
                </div>

                <div className="flex justify-between text-sm">
                    <dt className="text-slate-400">Свободное место на диске</dt>

                    <dd className="text-right font-medium text-slate-100">{memory} GB</dd>
                </div>
            </dl>
        </div>
    )
}