"use client"; // ✅ Mark this as a Client Component
import { NavbarComponent } from "@/components/navbar/NavbarComponent";
import { SidebarComponent } from "@/components/sidebar/SidebarComponent";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <>
            <aside className="hidden md:block sm:block row-span-2 col-span-2 bg-white shadow-lg">
            <SidebarComponent />
            </aside>
            <div className="col-span-12 md:col-span-10">
        <NavbarComponent />
        </div>
        <main className="col-span-12 md:col-span-10 bg-gray-100 overflow-y-auto h-full pt-4 pl-4 hide-scrollbar rounded-md">
        {children}
        </main>
        </>
);
}
