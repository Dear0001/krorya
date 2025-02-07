"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUserProfileQuery } from "@/redux/services/user";
import {toast, ToastContainer} from "react-toastify";

export function NavbarComponent() {
    // getUserProfile from redux RTK Query
    const { data: userProfile } = useGetUserProfileQuery();
    console.log("User profile from Navbar:", userProfile);

    const router = useRouter();

    // State to manage dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    // Sign out function
    const handleSignOut = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_URL}/api/logout`, { method: "POST" });
            toast.success("ការចេញពីគណនីបានជោគជ័យ!");
            router.push("/login");
        } catch (error) {
            toast.error("ការចេញពីគណនីបានបរាជ័យ!");
            console.error("Logout failed:", error);
        }
    };

    const photoFileName = userProfile?.payload?.profileImage;
    // If the API returns only the filename, construct the full image URL manually
    const imageUrl = photoFileName ? `${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/v1/fileView/${photoFileName}` : "/assets/image_login.png";

    return (
        <main className="w-full h-20 relative bg-white flex items-center px-4">
            <ToastContainer/>
            {/* Left Section */}
            <div>
                <div className="text-neutral-700 text-sm sm:text-base font-normal leading-snug">
                    <h1>
                        សួរស្តី    {userProfile?.payload?.fullName ? `${userProfile.payload.fullName}` : "Admin"}
                    </h1>
                </div>
            </div>

            {/* Right Section */}
            <div className="ml-auto flex items-center space-x-4 relative">
                {/* Notification Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#F7F9FB] rounded-full relative">
                        <Image src="/icons/notification.svg" alt="notification" fill />
                    </div>
                </div>

                {/* User Avatar with Dropdown */}
                <div className="relative">
                    <button onClick={toggleDropdown} className="focus:outline-none">

                        <Image
                            width={50}
                            height={50}
                            className="w-[50px] h-[50px] rounded-full object-cover border-2"
                            src={
                                imageUrl && imageUrl.startsWith("http")
                                    ? imageUrl
                                    : "/assets/images/profile.png"
                            }
                            alt="User avatar"
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <ul className="py-1">
                                {/* Profile Option */}
                                <li
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        router.push("/admin/profile");
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
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}