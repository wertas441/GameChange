import {useRouter} from "next/navigation";

interface IProps {
    text: string,
    toggle: () => void,
    href?: string,
    className?: string,
}

export default function ShopNavBarItem({text, toggle, href = '/', className = ''}: IProps) {

    const router = useRouter();

    const goToSelectedOption = () => {
        router.push(`${href}`)
        toggle()
    }

    return (
        <button
            onClick={goToSelectedOption}
            className={`text-white cursor-pointer px-4 py-1 border  bg-slate-900 border-slate-800 hover:border-slate-500 
            duration-150 ease-in-out rounded-full text-lg ${className}`}
        >
            {text}
        </button>
    )
}