"use client";

import React, { useState, useEffect } from "react";
import { useGetAllRecipesQuery } from "@/redux/services/recipe";
import { useGetFoodRecipeByCategoryIdQuery } from "@/redux/services/category";
import LoadingFoodCard from "./LoadingFoodCard";
import NotFound from "./NotFound";
import RecipeCard from "@/components/card/RecipeCard";
import { FoodRecipe } from "@/lib/definition";

type FoodListProps = {
    activeCategoryId: string;
    query: string;
};

const FoodList: React.FC<FoodListProps> = ({ activeCategoryId, query }) => {
    const [foods, setFoods] = useState<FoodRecipe[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const isAllSelected = activeCategoryId === "all";

    // ✅ Fetch all recipes with pagination
    const { data: allFoodData, error: allFoodError, isFetching: allFoodIsFetching } =
        useGetAllRecipesQuery({ page, pageSize: 12 }, { skip: !isAllSelected });

    // ✅ Fetch all food recipes for a specific category (NO pagination)
    const { data: categoryFoodData, error: categoryFoodError, isFetching: categoryFoodIsFetching } =
        useGetFoodRecipeByCategoryIdQuery(
            { categoryId: Number(activeCategoryId) }, // No pagination params
            { skip: isAllSelected }
        );

    const foodData = isAllSelected ? allFoodData : categoryFoodData;
    const isFetching = isAllSelected ? allFoodIsFetching : categoryFoodIsFetching;
    const error = isAllSelected ? allFoodError : categoryFoodError;

    // ✅ Store fetched food data in state
    useEffect(() => {
        if (foodData?.payload && Array.isArray(foodData.payload)) {
            setFoods(foodData.payload);

            // ✅ Pagination only applies to "all" categories
            if (isAllSelected && foodData.paginationMeta) {
                setHasMore(foodData.paginationMeta.currentPage < foodData.paginationMeta.totalPages - 1);
            } else {
                setHasMore(false); // No pagination for category-specific data
            }
        }
    }, [foodData]);

    // ✅ Reset when category changes
    useEffect(() => {
        setFoods([]);
        setPage(0);
        setHasMore(isAllSelected); // Only allow pagination for "all"
    }, [activeCategoryId]);

    const loadMore = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <>
            {isFetching ? (
                <div className="grid grid-cols-1 place-items-center mt-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <LoadingFoodCard key={index} />
                    ))}
                </div>
            ) : foods.length === 0 ? (
                <NotFound props="មិនមានម្ហូបដែលស្វែងរកទេ" />
            ) : (
                <>
                    <div className="grid grid-cols-1 place-items-center mt-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {foods.map((food) => (
                            <RecipeCard key={food.id} food={food} />
                        ))}
                    </div>

                    {hasMore && (
                        <div className="text-center mt-10">
                            <button
                                className="px-3 py-2 w-full md:w-28 rounded-lg border border-[#d7ad45] bg-white text-[#d7ad45] font-kantumruy text-sm leading-6"
                                onClick={loadMore}
                            >
                                បន្ថែម
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default FoodList;
