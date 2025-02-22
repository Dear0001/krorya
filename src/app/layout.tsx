import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import React from "react";
import SessionProvider from "@/app/SessionProvider";
import StoreProvider from "@/app/StoreProvider";

const kantumruyPro = Kantumruy_Pro({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal"],
});

export const metadata = {
    title: "",
    description: "Your App Description",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${kantumruyPro.className} rounded-lg overflow-y-scroll scrollbar-hide h-full`}>
        <body>
        <SessionProvider>
            <StoreProvider>
                {children}
            </StoreProvider>
        </SessionProvider>
        </body>
        </html>
    );
}