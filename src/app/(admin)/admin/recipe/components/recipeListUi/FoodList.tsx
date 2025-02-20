"use client";
import React, { useState, useEffect, useMemo } from "react";
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
    return <FoodListContent key={activeCategoryId} activeCategoryId={activeCategoryId} query={query} />;
};

const FoodListContent: React.FC<FoodListProps> = ({ activeCategoryId, query }) => {
    const [foods, setFoods] = useState<FoodRecipe[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(12);
    const INITIAL_FETCH_COUNT = 24;

    const isAllSelected = activeCategoryId === "all";
    const categoryId = isAllSelected ? undefined : Number(activeCategoryId);

    if (categoryId !== undefined && isNaN(categoryId)) {
        console.error("Invalid categoryId:", activeCategoryId);
    }

    // ✅ Fetch all recipes when 'all' is selected
    const { data: allFoodData, error: allFoodError, isFetching: allFoodIsFetching } =
        useGetAllRecipesQuery(
            { page: 0, pageSize: INITIAL_FETCH_COUNT },
            { skip: !isAllSelected }
        );

    // ✅ Fetch category-specific recipes
    const { data: categoryFoodData, error: categoryFoodError, isFetching: categoryFoodIsFetching } =
        useGetFoodRecipeByCategoryIdQuery(
            { categoryId: categoryId ?? 0 },
            { skip: isAllSelected }
        );

    // ✅ Extract correct food data
    const foodData: FoodRecipe[] = useMemo(() => {
        if (isAllSelected) {
            return allFoodData?.payload ?? []; // ✅ Extract directly from "payload"
        }
        return categoryFoodData?.payload?.foodRecipes ?? []; // ✅ Extract "foodRecipes" inside "payload"
    }, [isAllSelected, allFoodData, categoryFoodData]);

    const isFetching = isAllSelected ? allFoodIsFetching : categoryFoodIsFetching;
    const error = isAllSelected ? allFoodError : categoryFoodError;

    // ✅ Ensure data updates correctly
    useEffect(() => {
        if (isFetching) return;
        if (!Array.isArray(foodData)) {
            setFoods([]); // Ensure state is always an array
            return;
        }

        setFoods(foodData);
    }, [foodData, isFetching]);

    // ✅ Reset visible items when category changes
    useEffect(() => {
        setVisibleCount(12);
    }, [activeCategoryId]);

    // ✅ Load More Button Handler
    const loadMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    return (
        <>
            {isFetching ? (
                <div className="grid grid-cols-1 place-items-center mt-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <LoadingFoodCard key={index} />
                    ))}
                </div>
            ) : foods.length === 0 ? (
                <NotFound props="មិនមានម្ហូបដែលស្វែងរកទេ" />
            ) : (
                <>
                    <div className="grid grid-cols-1 place-items-center mt-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {foods.slice(0, visibleCount).map((food) => (
                            <RecipeCard key={food.id} food={food} />
                        ))}
                    </div>

                    {foods.length > visibleCount && (
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
