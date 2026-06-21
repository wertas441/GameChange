import {memo} from "react";

interface Props {
    data: {
        title: string
        text: string
    }[]
}

function ServiceHowItWork({data} : Props) {

    return (
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
            <h2 className="text-lg font-semibold text-slate-50">Как это работает</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {data.map(({title, text}, index) => (
                    <div key={title} className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
                        <div className="flex items-center gap-3">
                            <span
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-400/50
                                bg-amber-400/10 text-xs font-semibold text-amber-300"
                            >
                                {index + 1}
                            </span>

                            <h3 className="text-sm font-semibold text-slate-100">
                                {title}
                            </h3>
                        </div>

                        <p className="mt-2 text-xs text-slate-400">{text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(ServiceHowItWork)
