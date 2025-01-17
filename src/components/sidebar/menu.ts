import {
    HiChartPie,
    HiUser
} from "react-icons/hi";
import { BiCategoryAlt } from "react-icons/bi";
import { MdFastfood, MdFoodBank } from "react-icons/md";

export const MenuList = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: HiChartPie,
    },
    {
        name: "User",
        path: "/admin/user",
        icon: HiUser,
    },
    {
        name: "Categories",
        path: "/admin/categories",
        icon: BiCategoryAlt,
    },
    {
        name: "Cuisine",
        path: "/admin/cuisine",
        icon: MdFoodBank,
    },
    {
        name: "Food",
        path: "/admin/food",
        icon: MdFastfood,
    }
];