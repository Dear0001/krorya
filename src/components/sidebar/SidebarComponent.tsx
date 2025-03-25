"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "@/app/globals.css";
import { IoMdClose } from "react-icons/io";
import {useMenuItems} from "@/components/sidebar/menu";

type MenuItem = {
    href: string;
    label: string;
    icon: string;
};

export function SidebarComponent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();
    const menuList = useMenuItems();

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar - Always visible on desktop, toggled on mobile */}
            <aside
                className={`h-screen w-64 bg-white rounded-lg overflow-hidden z-50 transform transition-transform duration-300 ease-in-out 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} left-0
                lg:translate-x-0 lg:relative`}
            >
                <div className="flex justify-center pb-4 pt-6">
                    <Image width={200} height={71} src="/assets/logo.svg" alt="logo-krorya" />
                </div>
                <div>
                    <ul>
                        {menuList.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className={`list-item items-center gap-4 text-[18px] font-medium px-7 py-4 transition-all duration-100 ${
                                        pathname === item.href ? "active bg-custom-gradient" : ""
                                    }`}
                                >
                                    <Image
                                        src={`/icons/${item.icon}`}
                                        alt={`${item.label}-icon`}
                                        width={25}
                                        height={25}
                                        className={`${pathname === item.href ? "filter-secondary" : ""}`}
                                    />
                                    <span className={`${pathname === item.href ? "text-secondary" : ""}`}>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden absolute top-4 right-4 p-2 rounded-full"
                >
                    <IoMdClose size={24} />
                </button>
            </aside>
        </>
    );
}
