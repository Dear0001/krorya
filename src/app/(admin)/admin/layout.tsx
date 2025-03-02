import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import "../../globals.css";
import React from "react";
import LayoutClient from "@/components/layout/LayoutClient";

const kantumruyPro = Kantumruy_Pro({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className={`${kantumruyPro.className} h-screen overflow-auto scrollbar-hide`}>
        <div className="grid grid-rows-[auto_1fr] md:grid-cols-12 min-h-screen h-full rounded-lg">
        <LayoutClient>{children}</LayoutClient>
        </div>
        </main>
    );
}