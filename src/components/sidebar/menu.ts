// src/hooks/useMenuItems.ts
"use client";
import { useGetUserProfileQuery } from "@/redux/services/user";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const allMenuItems = [
    { href: "/home", label: "ទំព័រដើម", icon: "home.svg" },
    { href: "/dashboard", label: "ផ្ទាំងបង្ហាញ", icon: "dashboard.svg", adminOnly: true },
    { href: "/food", label: "ម្ហូប & ប្រភេទ", icon: "explore-recipe.svg", adminOnly: true },
    { href: "/explore", label: "រុករកមុខម្ហូប", icon: "explore-food.svg" },
    { href: "/favorite", label: "ចំណង់ចំណូលចិត្ត", icon: "Vector.svg" },
    {
        href: "/recipe",
        label: "រូបមន្តមុខម្ហូប",
        icon: "explore-recipe.svg",
    },
    { href: "/user", label: "អ្នកប្រើប្រាស់ទាំងអស់", icon: "users.svg", adminOnly: true },
    { href: "/setting", label: "ការកំណត់ផ្សេងៗ", icon: "setting.svg" },
];

export function useMenuItems() {
    const router = useRouter();
    const pathname = usePathname();
    const { data: userProfile } = useGetUserProfileQuery();
    const isAdmin = userProfile?.payload?.role === "ROLE_ADMIN";

    // Check authorization when route changes
    useEffect(() => {
        if (!userProfile) return;

        // Redirect admin from /home to /dashboard
        if (isAdmin && pathname === "/home") {
            router.push("/dashboard");
            return;
        }

        const currentRoute = allMenuItems.find(item => item.href === pathname);
        if (currentRoute?.adminOnly && !isAdmin) {
            router.push("/not-authorized");
        }
    }, [pathname, userProfile, isAdmin, router]);

    // Filter menu items based on role
    return isAdmin
        ? allMenuItems.filter(item => item.href !== "/home" && item.href !== "/favorite")
        : allMenuItems.filter(item => !item.adminOnly);
}