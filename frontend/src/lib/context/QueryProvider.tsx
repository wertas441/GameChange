'use client'

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function QueryProvider({ children }: {children: ReactNode}) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
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
            <ReactQueryDevtools initialIsOpen={false} />

            {children}
        </QueryClientProvider>
    )
}
