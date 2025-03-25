// src/hooks/useMenuItems.ts
"use client";
import { useGetUserProfileQuery } from "@/redux/services/user";

const allMenuItems = [
    { href: "/dashboard", label: "ផ្ទាំងបង្ហាញ", icon: "home.svg" },
    { href: "/food", label: "ម្ហូប & ប្រភេទ", icon: "explore-recipe.svg" },
    { href: "/recipe", label: "រុករកមុខម្ហូប", icon: "explore-food.svg" },
    { href: "/user", label: "អ្នកប្រើប្រាស់ទាំងអស់", icon: "users.svg" },
];

export function useMenuItems() {
    const { data: userProfile } = useGetUserProfileQuery();
    const isAdmin = userProfile?.payload?.role == "ROLE_ADMIN";

    return isAdmin
        ? allMenuItems
        : allMenuItems.filter(item => item.href !== "/food" && item.href !== "/user");
}