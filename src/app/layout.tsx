import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import React from "react";

const kantumruyPro = Kantumruy_Pro({
    subsets: ["latin"],
    weight: ["400", "700"],
    style: ["normal"],
});

export const metadata = {
    title: "",
    description: "Your App Description",
};

export default function RootLayout({  children,  }: Readonly<{ children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${kantumruyPro.className} h-full`}>
        <body>
            {children}
        </body>
        </html>
    );
}
