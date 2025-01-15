"use client";
import { Sidebar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuList } from "./menu";
import Image from "next/image";

type MenuItem = {
    name: string;
    path: string;
    icon: React.ElementType;
};

export function SidebarComponent() {
    const pathname = usePathname();
    const [menuList, setMenuList] = useState<MenuItem[]>(MenuList);

    return (
        <Sidebar aria-label="sidebar" className="bg-[FFFFFF]">
            {/* Logo */}
            <Image
                src="/assets/logo.svg"
                alt="krorya"
                width={170}
                height={109}
                className="pb-4"
            />
            {/* Sidebar Items */}
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {menuList?.map((item, index) => (
                        <Sidebar.Item
                            key={index}
                            as={Link}
                            href={item.path}
                            icon={item.icon}
                            className={
                                pathname === item.path || (pathname === "/" && item.path === "/dashboard")
                                    ? "bg-sidebar-hover-bg text-sidebar-active-text" // Active state
                                    : "text-gray-900 hover:bg-sidebar-hover-bg" // Default state
                            }
                        >
                            {item.name}
                        </Sidebar.Item>
                    ))}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}