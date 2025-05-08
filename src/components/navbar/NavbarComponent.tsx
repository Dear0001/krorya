"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetUserProfileQuery } from "@/redux/services/user";
import { toast, ToastContainer } from "react-toastify";
import { getImageUrl } from "@/lib/constants";
import { SidebarComponent } from "@/components/sidebar/SidebarComponent";
import { FaBars } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { clearAccessToken, selectToken } from "@/redux/features/auth/authSlice";
import {useSelector} from "react-redux";

export function NavbarComponent() {
    const { data: userProfile } = useGetUserProfileQuery();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useAppDispatch();
    const token = useSelector(selectToken);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Automatically close the sidebar on mobile screens when the route changes
    const pathname = usePathname();
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    }, [pathname]);

    const handleSignOut = async () => {
        try {
            // Clear client-side state first
            dispatch(clearAccessToken());

            // Sign out from NextAuth
            await signOut({
                redirect: false,
                callbackUrl: "/login"
            });

            // Clear cookies by calling your backend logout endpoint
            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/logout`, {
                method: "POST",
                credentials: "include"
            });

            toast.success("ការចេញពីគណនីបានជោគជ័យ!");
            router.push("/login");
        } catch (error) {
            toast.error("ការចេញពីគណនីបានបរាជ័យ!");
            console.error("Logout failed:", error);
        }
    };

    const photoFileName = userProfile?.payload?.profileImage === "default.jpg"
        ? null
        : userProfile?.payload?.profileImage;
    const imageUrl = getImageUrl(photoFileName);

    return (
        <main className="w-full h-20 relative bg-white flex items-center px-4 z-40">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Sidebar Toggle Button for Mobile */}
            <button onClick={toggleSidebar} className="lg:hidden p-2">
                <FaBars className="w-6 h-6" />
            </button>

            {/* Left Section */}
            <div>
                <div className="sm:text-base flex justify-start items-center font-normal leading-snug gap-2">
                    <h1>សួរស្តី</h1>
                    <span className="text-secondary text-[24px] font-semibold">
                        {userProfile?.payload?.fullName
                            ? userProfile.payload.fullName.split(" ").pop()
                            : "អ្នកប្រើប្រាស់"}
                    </span>
                </div>
            </div>

            {/* Right Section */}
            <div className="ml-auto flex items-center space-x-4 relative">

                {/* User Avatar with Dropdown */}
                <div className="relative">
                    {!token ? (
                        <button
                            onClick={toggleDropdown}
                            className="focus:outline-none"
                        >
                            <Image
                                src="/icons/not-account.svg"
                                alt="user"
                                width={50}
                                height={50}
                            />
                        </button>
                    ) : (
                        <button onClick={toggleDropdown} className="focus:outline-none">
                            <div
                                className="w-[50px] h-[50px] rounded-full object-cover border-2"
                                style={{
                                    backgroundImage: `url(${
                                        userProfile?.payload?.profileImage === "default.jpg" || !imageUrl
                                            ? "/man.png"
                                            : imageUrl
                                    })`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                        </button>
                    )}

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute w-48 right-0 mt-2 rounded-[20px] py-2.5 px-3 bg-white shadow-card z-50 lg:w-72">
                        <ul className="py-1">
                                {token ? (
                                    <>
                                        <li className={"flex flex-col gap-3 items-center mb-3"}>
                                            <div
                                                className="w-[50px] h-[50px] rounded-full object-cover border-2"
                                                style={{
                                                    backgroundImage: `url(${
                                                        userProfile?.payload?.profileImage === "default.jpg" || !imageUrl
                                                            ? "/man.png"
                                                            : imageUrl
                                                    })`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            />
                                            <p className={"text-sm text-center lg:text-h5"}>ជាកន្លែងសម្រាប់ដាក់អ៊ីម៉ែលអ្នកប្រើប្រាស់</p>
                                        </li>
                                        {/* Profile Option when already login */}
                                        <li
                                            className="flex gap-2 px-2 py-2 mb-2 rounded-lg text-sm bg-[#fef8e7] border border-primary text-primary hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                router.push("/profile");
                                            }}
                                        >
                                            <Image src={"/icons/profile.svg"} alt="user" width={19} height={19} />
                                            គណនីរបស់ខ្ងុំ
                                        </li>

                                        {/* Sign Out Option */}
                                        <li
                                            className="flex gap-2 px-2 rounded-lg py-2 text-sm bg-[#fff1f1] border border-secondary text-secondary hover:bg-gray-100 cursor-pointer"
                                            onClick={handleSignOut}
                                        >
                                            <Image src={"/icons/logout.svg"} alt="user" width={19} height={19} />
                                            ចាកចេញពីគណនី
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className={"flex flex-col gap-1 items-center mb-3"}>
                                            <h1 className={"text-secondary text-h5 text-center lg:text-h2"}>លោកអ្នកមិនទាន់គណនីនៅឡើយ</h1>
                                            <p className={"text-sm text-center lg:text-h5"}>សូមធ្វើការចុះឈ្មោះជាមុនសិន</p>
                                        </li>

                                        <li
                                            className="px-4 py-2 mb-2 rounded-lg text-sm bg-[#fef8e7] border border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                router.push("/register");
                                            }}
                                        >
                                            បង្កើតគណនី
                                        </li>
                                        <li
                                            className="px-4 rounded-lg py-2 text-sm bg-[#fff1f1] border border-primary text-primary hover:bg-primary hover:text-white cursor-pointer"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                router.push("/login");
                                            }}
                                        >
                                            ចូលគណនី
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar with Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
            <div className={`lg:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:relative`}>
                <SidebarComponent isOpen={isSidebarOpen} onClose={toggleSidebar} />
            </div>
        </main>
    );
}