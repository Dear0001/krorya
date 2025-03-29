"use client";

import React, { useEffect, useMemo, useState } from "react";
import {  useGetRecipeByNameQuery } from "@/redux/services/guest";
import { useGetAllRecipesQuery } from "@/redux/services/recipe";
import { useGetFoodRecipeByCategoryIdQuery } from "@/redux/services/category";
import LoadingFoodCard from "./LoadingFoodCard";
import NotFound from "./NotFound";
import { FoodRecipe } from "@/lib/definition";
import { INITIAL_FETCH_COUNT } from "@/lib/constants";
import RecipeCard from "@/components/card/RecipeCard";
import style from "@/app/style/grid.module.css";

type FoodListProps = {
    activeCategoryId: string;
    query: string;
};

const FoodList: React.FC<FoodListProps> = ({ activeCategoryId, query }) => {
    return <FoodListContent key={activeCategoryId} activeCategoryId={activeCategoryId} query={query} />;
};

const FoodListContent: React.FC<FoodListProps> = ({ activeCategoryId, query }) => {
    const [visibleCount, setVisibleCount] = useState<number>(15);

    const isAllSelected = activeCategoryId === "all";
    const categoryId = isAllSelected ? undefined : Number(activeCategoryId);

    // Fetch recipes by name
    const { data: searchData, isFetching: isSearching } = useGetRecipeByNameQuery(
        { name: query },
        { skip: query.length < 1 }
    );

    // Fetch all recipes when 'all' is selected
    const { data: allFoodData, isFetching: allFoodIsFetching } = useGetAllRecipesQuery(
        { page: 0, pageSize: INITIAL_FETCH_COUNT },
        { skip: !isAllSelected || query.length >= 1 }
    );

    // Fetch category-specific recipes
    const { data: categoryFoodData, isFetching: categoryFoodIsFetching } = useGetFoodRecipeByCategoryIdQuery(
        { categoryId: categoryId ?? 0 },
        { skip: isAllSelected || query.length >= 1 }
    );

    // Extract correct food data
    const foodData: FoodRecipe[] = useMemo(() => {
        if (query.length >= 1) {
            // Use search results if query exists
            return searchData?.payload?.foodRecipes || [];
        }
        if (isAllSelected) {
            // Use all recipes if "all" category is selected
            return allFoodData?.payload || [];
        }
        // Use category-specific recipes
        return categoryFoodData?.payload?.foodRecipes || [];
    }, [query, searchData, isAllSelected, allFoodData, categoryFoodData]);

    // Reset visible items when category changes or new search
    useEffect(() => {
        setVisibleCount(15);
    }, [activeCategoryId, query]);

    // Load More Button Handler
    const loadMore = () => {
        setVisibleCount((prev) => prev + 15);
    };

    // Show skeleton if data is still loading
    if (isSearching || allFoodIsFetching || categoryFoodIsFetching) {
        return (
            <div className={style.responsive}>
                {Array.from({ length: 15 }).map((_, index) => (
                    <LoadingFoodCard key={index} />
                ))}
            </div>
        );
    }

    // ✅ Show food data when loaded
    return (
        <>
            {foodData.length === 0 ? (
                <div className={"grid place-content-center"}>
                    <NotFound props="មិនមានម្ហូបដែលស្វែងរកទេ" />
                </div>
            ) : (
                <div>
                    <div className="w-full">
                        {/* Responsive Grid Layout */}
                        <div className={style.responsive}>
                            {foodData.slice(0, visibleCount).map((food) => (
                                <RecipeCard key={food.id} food={food} />
                            ))}
                        </div>
                    </div>

                    {foodData.length > visibleCount && (
                        <div className="text-center mt-10">
                            <button
                                className={style.btns}
                                onClick={loadMore}
                            >
                                បន្ថែម
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default FoodList;