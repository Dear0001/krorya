"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import { FoodRecipe } from "@/lib/definition";
import {convertRomanToKhmer, getImageUrl} from "@/lib/constants";
import {favoriteApi, useAddFavoriteMutation, useRemoveFavoriteMutation} from "@/redux/services/favorite";
import {useGetUserProfileQuery} from "@/redux/services/user";
import {useAppDispatch} from "@/redux/hooks";

type CardRecipePopularProps = {
    recipe: FoodRecipe;
};

export default function FavCard({ recipe }: CardRecipePopularProps) {
    const [favorite, setFavorite] = useState(recipe?.isFavorite);
    const [addFavorite] = useAddFavoriteMutation();
    const [removeFavorite] = useRemoveFavoriteMutation();

    const dispatch = useAppDispatch();
    useEffect(() => {
        setFavorite(recipe?.isFavorite);
    }, [recipe?.isFavorite]);

    const handleFavorite = async () => {
        try {
            if (favorite) {
                await removeFavorite({ id: recipe.id }).unwrap();
                setFavorite(false);
            } else {
                await addFavorite({ id: recipe.id }).unwrap();
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

    const photoFileName = recipe?.photo?.length > 0 ? recipe.photo[0].photo : "/assets/default-food.jpg";
    const imageUrl = getImageUrl(photoFileName) || "/assets/default-food.jpg";
    const averageRating = recipe.averageRating || 0;
    const fillPercentage = (averageRating / 5) * 100;

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
    const level = (recipe?.level as DifficultyLevel) || "Easy";
    const { bg: levelBg, text: levelText } = levelStyles[level];

    return (
        <div className="card shadow-card p-2 rounded-[20px] overflow-hidden w-full hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="w-full h-32 sm:h-40 relative">
                <Link href={`/recipe/${recipe.id}`}>
                    <div
                        className="w-full h-full bg-cover bg-center rounded-[17px]"
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

            </div>

            <div className="card-body p-2 bg-white">
                <div className="card-title text-slate-700 text-[14px] sm:text-[16px] py-1 truncate">
                    {recipe?.name || "មិនមានទេ"}
                </div>

                <div className="flex items-center gap-1 mt-1">
                    <div className="relative w-4 h-4">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FFD233"
                            strokeWidth="1.5"
                            className="absolute top-0 left-0"
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="#FFD233"
                            stroke="#FFD233"
                            strokeWidth="1.5"
                            className="absolute top-0 left-0"
                            style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
                        >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>
                    <span className="text-xs text-gray-600 ml-1">
                        ({convertRomanToKhmer(averageRating?.toFixed(1) || "0")})
                    </span>
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