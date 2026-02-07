'use client'

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: {children: ReactNode}) {
    // Создаем QueryClient один раз на весь жизненный цикл приложения.
    // useState гарантирует, что клиент не будет пересоздаваться на каждом рендере.
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Данные считаются "свежими" 10 минут и не будут
                        // повторно запрашиваться при каждом маунте компонента.
                        staleTime: 1000 * 60 * 10,
                        // Храним кэш в памяти 1 час после последнего использования.
                        gcTime: 1000 * 60 * 60,
                        // Не дергаем сервер при возвращении на вкладку.
                        refetchOnWindowFocus: false,
                        // Ограничиваем количество повторных попыток запроса.
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
