"use client";
import Image from "next/image";
import "@/app/globals.css";
import { useGetRecipePopularQuery } from "@/redux/services/recipe";
import CardRecipePopular from "@/components/card/CardRecipePopular";
import LoadingFoodCard from "@/app/(user)/recipe/components/recipeListUi/LoadingFoodCard";
import React from "react";

const RecipeComponent = () => {
    // Fetch popular recipes
    const { data, isLoading } = useGetRecipePopularQuery();
    const recipes = data?.payload?.popularRecipes || [];

    // Sort recipes by averageRating in descending order
    const sortedRecipes = [...recipes].sort((a, b) => {
        const ratingA = a.averageRating || 0;
        const ratingB = b.averageRating || 0;
        return ratingB - ratingA;
    });

    return (
        <main className="w-full my-5 px-5 pt-5 bg-white rounded-tl-[15px] rounded-lg rounded-tr-[15px]">
            <div className="flex gap-3 justify-start items-center text-center">
                <Image width={33} height={33} src="/assets/dashboard_icon.svg" alt="dashboard_icon" />
                <h1 className="py-5 text-[22px] md:text-h2 sm:text-h3 lg:text-h1 xl:text-h1">រូបមន្តអាហារ ពេញនិយម</h1>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className="mt-2 h-[calc(100%-70px)] overflow-x-auto no-scrollbar whitespace-nowrap flex gap-4 lg:gap-10 px-2">
                {/* Display 5 loading placeholders while fetching */}
                {isLoading && Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="w-[150px] sm:w-[200px] lg:w-[200px] flex-shrink-0 pb-5">
                        <LoadingFoodCard />
                    </div>
                ))}

                {/* Display SORTED recipes when loaded */}
                {sortedRecipes.map((recipe) => (
                    <div key={recipe.id} className="w-[150px] sm:w-[200px] lg:w-[200px] flex-shrink-0 pb-5">
                        <CardRecipePopular recipe={recipe} />
                    </div>
                ))}
            </div>
        </main>
    );
};

export default RecipeComponent;