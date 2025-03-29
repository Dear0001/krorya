"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetUserProfileQuery } from "@/redux/services/user";
import { toast, ToastContainer } from "react-toastify";
import { getImageUrl } from "@/lib/constants";
import { SidebarComponent } from "@/components/sidebar/SidebarComponent";
import { FaBars } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/redux/hooks";
import { clearAccessToken } from "@/redux/features/auth/authSlice";

export function NavbarComponent() {
    const { data: userProfile } = useGetUserProfileQuery();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useAppDispatch();

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

    const photoFileName = userProfile?.payload?.profileImage === "default.jpg" ? null : userProfile?.payload?.profileImage;
    const imageUrl = getImageUrl(photoFileName);

    return (
        <main className="w-full h-20 relative bg-white flex items-center px-4 z-40">
            <ToastContainer />
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
                            : "Hi there"}
                    </span>
                </div>
            </div>

            {/* Right Section */}
            <div className="ml-auto flex items-center space-x-4 relative">
                {/* Notification Icon */}
                {userProfile && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#F7F9FB] rounded-full relative">
                            <Image src="/icons/notification.svg" alt="notification" fill />
                        </div>
                    </div>
                )}

                {/* User Avatar with Dropdown */}
                <div className="relative">
                    <button onClick={toggleDropdown} className="focus:outline-none">
                        <div
                            className="w-[50px] h-[50px] rounded-full object-cover border-2"
                            style={{
                                backgroundImage: `url(${imageUrl ? imageUrl : "/man.png"})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <ul className="py-1">
                                {userProfile ? (
                                    <>
                                        {/* Profile Option */}
                                        <li
                                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                router.push("/profile");
                                            }}
                                        >
                                            Profile
                                        </li>

                                        {/* Sign Out Option */}
                                        <li
                                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            onClick={handleSignOut}
                                        >
                                            Sign Out
                                        </li>
                                    </>
                                ) : (
                                    /* Create Account Option for non-logged in users */
                                    <li
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            router.push("/register");
                                        }}
                                    >
                                        បង្កើតគណនី
                                    </li>
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