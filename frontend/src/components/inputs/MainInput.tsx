
interface MainInputProps {
    label: string;
    errr
}

export default function MainInput(
    {
        label,
        error,
        id,
        className = ''
    }) {

    return (
        <div className="space-y-1.5">
            <label
                htmlFor={id}
                className="block text-xs font-medium tracking-wide text-slate-200"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    className={`block w-full rounded-2xl border border-slate-600/70 bg-slate-900/80 px-4 py-3 text-sm text-slate-50 
                    outline-none ring-0 transition focus:border-sky-400 focus:bg-slate-900 focus:shadow-[0_0_0_1px_rgba(56,189,248,0.6)] 
                    placeholder:text-slate-500 ${
                        error ? 'border-red-500/60 focus:border-red-400' : ''
                    } ${className}`}

                />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    )
}



