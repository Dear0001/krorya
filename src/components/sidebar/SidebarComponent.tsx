"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {MenuList} from "@/components/sidebar/menu";

type MenuItem = {
    href: string;
    label: string;
    icon: string;
};


export function SidebarComponent() {
    const pathname = usePathname();
    const [menuList, setMenuList] = useState<MenuItem[]>(MenuList);

    return (
        <aside className="h-screen w-full bg-white">
            <div className="flex justify-center pb-4">
                <Image width={200} height={71} src="/assets/logo.svg" alt="logo-krorya" />
            </div>
            <div>
                <ul>
                    {menuList.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`flex items-center gap-4 text-[18px] font-medium px-7 py-4 transition-all duration-100 ${
                                    pathname === item.href
                                        ? "active bg-custom-gradient"
                                        : ""
                                }`}
                            >
                                <Image
                                    src={`/icons/${item.icon}`}
                                    alt={`${item.label}-icon`}
                                    width={25}
                                    height={25}
                                />
                                <span className="text-normal">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}