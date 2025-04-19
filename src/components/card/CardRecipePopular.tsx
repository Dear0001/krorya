"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import { FoodRecipe} from "@/lib/definition";
import {convertRomanToKhmer, getImageUrl} from "@/lib/constants";
import {useAppDispatch} from "@/redux/hooks";

type CardRecipePopularProps = {
    recipe: FoodRecipe;
};

export default function CardRecipePopular({ recipe }: CardRecipePopularProps) {
    const [, setFavorite] = useState(recipe?.isFavorite);
    useAppDispatch();
    useEffect(() => {
        setFavorite(recipe?.isFavorite);
    }, [recipe?.isFavorite]);

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

    // Function to render stars based on rating
    const renderStars = () => {
        // If we have multiple full stars (rating >= 1.0), show them
        if (averageRating >= 1.0) {
            const fullStars = Math.floor(averageRating);
            const hasHalfStar = averageRating % 1 >= 0.5;

            return (
                <div className="flex items-center">
                    {[...Array(fullStars)].map((_, i) => (
                        <svg key={`full-${i}`} width="16" height="16" viewBox="0 0 24 24" fill="#FFD233" stroke="#FFD233" strokeWidth="1.5">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    ))}
                    {hasHalfStar && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD233" strokeWidth="1.5">
                            <defs>
                                <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                                    <stop offset="50%" stopColor="#FFD233" />
                                    <stop offset="50%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half-star)" />
                        </svg>
                    )}
                </div>
            );
        }

        // For ratings less than 1.0, show a single partially filled star
        return (
            <div className="relative w-4 h-4">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFD233" strokeWidth="1.5" className="absolute top-0 left-0">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD233" stroke="#FFD233" strokeWidth="1.5" className="absolute top-0 left-0" style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            </div>
        );
    };

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
                        <span className={"font-bold"}>
                            {convertRomanToKhmer(averageRating?.toFixed(1) || "0")}
                            {" "}
                        </span>

                        ({convertRomanToKhmer(recipe?.totalRaters?.toString() || "0")})
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