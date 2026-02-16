import {ChevronLeft, ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
    siblingCount?: number;
}

type PageToken = number | "...";

const DOTS = "...";

function getPageTokens(currentPage: number, totalPages: number, siblingCount: number): PageToken[] {

    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPages) {
        return Array.from({length: totalPages}, (_, index) => index + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);

    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;

    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
        const leftRange = siblingCount * 2 + 3;
        const leftItems = Array.from({length: leftRange}, (_, index) => index + 1);

        return [...leftItems, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
        const rightRange = siblingCount * 2 + 3;
        const start = totalPages - rightRange + 1;

        const rightItems = Array.from({length: rightRange}, (_, index) => start + index);

        return [1, DOTS, ...rightItems];
    }

    const middleItems = Array.from(
        {length: rightSiblingIndex - leftSiblingIndex + 1},
        (_, index) => leftSiblingIndex + index
    );

    return [1, DOTS, ...middleItems, DOTS, totalPages];
}

export default function Pagination(
    {
      currentPage,
      totalPages,
      onPageChange,
      className,
      siblingCount = 1,
    }: PaginationProps) {

    if (totalPages <= 1) {
        return null;
    }

    const pageTokens = getPageTokens(currentPage, totalPages, siblingCount);

    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
        <nav className={cn("flex flex-wrap items-center justify-center gap-2", className)} aria-label="Пагинация">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!canGoPrev}
                className={cn(
                    "inline-flex cursor-pointer h-9 w-9 items-center justify-center rounded-xl border border-slate-700/70",
                    "bg-slate-900/70 text-slate-200 transition hover:border-slate-500/80 hover:bg-slate-800/80",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                )}
                aria-label="Предыдущая страница"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            {pageTokens.map((token, index) => {
                if (token === DOTS) {
                    return (
                        <span key={`dots-${index}`} className="inline-flex h-9 min-w-9 items-center justify-center text-slate-400">
                            ...
                        </span>
                    );
                }

                const isActive = token === currentPage;

                return (
                    <button
                        key={token}
                        type="button"
                        onClick={() => onPageChange(token)}
                        className={cn(
                            "inline-flex cursor-pointer h-9 min-w-9 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition",
                            isActive
                                ? "border-amber-400/80 bg-amber-500/20 text-amber-200"
                                : "border-slate-700/70 bg-slate-900/70 text-slate-200 hover:border-slate-500/80 hover:bg-slate-800/80"
                        )}
                        aria-current={isActive ? "page" : undefined}
                    >
                        {token}
                    </button>
                );
            })}

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!canGoNext}
                className={cn(
                    "inline-flex cursor-pointer h-9 w-9 items-center justify-center rounded-xl border border-slate-700/70",
                    "bg-slate-900/70 text-slate-200 transition hover:border-slate-500/80 hover:bg-slate-800/80",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                )}
                aria-label="Следующая страница"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </nav>
    );
}
