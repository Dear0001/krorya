"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "@/app/globals.css";
import { MenuList } from "@/components/sidebar/menu";
import { IoMdClose } from "react-icons/io";

type MenuItem = {
    href: string;
    label: string;
    icon: string;
};

export function SidebarComponent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();
    const [menuList, setMenuList] = useState<MenuItem[]>(MenuList);

    // Automatically close the sidebar on mobile screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                onClose(); // Close the sidebar on mobile screens
            }
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup the event listener
        return () => window.removeEventListener("resize", handleResize);
    }, [onClose]);

    return (
        <aside className={`h-screen w-64 bg-white rounded-lg overflow-hidden transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 z-50`}>
            <div className="flex justify-center pb-4">
                <Image width={200} height={71} src="/assets/logo.svg" alt="logo-krorya" />
            </div>
            <div>
                <ul>
                    {menuList.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={() => {
                                    if (window.innerWidth < 1024) {
                                        onClose(); // Close the sidebar on mobile screens when a menu item is clicked
                                    }
                                }}
                                className={`list-item items-center gap-4 text-[18px] font-medium px-7 py-4 transition-all duration-100 ${
                                    pathname === item.href ? "active bg-custom-gradient" : ""
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
            <button onClick={onClose} className="lg:hidden absolute top-4 right-4 p-2 rounded-full">
                <IoMdClose width={1} height={1}/>
            </button>
        </aside>
    );
}