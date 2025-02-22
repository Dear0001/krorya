"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllRecipesQuery } from "@/redux/services/recipe";
import { useGetFoodRecipeByCategoryIdQuery } from "@/redux/services/category";
import { setRecipes, setLoading, setError } from "@/redux/features/recipe/recipesDateSlice";
import { RootState, AppDispatch } from "@/redux/store";
import LoadingFoodCard from "./LoadingFoodCard";
import NotFound from "./NotFound";
import RecipeCard from "@/components/card/RecipeCard";
import { FoodRecipe } from "@/lib/definition";
import {levelBgColors} from "@/lib/constants";

type FoodListProps = {
    activeCategoryId: string;
    query: string;
};

const FoodList: React.FC<FoodListProps> = ({ activeCategoryId, query }) => {
    return <FoodListContent key={activeCategoryId} activeCategoryId={activeCategoryId} query={query} />;
};

const FoodListContent: React.FC<FoodListProps> = ({ activeCategoryId, query }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [visibleCount, setVisibleCount] = useState<number>(12);
    const INITIAL_FETCH_COUNT = 24;

    // ✅ Get recipes from Redux state
    const foods = useSelector((state: RootState) => state.recipe.data);
    const isLoading = useSelector((state: RootState) => state.recipe.loading);
    const error = useSelector((state: RootState) => state.recipe.error);

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
            return allFoodData?.payload ?? [];
        }
        return categoryFoodData?.payload?.foodRecipes ?? [];
    }, [isAllSelected, allFoodData, categoryFoodData]);

    // ✅ Store food data in Redux on successful fetch
    useEffect(() => {
        if (allFoodIsFetching || categoryFoodIsFetching) {
            dispatch(setLoading(true));
            return;
        }

        dispatch(setLoading(false));

        dispatch(setRecipes(foodData));
    }, [foodData, allFoodIsFetching, categoryFoodIsFetching, allFoodError, categoryFoodError, dispatch]);

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
            {isLoading ? (
                    <div className="grid grid-cols-1 place-items-center mt-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <LoadingFoodCard key={index} />
                        ))}
                    </div>
                ) : // Ensure foods is an array before checking length
                (foods ?? []).length === 0 ? (
                    <NotFound props="មិនមានម្ហូបដែលស្វែងរកទេ" />
                ) : (
                    <>
                        <div className="grid grid-cols-1 place-items-center mt-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                            {(foods ?? []).slice(0, visibleCount)?.map((food: FoodRecipe) => (
                                <RecipeCard key={food.id} food={food} />
                            ))}
                        </div>

                        {(foods ?? []).length > visibleCount && (
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
                )
            }
        </>
    );
};

export default FoodList;
