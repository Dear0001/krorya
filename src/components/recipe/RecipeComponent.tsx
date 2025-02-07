"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CardRecipe from "@/components/recipe/CardRecipe";
import "@/app/globals.css";
import { useGetAllRecipesQuery } from "@/redux/services/recipe";
import { RecipeType } from "@/lib/definition";
import InfiniteScroll from "react-infinite-scroll-component";

const RecipeComponent: React.FC = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [pageSize, setPageSize] = useState<number>(10); // Start with 10 items
    const [hasMore, setHasMore] = useState<boolean>(true);

    // Fetch recipes with pagination
    const { data: recipesData, isLoading } = useGetAllRecipesQuery({ page: 0, pageSize });

    useEffect(() => {
        if (recipesData?.payload?.length) {
            setRecipes((prev) => {
                // Prevent duplicate recipes from being added
                const existingIds = new Set(prev.map((r) => r.id));
                const newRecipes = recipesData.payload.filter((r: any) => !existingIds.has(r.id));
                return [...prev, ...newRecipes];
            });

            // Stop fetching if fewer items are returned than requested
            setHasMore(recipesData.payload.length === pageSize);
        } else {
            setHasMore(false);
        }
    }, [recipesData]);

    // Load more recipes
    const fetchMoreRecipes = () => {
        setPageSize((prevSize) => prevSize + 10); // Increase data size by 10 each time
    };

    return (
        <main className="w-[423px] my-5 h-[699px] px-5 pt-5 bg-white rounded-tl-[15px] rounded-tr-[15px]">
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
                    {recipes.map((recipe) => (
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
