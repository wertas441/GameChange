import {useCallback, useEffect, useMemo, useRef, useState} from "react";

interface UsePaginationOptions<T> {
    items: T[];
    itemsPerPage?: number;
    initialPage?: number;
    scrollOnPageChange?: boolean;
    scrollBehavior?: ScrollBehavior;
    scrollBlock?: ScrollLogicalPosition;
}

const clampPage = (page: number, totalPages: number) => {
    if (totalPages <= 0) return 1;

    return Math.min(Math.max(page, 1), totalPages);
};

export default function usePagination<T, TElement extends HTMLElement = HTMLDivElement>(
    {
       items,
      itemsPerPage = 10,
      initialPage = 1,
      scrollOnPageChange = false,
      scrollBehavior = "smooth",
      scrollBlock = "start",
    }: UsePaginationOptions<T>) {

    const totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    const listRef = useRef<TElement | null>(null);
    const isMountedRef = useRef(false);

    const [currentPage, setCurrentPage] = useState(() => clampPage(initialPage, totalPages));

    useEffect(() => {
        setCurrentPage((prev) => clampPage(prev, totalPages));
    }, [totalPages]);

    const goToPage = useCallback((page: number) => {
        setCurrentPage(clampPage(page, totalPages));
    }, [totalPages]);

    const nextPage = useCallback(() => {
        setCurrentPage((prev) => clampPage(prev + 1, totalPages));
    }, [totalPages]);

    const prevPage = useCallback(() => {
        setCurrentPage((prev) => clampPage(prev - 1, totalPages));
    }, [totalPages]);

    const resetPage = useCallback(() => setCurrentPage(1), []);

    const paginatedItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;

        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, items, itemsPerPage]);

    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    useEffect(() => {
        if (!scrollOnPageChange) return;

        if (!isMountedRef.current) {
            isMountedRef.current = true;
            return;
        }

        listRef.current?.scrollIntoView({
            behavior: scrollBehavior,
            block: scrollBlock,
        });
    }, [currentPage, scrollBehavior, scrollBlock, scrollOnPageChange]);

    return {
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        paginatedItems,
        canGoPrev,
        canGoNext,
        setCurrentPage: goToPage,
        goToPage,
        nextPage,
        prevPage,
        resetPage,
        listRef,
    };
}
