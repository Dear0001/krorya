"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CardRecipe from "@/components/recipe/CardRecipe";
import "@/app/globals.css";
import { useGetAllRecipesQuery } from "@/redux/services/recipe";
import InfiniteScroll from "react-infinite-scroll-component";
import CardRecipeSkeleton from "@/components/recipe/CardRecipeSkeleton";
import { RecipeType } from "@/lib/definition";

const RecipeComponent: React.FC = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Minimum loading state

    // Fetch recipes with pagination
    const { data: recipesData, isLoading: isDataLoading } = useGetAllRecipesQuery({ page, pageSize: 10 });

    useEffect(() => {
        if (recipesData?.payload?.length) {
            setRecipes((prev) => {
                // Prevent duplicates
                const existingIds = new Set(prev.map((r) => r.id));
                const newRecipes = recipesData.payload.filter((r: RecipeType) => !existingIds.has(r.id));
                return [...prev, ...newRecipes];
            });

            // Stop fetching if fewer items are returned than requested
            setHasMore(recipesData.payload.length === 10);
        } else {
            setHasMore(false);
        }
    }, [recipesData]);

    // Ensure a minimum loading time of 2 seconds
    useEffect(() => {
        if (isDataLoading) {
            const timer = setTimeout(() => setIsLoading(false), 2000);
            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
        }
    }, [isDataLoading]);

    // Load more recipes
    const fetchMoreRecipes = () => {
        if (hasMore) setPage((prevPage) => prevPage + 1);
    };

    // Show skeleton while loading
    if (isLoading || isDataLoading) {
        return (
            <main className="w-full my-5 h-[600px] px-5 pt-5 bg-white rounded-tl-[15px] rounded-lg rounded-tr-[15px]">
                <div className="flex gap-3 justify-start items-center text-center">
                    <Image width={33} height={33} src="/assets/dashboard_icon.svg" alt="dashboard_icon" />
                    <h1 className="text-h1">សង្ខេបរូបមន្តអាហារ</h1>
                </div>

                {/* Skeleton Loading State */}
                <div className="mt-4 h-[calc(100%-70px)] overflow-y-scroll no-scrollbar">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CardRecipeSkeleton key={index} />
                    ))}
                </div>
            </main>
        );
    }

    // ✅ Show recipes when loaded
    return (
        <main className="w-full my-5 h-[600px] px-5 pt-5 bg-white rounded-tl-[15px] rounded-lg rounded-tr-[15px]">
            <div className="flex gap-3 justify-start items-center text-center">
                <Image width={33} height={33} src="/assets/dashboard_icon.svg" alt="dashboard_icon" />
                <h1 className="text-h1">សង្ខេបរូបមន្តអាហារ</h1>
            </div>

            {/* Infinite Scrolling Container */}
            <div id="scrollableDiv" className="mt-4 h-[calc(100%-70px)] overflow-y-scroll no-scrollbar">
                <InfiniteScroll
                    dataLength={recipes.length}
                    next={fetchMoreRecipes}
                    hasMore={hasMore}
                    loader={
                        <div className="flex justify-center py-3">
                            <span className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-transparent rounded-full"></span>
                        </div>
                    }
                    scrollableTarget="scrollableDiv"
                >
                    {recipes?.map((recipe) => (
                        <div key={recipe.id} className="py-1">
                            <CardRecipe recipe={recipe} isLoading={isLoading} />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </main>
    );
};

export default RecipeComponent;
