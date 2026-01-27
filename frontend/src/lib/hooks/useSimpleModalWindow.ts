import {useCallback, useEffect, useRef, useState} from "react";

export function useSimpleModalWindow(){

    const [isProcess, setIsProcess] = useState<boolean>(false);
    const [isModalWindowOpen, setIsModalWindowOpen] = useState<boolean>(false);
    const windowModalRef = useRef<HTMLDivElement>(null);
    const previousBodyStylesRef = useRef<{
        position: string;
        top: string;
        width: string;
        overflowY: string;
        left: string;
        right: string;
    } | null>(null);
    const scrollYRef = useRef<number>(0);

    const [isRendered, setIsRendered] = useState<boolean>(false);
    const [isExiting, setIsExiting] = useState<boolean>(false);
    const exitTimerRef = useRef<number | null>(null);

    const toggleModalWindow = useCallback(() => {
        setIsModalWindowOpen(!isModalWindowOpen);
    }, [isModalWindowOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (windowModalRef.current && !windowModalRef.current.contains(event.target as Node)) {
                if (!isProcess) toggleModalWindow();
            }
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (isModalWindowOpen && !isProcess) toggleModalWindow();
            }
        };

        if (isModalWindowOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isModalWindowOpen, isProcess, toggleModalWindow]);


    useEffect(() => {
        // Управление монтированием для анимаций входа/выхода
        if (isModalWindowOpen) {
            if (exitTimerRef.current) {
                window.clearTimeout(exitTimerRef.current);
                exitTimerRef.current = null;
            }
            setIsRendered(true);
            setIsExiting(false);
        } else if (isRendered) {
            // Запускаем анимацию выхода и размонтируем по завершению
            setIsExiting(true);
            exitTimerRef.current = window.setTimeout(() => {
                setIsRendered(false);
                setIsExiting(false);
                exitTimerRef.current = null;
            }, 220); // должно соответствовать длительности plx-scale-out/plx-fade-out
        }
        return () => {
            if (exitTimerRef.current) {
                window.clearTimeout(exitTimerRef.current);
                exitTimerRef.current = null;
            }
        };
    }, [isModalWindowOpen, isRendered]);

    useEffect(() => {
        if (isRendered) {
            if (!previousBodyStylesRef.current) {
                previousBodyStylesRef.current = {
                    position: document.body.style.position,
                    top: document.body.style.top,
                    width: document.body.style.width,
                    overflowY: document.body.style.overflowY,
                    left: document.body.style.left,
                    right: document.body.style.right,
                };
            }

            scrollYRef.current = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollYRef.current}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.width = '100%';
            document.body.style.overflowY = 'scroll';
        } else if (previousBodyStylesRef.current) {
            document.body.style.position = previousBodyStylesRef.current.position;
            document.body.style.top = previousBodyStylesRef.current.top;
            document.body.style.left = previousBodyStylesRef.current.left;
            document.body.style.right = previousBodyStylesRef.current.right;
            document.body.style.width = previousBodyStylesRef.current.width;
            document.body.style.overflowY = previousBodyStylesRef.current.overflowY;
            previousBodyStylesRef.current = null;
            window.scrollTo(0, scrollYRef.current);
        }
    }, [isRendered]);

    return {
        isModalWindowOpen,
        setIsModalWindowOpen,
        isRendered,
        isProcess,
        setIsRendered,
        isExiting,
        setIsExiting,
        exitTimerRef,
        setIsProcess,
        toggleModalWindow,
        windowModalRef,
    }
}