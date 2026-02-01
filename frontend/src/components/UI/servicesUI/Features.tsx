

export default function Features({data}: {data: string[]}) {

    return (
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
            <h2 className="text-lg font-semibold text-slate-50">Преимущества</h2>

            <ul className="mt-4 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                {data.map((text) => (
                    <li key={text} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-amber-400" />

                        <span>{text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}