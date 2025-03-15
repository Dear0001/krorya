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

    return (
        <div className="card shadow-md p-2 rounded-lg overflow-hidden w-full">
            <div className="w-full h-32 sm:h-40">
                <Link href={`/admin/recipe/${recipe.id}`}>
                    <div
                        className="w-full h-full bg-cover bg-center rounded-md"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    >
                    </div>
                </Link>
            </div>

            <div className="card-body p-2 bg-white">
                <div className="card-title text-slate-700 text-[14px] sm:text-[16px] py-1 truncate">{recipe?.name}</div>
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
                    <span className="text-xs">{convertRomanToKhmer(recipe?.durationInMinutes.toString())} នាទី</span>
                </div>
                <div className="card-actions flex flex-row items-center justify-end">
                    <div className={`badge rounded-md border-none py-[1px] px-2 text-sm ${levelClass}`}>
                        {recipe?.level}
                    </div>
                </div>
            </div>
        </div>
    );
}