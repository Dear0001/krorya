"use client"; // ✅ Mark this as a Client Component
import { NavbarComponent } from "@/components/navbar/NavbarComponent";
import { SidebarComponent } from "@/components/sidebar/SidebarComponent";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* Sidebar - Hidden on tablet (md) screens and below */}
            <aside className="hidden h-screen sticky top-0 lg:block md:hidden sm:hidden row-span-2 col-span-2 bg-white shadow-lg z-40">
                <SidebarComponent isOpen={false} onClose={() => {}} />
            </aside>


            {/* Navbar - Full width on tablet (md) screens and below */}
            <div className="sticky top-0 col-span-12 lg:col-span-10 z-40">
                <NavbarComponent />
            </div>

            {/* Main Content - Full width on tablet (md) screens and below */}
            <main className="col-span-12 lg:col-span-10 bg-gray-100 overflow-y-auto h-full pt-4 px-4 hide-scrollbar rounded-lg">
                {children}
            </main>
        </>
    );
}