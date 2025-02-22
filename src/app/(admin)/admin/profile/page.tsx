"use client";
import Image from "next/image";
import { useGetUserProfileQuery } from "@/redux/services/user";
import EditProfile from "@/components/profile/EditProfile";
import React from "react";
import {getImageUrl} from "@/lib/constants";

const Page = () => {
    // Get user profile data using RTK Query
    const { data: userProfile } = useGetUserProfileQuery();
    const userData = userProfile?.payload;
    console.log("User Data:", userData);



    // Check if the user profile data is loaded and if there's a profile image
    const photoFileName = userData?.profileImage;
    // Use the getImageUrl function to construct the full image URL
    const imageUrl = getImageUrl(photoFileName);

    return (
        <>
           <main className={"mx-auto p-5 bg-[#FFFFFF] w-full rounded-lg"}>
                <div className={"flex gap-5 flex-col"}>
                    <section className={"flex justify-between"}>
                        {/* Profile Image - Always Rounded */}
                        <div className={"flex gap-5 text-start justify-center items-center"}>
                            <Image
                                className="w-[140px] h-[140px] rounded-full object-cover border-2 border-gray-300"
                                src={
                                    imageUrl && imageUrl.startsWith("http")
                                        ? imageUrl
                                        : "/assets/images/profile.png"
                                }
                                alt="profile"
                                width={140}
                                height={140}
                            />
                            <div>
                                <h1 className={"text-h3 font-bold py-3"}>{userData?.fullName ? `${userData.fullName}` : "Admin"}</h1>
                                {/* Special Styling or Badge for Admin */}
                                {userData?.role === "ROLE_ADMIN" && (
                                    <span className="mt-1 px-5 py-1 text-2xl text-white bg-red-500 rounded-full font-bold">
                                ADMIN
                            </span>
                                )}
                            </div>

                        </div>

                        <EditProfile />

                    </section>
                    <section className={"relative flex w-full justify-between t-0"}>
                        <div>
                            <p className={"pt-3 font-bold"}>Email: <span className={"text-red-500"}>{userData?.email}</span></p>
                            <p className={"font-bold"}>Phone Number: <span className={"text-red-500"}>{userData?.phoneNumber}</span></p>
                        </div>
                    </section>
                </div>
            </main>
        </>

    );
};

export default Page;
