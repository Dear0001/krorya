"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FoodRecipe } from "@/lib/definition";
import { convertRomanToKhmer, getImageUrl, levelBgColors } from "@/lib/constants";

type CardRecipePopularProps = {
    recipe: FoodRecipe;
};

export default function CardRecipePopular({ recipe }: CardRecipePopularProps) {
    const [minus, setMinus] = useState(false);

    // Get recipe image or default
    const photoFileName = recipe?.photo?.length > 0 ? recipe.photo[0].photo : "/assets/default-food.jpg";
    const imageUrl = getImageUrl(photoFileName) || "/assets/default-food.jpg";

    // Handle `minus` toggle
    const handleChangeMinus = () => {
        setMinus((prev) => !prev);
    };

    const bgColor = levelBgColors;
    // Get the corresponding background color class
    const levelClass = bgColor[recipe?.level] || "bg-gray-100 text-gray-800";

    // Calculate the fill percentage for the star based on averageRating
    const averageRating = recipe.averageRating || 0; // Default to 0 if averageRating is null
    const fillPercentage = (averageRating / 5) * 100; // Convert rating to percentage

    return (
        <div className="card shadow-card p-2 rounded-[20px] overflow-hidden w-full hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
            <div className="w-full h-32 sm:h-40">
                <Link href={`/admin/recipe/${recipe.id}`}>
                    <div
                        className="w-full h-full bg-cover bg-center rounded-[17px]"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    >
                    </div>
                </Link>
            </div>

            <div className="card-body p-2 bg-white">
                <div className="card-title text-slate-700 text-[14px] sm:text-[16px] py-1 truncate">{recipe?.name || "មិនមានទេ"}</div>

                {/* Rating Section - One Star with Dynamic Fill */}
                <div className="flex items-center gap-1 mt-1">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFD233"
                        strokeWidth="1.5"
                    >
                        {/* Star Outline */}
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />

                        {/* Star Fill (Clipped to Percentage) */}
                        <defs>
                            <linearGradient id="grad">
                                <stop offset={`${(averageRating / 5) * 100}%`} stopColor="#FFD233" />
                                <stop offset={`${(averageRating / 5) * 100}%`} stopColor="transparent" />
                            </linearGradient>
                        </defs>

                        <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill="url(#grad)"
                        />
                    </svg>

                    {/* Display Average Rating */}
                    <span className="text-xs text-gray-600 ml-1">
                         ({convertRomanToKhmer(averageRating?.toFixed(1) || "0")})
                     </span>
                </div>

                <div className="card-actions flex flex-row items-center justify-end">
                    <div className={`badge rounded-[8px] border-none py-[1px] px-2 text-[13px] ${levelClass}`}>
                        {recipe?.level}
                    </div>
                </div>
            </div>
        </div>
    );
}