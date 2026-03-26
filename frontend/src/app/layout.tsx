import { Geist, Geist_Mono } from "next/font/google";
import "@/shared/styles/globals.css";
import {ReactNode} from "react";
import LayoutWrapper from "@/app/LayoutWrapper";
import QueryProvider from "@/app/QueryProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({children}: Readonly<{children: ReactNode}>) {

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <QueryProvider>
                    <LayoutWrapper>
                        {children}
                    </LayoutWrapper>
                </QueryProvider>
            </body>
        </html>
    );
}
