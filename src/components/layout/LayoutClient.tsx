"use client"; // ✅ Mark this as a Client Component
import { NavbarComponent } from "@/components/navbar/NavbarComponent";
import { SidebarComponent } from "@/components/sidebar/SidebarComponent";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <>
            <aside className="hidden h-screen sticky top-0 md:block sm:block row-span-2 col-span-2 bg-white shadow-lg">
                <SidebarComponent />
            </aside>
            <div className="sticky top-0 col-span-12 md:col-span-10">
                <NavbarComponent />
            </div>
            <main className="col-span-12 md:col-span-10 bg-gray-100 overflow-y-auto h-full pt-4 px-4 hide-scrollbar rounded-lg">
                {children}
            </main>
        </>
);
}
