import Link from "next/link";
import Image from "next/image";

interface IProps {
    id: string;
    href: string;
    isActive: boolean;
    logo: string;
    title: string;
    tag: string;
}

export default function ServicesSideBarRow({id, href, isActive, logo, tag, title}: IProps) {

    return (
        <Link
            key={id}
            href={href}
            className={`group flex items-center gap-3 rounded-xl border px-3 py-2 transition ${
                isActive
                    ? "border-amber-400/60 bg-amber-400/10 text-amber-200"
                    : "border-slate-900/0 text-slate-300 hover:border-amber-400/40 hover:text-amber-300"
            }`}
        >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-slate-900/60 bg-slate-950/50">
                <Image
                    src={logo}
                    alt={`${title} logo`}
                    width={36}
                    height={36}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-col">
                <span className="text-sm font-medium">
                    {title}
                </span>

                <span className="text-xs text-slate-400 ">
                    {tag}
                </span>
            </div>
        </Link>
    );
}