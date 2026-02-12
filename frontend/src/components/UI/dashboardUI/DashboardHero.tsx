import Link from "next/link";
import PixelBlast from "@/components/PixelBlast";

export default function DashboardHero() {

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            <div className="absolute inset-0 z-0">
                <PixelBlast
                    variant="square"
                    pixelSize={3}
                    color="#d2e826"
                    patternScale={2}
                    patternDensity={1}
                    enableRipples
                    rippleSpeed={0.5}
                    rippleThickness={0.1}
                    rippleIntensityScale={1}
                    speed={0.7}
                    transparent
                    edgeFade={0.9}
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/20 to-slate-950/80 pointer-events-none" />
            </div>

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center gap-10 md:gap-12">
                    <h1 className="text-5xl font-bold tracking-tight text-slate-50 sm:text-6xl lg:text-8xl">
                        <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text text-transparent drop-shadow-sm">
                            GameChange
                        </span>
                    </h1>

                <p className="max-w-2xl text-lg text-slate-200 md:text-xl leading-relaxed">
                    <span className="hidden sm:inline"> Прозрачные цены и мгновенная доставка</span>
                </p>

                <div className="flex flex-col sm:flex-row w-auto gap-5">
                    <Link
                        href="/keys/catalog"
                        className="group relative inline-flex items-center justify-center rounded-xl bg-amber-400 px-8 py-3.5 text-base font-bold text-slate-900 transition-all duration-300 hover:bg-amber-300 hover:-translate-y-0.5"
                    >
                        Каталог игр
                    </Link>

                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/40 px-8 py-3.5 text-base font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:bg-slate-800/60 hover:border-slate-600 hover:text-white hover:-translate-y-0.5"
                    >
                        Пополнить баланс
                    </Link>

                </div>

                <p className="text-sm text-slate-300 font-medium">
                    Уже более 10 000 довольных геймеров
                </p>
            </div>
        </div>
    )
}