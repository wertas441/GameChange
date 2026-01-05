import Link from "next/link";

interface IProps {
    text: string,
    href?: string,
    className?: string,
}

export default function ShopNavBarItem({text, href = '/', className = ''}: IProps) {

    return (
        <Link
            href={href}
            className={`text-white px-4 py-1 border  bg-slate-900 border-slate-800 hover:border-slate-500 
            duration-150 ease-in-out rounded-full text-lg ${className}`}
        >
            {text}
        </Link>
    )
}