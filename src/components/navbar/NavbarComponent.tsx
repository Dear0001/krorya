"use client";
import Link from "next/link";
import {
    Navbar,
    NavbarBrand,
    NavbarToggle,
    Dropdown,
    Avatar,
} from "flowbite-react";
import { usePathname } from "next/navigation";
import { MenuList } from "@/components/sidebar/menu";

export function NavbarComponent() {
    const pathname = usePathname();

    // Find the current page title based on the pathname
    const currentPage = MenuList.find((item) => item.path === pathname);

    return (
        <Navbar fluid rounded className="shadow-sm">
            <NavbarBrand as={Link} href="https://flowbite-react.com">
              <span className="text-text-sidebar-active-text">
                {currentPage?.name || "Dashboard"}
              </span>
            </NavbarBrand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt="User settings"
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded
                        />
                    }
                >
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Sign Out</Dropdown.Item>
                </Dropdown>
                <NavbarToggle />
            </div>
        </Navbar>
    );
}