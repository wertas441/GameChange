

export default function NeedToKnow({text} : { text: string }) {

    return (
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 shadow-lg shadow-black/30">
            <h2 className="text-lg font-semibold text-slate-50">Важно знать</h2>

            <p className="mt-3 text-sm text-slate-400">
                {text}
            </p>
        </div>
    )
}