"use client";

import React, { useState } from "react";
import Image from "next/image";
import FoodList from "@/app/(admin)/admin/recipe/components/recipeListUi/FoodList";
import CategoryList from "@/app/(admin)/admin/recipe/components/recipeListUi/CategoryList";
import { useGetAllCategoriesQuery, useGetFoodRecipeByCategoryIdQuery } from "@/redux/services/category";

const ExploreFood: React.FC = () => {
    const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
    const [query, setQuery] = useState<string>("");

    // Fetch categories
    const { data: categoriesData, error, isLoading } = useGetAllCategoriesQuery({ page: 0, pageSize: 10 });

    const categories = categoriesData?.payload || [];

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategoryId(categoryId);
    };

    return (
        <div className="bg-gray-50 flex flex-col gap-4">
            {/* Category Section */}
            <div className="bg-white md:p-6 lg:p-8 p-5 flex flex-col gap-4 rounded-md">
                <ul className="grid gap-2 list-none">
                    <li className="flex items-center">
                        <Image src="/icons/Romdol.svg" alt="Romdol Icon" width={33} height={33} />
                        <span className="font-moulpali text-lg px-5 text-color-2">បញ្ជីមុខម្ហូប</span>
                    </li>
                </ul>

                {/* Category List */}
                {isLoading ? (
                    <p className="text-center">Loading categories...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">Failed to load categories</p>
                ) : (
                    <CategoryList
                        categories={categories}
                        activeCategoryId={activeCategoryId}
                        onCategoryClick={handleCategoryClick}
                    />
                )}
            </div>

            {/* Food List Section */}
            <div className="bg-white p-5 md:p-6 lg:p-8 rounded-md h-full">
                <ul className="grid grid-cols-1 lg:flex lg:justify-between">
                    <li className="flex items-center">
                        <Image src="/icons/Romdol.svg" alt="Romdol Icon" width={33} height={33} />
                        <span className="font-moulpali text-lg px-5 text-color-2">បញ្ជីមុខម្ហូប</span>
                    </li>
                    <li className="pt-5 lg:pt-0">
                        <div className="lg:justify-center flex items-center rounded-md text-sm border gap-4 ps-2">
                            <Image src="/icons/search.svg" alt="Search Icon" width={20} height={20} />
                            <input
                                id="search"
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="border-none focus:outline-none bg-white border-b-gray-300 p-3"
                                placeholder="ស្វែងរក"
                            />
                        </div>
                    </li>
                </ul>

                {/* Food List */}
                <FoodList activeCategoryId={activeCategoryId} query={query} />
            </div>
        </div>
    );
};

export default ExploreFood;
