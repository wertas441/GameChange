import Link from "next/link";
import {memo} from "react";

interface Props {
    text: string,
    link: string,
    className?: string,
}

function FooterNavItem({text, link, className = ''}: Props) {

    return (
        <li>
            <Link href={link} className={`navItem transition-colors duration-300 hover:text-white ${className}`}>
                {text}
            </Link>
        </li>
    )
}

export default memo(FooterNavItem);