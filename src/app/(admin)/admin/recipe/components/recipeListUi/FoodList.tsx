"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useGetAllRecipesQuery } from "@/redux/services/recipe";
import { useGetFoodRecipeByCategoryIdQuery } from "@/redux/services/category";
import LoadingFoodCard from "./LoadingFoodCard";
import NotFound from "./NotFound";
import RecipeCard from "@/components/card/RecipeCard";
import { FoodRecipe } from "@/lib/definition";
import { useSearchFoodByNameQuery } from "@/redux/services/food";
import { INITIAL_FETCH_COUNT } from "@/lib/constants";

type FoodListProps = {
    activeCategoryId: string;
    query: string;
};

const FoodList: React.FC<FoodListProps> = ({ activeCategoryId, query }) => {
    return <FoodListContent key={activeCategoryId} activeCategoryId={activeCategoryId} query={query} />;
};

const FoodListContent: React.FC<FoodListProps> = ({ activeCategoryId, query }) => {
    const [visibleCount, setVisibleCount] = useState<number>(12);

    const isAllSelected = activeCategoryId === "all";
    const categoryId = isAllSelected ? undefined : Number(activeCategoryId);

    // Search food by name
    const { data: searchFoodData, isFetching: searchFoodIsFetching } = useSearchFoodByNameQuery(
        { foodName: query },
        { skip: query.length < 3 }
    );

    // Fetch all recipes directly
    const { data: allFoodData, isFetching: allFoodIsFetching } = useGetAllRecipesQuery(
        { page: 0, pageSize: INITIAL_FETCH_COUNT },
        { skip: !isAllSelected || query.length > 0 }
    );

    // Fetch category-specific recipes
    const { data: categoryFoodData, isFetching: categoryFoodIsFetching } = useGetFoodRecipeByCategoryIdQuery(
        { categoryId: categoryId ?? 0 },
        { skip: isAllSelected || query.length > 0 }
    );

    // Extract correct food data
    const foodData: FoodRecipe[] = useMemo(() => {
        if (query.length > 0) {
            return searchFoodData?.payload ?? [];
        }
        if (isAllSelected) {
            return allFoodData?.payload ?? [];
        }
        return categoryFoodData?.payload?.foodRecipes ?? [];
    }, [query, searchFoodData, isAllSelected, allFoodData, categoryFoodData]);

    // Reset visible items when category changes or new search
    useEffect(() => {
        setVisibleCount(12);
    }, [activeCategoryId, query]);

    // Load More Button Handler
    const loadMore = () => {
        setVisibleCount((prev) => prev + 12);
    };

    // Show skeleton if data is still loading
    if (allFoodIsFetching || categoryFoodIsFetching || searchFoodIsFetching) {
        return (
            <div className="grid grid-cols-1 place-items-center mt-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                    <LoadingFoodCard key={index} />
                ))}
            </div>
        );
    }

    // ✅ Show food data when loaded
    return (
        <>
            {(foodData ?? []).length === 0 ? (
                <NotFound props="មិនមានម្ហូបដែលស្វែងរកទេ" />
            ) : (
                <>
                    <div className="grid grid-cols-1 place-items-center mt-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {(foodData ?? []).slice(0, visibleCount)?.map((food: FoodRecipe) => (
                            <RecipeCard key={food.id} food={food} />
                        ))}
                    </div>

                    {(foodData ?? []).length > visibleCount && (
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
