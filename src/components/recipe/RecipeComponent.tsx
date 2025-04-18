"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CardRecipe from "@/components/recipe/CardRecipe";
import "@/app/globals.css";
import { useGetAllRecipesQuery } from "@/redux/services/recipe";
import InfiniteScroll from "react-infinite-scroll-component";
import CardRecipeSkeleton from "@/components/recipe/CardRecipeSkeleton";
import { RecipeType } from "@/lib/definition";
import NotFound from "@/app/(user)/recipe/components/recipeListUi/NotFound";

const RecipeComponent: React.FC = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch recipes with pagination
    const { data: recipesData, isLoading: isDataLoading } = useGetAllRecipesQuery({ page, pageSize: 10 });
    console.log("sdsa",isDataLoading)

    useEffect(() => {
        if (recipesData?.payload?.length) {
            setRecipes((prev) => {
                // If page is 0, replace all recipes (for refresh)
                if (page === 0) {
                    return [...recipesData.payload];
                }
                // Otherwise append new recipes
                const existingIds = new Set(prev.map((r) => r.id));
                const newRecipes = recipesData.payload.filter((r: RecipeType) => !existingIds.has(r.id));
                return [...prev, ...newRecipes];
            });

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
    if (isDataLoading) {
        return (
            <main className="w-full my-5  h-[630px] px-5 pt-5 bg-white rounded-tl-[15px] rounded-lg rounded-tr-[15px]">
                <div className="flex gap-3 justify-start items-center text-center">
                    <Image width={33} height={33} src="/assets/dashboard_icon.svg" alt="dashboard_icon" />
                    <h1 className="mt-2 text-[22px] md:text-h2 sm:text-h3 lg:text-h1 xl:text-h1">សង្ខេបរូបមន្តអាហារ</h1>
                </div>

                {/* Skeleton Loading State */}
                <div className="my-3 h-[calc(100%-70px)] overflow-y-scroll no-scrollbar">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CardRecipeSkeleton key={index} />
                    ))}
                </div>
            </main>
        );
    }

    // Show NotFound component when there are no recipes
    if (!isDataLoading && recipes.length === 0) {
        return (
            <div className="w-full my-5 h-[630px] px-5 pt-5 bg-white rounded-tl-[15px] rounded-lg rounded-tr-[15px]">
                <div className="flex flex-col h-full">
                    {/* Header remains at the top */}
                    <div className="flex gap-3 justify-start items-center text-center">
                        <Image width={33} height={33} src="/assets/dashboard_icon.svg" alt="dashboard_icon" />
                        <h1 className="mt-2 text-[22px] md:text-h2 sm:text-h3 lg:text-h1 xl:text-h1">សង្ខេបរូបមន្តអាហារ</h1>
                    </div>

                    {/* Centered content area */}
                    <div className="flex-1 flex items-center justify-center">
                        <NotFound props="មិនមានម្ហូបទេ" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main className="w-full my-5  h-[630px] px-5 pt-5 bg-white rounded-tl-[15px] rounded-lg rounded-tr-[15px]">
            <div className="flex gap-3 justify-start items-center text-center">
                <Image width={33} height={33} src="/assets/dashboard_icon.svg" alt="dashboard_icon" />
                <h1 className="mt-2 text-[22px] md:text-h2 sm:text-h3 lg:text-h1 xl:text-h1">សង្ខេបរូបមន្តអាហារ</h1>
            </div>

            {/* Infinite Scrolling Container */}
            <div id="scrollableDiv" className="my-3 h-[calc(100%-70px)] overflow-y-scroll no-scrollbar">
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
                            <CardRecipe
                                recipe={recipe}
                                isLoading={isLoading}
                            />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </main>
    );
};

export default RecipeComponent;
