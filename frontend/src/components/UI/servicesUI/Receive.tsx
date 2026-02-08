import {memo} from "react";

interface IProps {
    label: string;
    data: {
        title: string;
        text: string;
    }[];
}

function Receive({label, data} : IProps) {

    return (
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
            <h2 className="text-lg font-semibold text-slate-50">{label}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {data.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
                        <h3 className="text-sm font-semibold text-slate-100">{item.title}</h3>

                        <p className="mt-2 text-xs text-slate-400">{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(Receive);