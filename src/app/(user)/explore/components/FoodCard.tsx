"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import { FoodRecipe } from "@/lib/definition";
import {convertRomanToKhmer, getImageUrl} from "@/lib/constants";
import {favoriteApi, useAddFavoriteMutation, useRemoveFavoriteMutation} from "@/redux/services/favorite";
import {useGetUserProfileQuery} from "@/redux/services/user";
import {useAppDispatch} from "@/redux/hooks";

type CardFoodProps = {
    food: FoodRecipe;
};

export default function FoodCard({ food }: CardFoodProps) {
    const [favorite, setFavorite] = useState(food?.isFavorite);
    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useRemoveFavoriteMutation();

    const dispatch = useAppDispatch();
    useEffect(() => {
        setFavorite(food?.isFavorite);
    }, [food?.isFavorite]);

    const handleFavorite = async () => {
        try {
            if (favorite) {
                await removeFavorite({ id: food.id }).unwrap();
                setFavorite(false);
            } else {
                await addFavorite({ id: food.id }).unwrap();
                setFavorite(true);
            }
            // Invalidate the favorite list query
            dispatch(favoriteApi.util.invalidateTags(['recipe']));
        } catch (error) {
            console.error("Error updating favorite:", error);
        }
    };

    // get user profile
    const { data: users } = useGetUserProfileQuery();
    const isAdmin = users?.payload?.role == "ROLE_ADMIN";


    // Get food image or default
    const photoFileName = food?.photo?.length > 0 ? food.photo[0].photo : "/assets/default-food.jpg";
    const imageUrl = getImageUrl(photoFileName) || "/assets/default-food.jpg";

    // Handle `minus` toggle
    type DifficultyLevel = "Easy" | "Medium" | "Hard";

    const levelStyles: Record<DifficultyLevel, { bg: string; text: string }> = {
        Easy: {
            bg: "bg-[#fff9eb]",
            text: "text-primary",
        },
        Medium: {
            bg: "bg-[#f5f3ff]",
            text: "text-[#713aed]",
        },
        Hard: {
            bg: "bg-[#fef2f3]",
            text: "text-[#ff2323]",
        },
    };

    // In your component, ensure the level is typed
    const level = (food?.level as DifficultyLevel) || "Easy";
    const { bg: levelBg, text: levelText } = levelStyles[level];

    return (
        <div className="card p-2 shadow-card rounded-[20px] mx-0 w-full sm:w-48 md:w-43 lg:w-[13.5rem] hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
            {/* Image Section */}
            <figure className="relative w-full h-40">
                <Link href={`/explore/${food.id}`}>
                    <div
                        className="w-full h-full bg-cover bg-center rounded-[18px]"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    >
                    </div>
                </Link>
                { isAdmin ? (
                    ""
                ): (
                    <>
                        <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                                onClick={handleFavorite}
                                className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                            >
                                {favorite ? (
                                    <svg width="16" height="16" viewBox="0 0 18 16" fill="#D7AD45" stroke="#D7AD45" strokeWidth="1.5">
                                        <path d="M8.45135 2.57069L9 3.15934L9.54865 2.57068C11.3843 0.601168 13.2916 0.439002 14.6985 1.10313C16.1598 1.79292 17.25 3.44662 17.25 5.43913C17.25 7.47271 16.4446 9.03777 15.2916 10.3785C14.3397 11.4854 13.1884 12.4021 12.06 13.3006C11.7913 13.5145 11.524 13.7273 11.261 13.9414C10.7867 14.3275 10.3684 14.6623 9.96682 14.9047C9.56435 15.1475 9.25342 15.25 9 15.25C8.74657 15.25 8.43565 15.1475 8.03319 14.9047C7.63158 14.6623 7.21329 14.3275 6.73906 13.9414C6.47602 13.7273 6.20868 13.5144 5.94004 13.3006C4.81163 12.4021 3.66029 11.4854 2.7084 10.3785C1.5554 9.03777 0.75 7.47271 0.75 5.43913C0.75 3.44662 1.84018 1.79292 3.30146 1.10313C4.70838 0.439003 6.61569 0.601167 8.45135 2.57069Z" />
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 18 16" fill="white" stroke="black" strokeWidth="1.5">
                                        <path d="M8.45135 2.57069L9 3.15934L9.54865 2.57068C11.3843 0.601168 13.2916 0.439002 14.6985 1.10313C16.1598 1.79292 17.25 3.44662 17.25 5.43913C17.25 7.47271 16.4446 9.03777 15.2916 10.3785C14.3397 11.4854 13.1884 12.4021 12.06 13.3006C11.7913 13.5145 11.524 13.7273 11.261 13.9414C10.7867 14.3275 10.3684 14.6623 9.96682 14.9047C9.56435 15.1475 9.25342 15.25 9 15.25C8.74657 15.25 8.43565 15.1475 8.03319 14.9047C7.63158 14.6623 7.21329 14.3275 6.73906 13.9414C6.47602 13.7273 6.20868 13.5144 5.94004 13.3006C4.81163 12.4021 3.66029 11.4854 2.7084 10.3785C1.5554 9.03777 0.75 7.47271 0.75 5.43913C0.75 3.44662 1.84018 1.79292 3.30146 1.10313C4.70838 0.439003 6.61569 0.601167 8.45135 2.57069Z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </>
                )}
            </figure>

            {/* Card Body Section */}
            <div className="card-body p-2 bg-white">
                <div className="card-title text-slate-700 text-lg sm:text-xl truncate">{food?.name}</div>
                <div className="flex items-center gap-2">
                    <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.5 0C5.64641 0 4.80117 0.168127 4.01256 0.494783C3.22394 0.821439 2.50739 1.30023 1.90381 1.90381C0.684819 3.12279 0 4.77609 0 6.5C0 8.22391 0.684819 9.87721 1.90381 11.0962C2.50739 11.6998 3.22394 12.1786 4.01256 12.5052C4.80117 12.8319 5.64641 13 6.5 13C8.22391 13 9.87721 12.3152 11.0962 11.0962C12.3152 9.87721 13 8.22391 13 6.5C13 5.64641 12.8319 4.80117 12.5052 4.01256C12.1786 3.22394 11.6998 2.50739 11.0962 1.90381C10.4926 1.30023 9.77606 0.821439 8.98744 0.494783C8.19883 0.168127 7.35359 0 6.5 0ZM9.23 9.23L5.85 7.15V3.25H6.825V6.63L9.75 8.385L9.23 9.23Z"
                            fill="#FFD233"
                        />
                    </svg>
                    <span className="text-xs">{convertRomanToKhmer(food?.durationInMinutes.toString())} នាទី</span>
                </div>
                <div className="card-actions flex flex-row items-center justify-end">
                    <div
                        className={`badge rounded-[8px] border-none py-[1px] px-2 text-[13px] font-medium ${levelBg} ${levelText}`}
                    >
                        {level}
                    </div>
                </div>
            </div>
        </div>
    );
}