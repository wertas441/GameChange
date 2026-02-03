
interface IProps {
    onClick: () => void;
    isActive: boolean;
    label: string;
    price: number;
    description: string;
}

export default function ProductBtn({onClick, isActive, label, price, description}: IProps) {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-2xl cursor-pointer border px-4 py-3 text-left transition ${
                isActive
                    ? "border-amber-400/60 bg-amber-400/10 text-amber-200"
                    : "border-slate-800/70 bg-slate-950/40 text-slate-300 hover:border-amber-400/40 hover:text-amber-300"
            }`}
        >
            <div className="flex items-center justify-between text-sm font-semibold">
                <span>{label}</span>

                <span className="text-slate-50">{price} ₽</span>
            </div>

            <p className="mt-1 text-xs text-slate-400">{description}</p>
        </button>
    )
}