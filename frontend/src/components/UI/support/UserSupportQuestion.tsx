
interface IProps {
    type: string;
    title: string;
    description: string;
}

export default function UserSupportQuestion({type, title, description}: IProps) {

    return (
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 md:p-8 shadow-lg shadow-black/20">
            <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-slate-700/70 bg-slate-950/40 px-3 py-1 text-xs text-slate-300">
                        {type}
                    </span>
                </div>

                <h2 className="text-xl font-semibold text-slate-50">
                    {title}
                </h2>

                <p className="text-sm leading-relaxed text-slate-300">
                    {description}
                </p>
            </div>
        </div>
    )
}