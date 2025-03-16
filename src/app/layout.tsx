import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import React from "react";
import SessionProvider from "@/app/SessionProvider";
import StoreProvider from "@/app/StoreProvider";
import {ToastContainer} from "react-toastify";
import {Metadata} from "next";

const kantumruyPro = Kantumruy_Pro({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal"],
});


export const metadata: Metadata = {
    title: "krorya",
    description: "krorya is a web application for selling products the same as advertising about culture of khmer.",
    openGraph: {
        title: "Krorya dashboard web",
        description:
            "krorya is a web application for selling products the same as advertising about culture of khmer.",
        images: "https://krorya-api.onrender.com/api/v1/fileView/1bcfd028-3376-4339-bf02-5d2f1d918896.png",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${kantumruyPro.className} rounded-lg overflow-auto scrollbar-hide h-full`}>
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