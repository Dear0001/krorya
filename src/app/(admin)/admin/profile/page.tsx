"use client";
import Image from "next/image";
import { useGetUserProfileQuery } from "@/redux/services/user";
import EditProfile from "@/components/profile/EditProfile";
import React from "react";

const Page = () => {
    // Get user profile data using RTK Query
    const { data: userProfile } = useGetUserProfileQuery();
    const userData = userProfile?.payload;
    console.log("User Data:", userData);

    // Check if the user profile data is loaded and if there's a profile image
    const profileImage = userData?.profileImage;

    return (
        <>
            <main className={"mr-5 p-5 bg-[#FFFFFF]"}>
                <div className={"flex gap-5"}>
                    <section>
                        {/* Show profile image or default if missing */}
                        <Image
                            src={
                                profileImage && profileImage.startsWith("http")
                                    ? profileImage
                                    : "/assets/images/profile.png"
                            }
                            alt="profile"
                            width={140}
                            height={140}
                        />
                        <p>{userData?.role}</p>
                    </section>
                    <section className={"relative flex w-full justify-between t-0"}>
                        <div>
                            <h1>{userData?.fullName ? `${userData.fullName}` : "Admin"}</h1>
                            <p className={"pt-3"}>Email: <span>{userData?.email}</span></p>
                            <p>Phone Number: <span>{userData?.phoneNumber}</span></p>
                        </div>

                        <EditProfile />
                    </section>
                </div>
            </main>
        </>

    );
};

export default Page;
