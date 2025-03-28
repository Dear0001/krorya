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
        images: "http://krorya-api.up.railway.app/api/v1/fileView/3a0e04d1-b004-455d-95c7-4acf283a8ef1.png",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${kantumruyPro.className} rounded-lg overflow-auto scrollbar-hide h-full`}>
        <SessionProvider>
            <body>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </SessionProvider>
        </html>
    );
}