"use client";
import Image from "next/image";
import { ReactNode } from "react";
import './globals.css'

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <html>
        <body>
        <main
            className="layout min-h-screen w-screen flex flex-row justify-center items-center p-4 bg-[#F6EEE3] relative">
            <Image
                src={"/icons/kbach-1.svg"}
                alt={"kbach"}
                width={250}
                height={300}
                className={"absolute top-0 right-0"}
            />
            <Image
                src={"/icons/Asset 1 8.svg"}
                alt={"kbach"}
                width={250}
                height={300}
                className={"absolute top-0 left-0"}
            />
            <Image
                src={"/icons/left-dragon.svg"}
                alt={"kbach"}
                width={250}
                height={300}
                className={"absolute bottom-0 left-0"}
            />
            <Image
                src={"/icons/right-dragon.svg"}
                alt={"kbach"}
                width={250}
                height={300}
                className={"absolute bottom-0 right-0"}
            />
            {children}
        </main>
        </body>
    </html>
    );
}