import {ElementType, memo} from "react";
import {useRouter} from "next/navigation";

interface IProps {
    link: string;
    label: string;
    IconComponent: ElementType;
    active: boolean;
}

function UserSideBarBtn({link, label, IconComponent, active}: IProps) {

    const router = useRouter();

    const goToPage = () => {
        router.push(link);
    }

    return (
        <button
            onClick={goToPage}
            className={`group w-full flex items-center gap-3 py-2.5 cursor-pointer px-3 rounded-xl border transition text-left ${
                active
                    ? 'border-amber-400/50 bg-amber-400/10 text-amber-200 shadow-sm shadow-amber-500/10'
                    : 'border-slate-800/70 text-slate-200 hover:border-slate-600/80 hover:bg-slate-800/60'
            }`}
        >
            <IconComponent
                className={`h-5 w-5 transition ${active ? 'text-amber-300' : 'text-slate-400 group-hover:text-amber-200'}`}
            />
            <span className="text-sm font-medium">{label}</span>
        </button>
    )
}

export default memo(UserSideBarBtn)