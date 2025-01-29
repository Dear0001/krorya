"use client";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import { MenuList } from "@/components/sidebar/menu";

export function NavbarComponent() {
    const pathname = usePathname();
    const router = useRouter();

    // Find the current page title based on the pathname
    const currentPage = MenuList.find((menu) => menu.href === pathname);
    const handleSignOut = () => {
        // Remove the cookie by setting its expiration date to a past date
        document.cookie = "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/");
    };
    return (
        <div className="w-full h-20 relative bg-white flex  items-center px-4">
            <div>
                <div className=" text-neutral-700 text-sm sm:text-base font-normal leading-snug">
                    <h1>សួរស្តី <span>សីហា</span></h1>
                </div>
            </div>
            <div className="ml-auto flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#F7F9FB] rounded-full relative">
                        <Image src="/icons/notification.svg" alt="notification" fill/>
                    </div>
                </div>
                <Image width={10} height={10} className="sm:w-12 sm:h-12 rounded-full" src="https://scontent.fpnh11-2.fna.fbcdn.net/v/t39.30808-1/340292502_538413028484986_443063108382547189_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeH7wRLrJAlGVHv0DhLebuuPcbnkOj5TsxtxueQ6PlOzG9CpmahoVDGBWfCHoIKTJq_0K60s7k5Im98JYTS9HZey&_nc_ohc=GPekbCPGbQMQ7kNvgHDSaBH&_nc_zt=24&_nc_ht=scontent.fpnh11-2.fna&_nc_gid=ATweuGMrn-i4V-MvoKkWKrV&oh=00_AYAfK-7GGfSAM0LYQ8q9F9UcI7TtRwG5kILUhrWdiKlYBA&oe=679FEB05"
                     alt="User avatar"/>
            </div>
        </div>
    );
}