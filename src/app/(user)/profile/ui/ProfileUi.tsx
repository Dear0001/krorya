"use client"
import {useGetUserProfileQuery} from "@/redux/services/user";
import {getImageUrl} from "@/lib/constants";
import {ToastContainer} from "react-toastify";
import EditProfile from "@/components/profile/EditProfile";
import React from "react";

const ProfileUi = () => {
    const { data: userProfile } = useGetUserProfileQuery();

    // Check if the user profile data is loaded and if there's a profile image
    const photoFileName = userProfile?.payload?.profileImage;
    // Use the getImageUrl function to construct the full image URL
    const imageUrl = getImageUrl(photoFileName);

    return (
        <div className={"mx-auto p-5 bg-[#FFFFFF] w-full rounded-lg"}>
            <ToastContainer/>
            <div className={"flex gap-5 flex-col"}>
                <section className={"flex justify-between"}>
                    {/* Profile Image - Always Rounded */}
                    <div className={"flex gap-5 text-start justify-center items-center"}>
                        <div
                            className="w-[140px] h-[140px] rounded-full object-cover border-2 border-gray-300"
                            style={{
                                backgroundImage: `url(${
                                    imageUrl ? imageUrl : "/man.png"
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        ></div>

                        <div>
                            <h1 className={"text-h3 font-bold py-3"}>{userProfile?.payload?.fullName ? `${userProfile?.payload?.fullName}` : "Admin"}</h1>
                            {/* Special Styling or Badge for Admin */}
                            {userProfile?.payload?.role === "ROLE_ADMIN" && (
                                <span className="mt-1 px-5 py-1 text-2xl text-white bg-red-500 rounded-full font-bold">
                                ADMIN
                            </span>
                            )}
                        </div>

                    </div>
                    <EditProfile userData={userProfile?.payload}/>
                </section>
                <section className={"relative flex w-full justify-between t-0"}>
                    <div>
                        <p className={"pt-3 font-bold"}>Email: <span className={"text-red-500"}>{userProfile?.payload?.email}</span></p>
                        <p className={"font-bold"}>Phone Number: <span className={"text-red-500"}>{userProfile?.payload?.phoneNumber}</span></p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProfileUi;
