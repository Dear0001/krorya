"use client";

import React, { useState } from "react";
import Image from "next/image";
import FoodList from "@/app/(user)/explore/components/recipeListUi/FoodList";
import CategoryList from "@/app/(user)/recipe/components/recipeListUi/CategoryList";
import { useGetAllCategoriesQuery } from "@/redux/services/category";
import CategorySkeleton from "@/app/(user)/recipe/components/CategorySkeleton";
import { ToastContainer } from "react-toastify";
import {useGetUserProfileQuery} from "@/redux/services/user";

const ExploreFood: React.FC = () => {
    const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
    const [query, setQuery] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data: users } = useGetUserProfileQuery();
    const isAdmin = users?.payload?.role == "ROLE_ADMIN";

    // Fetch categories
    const { data: categoriesData, error, isLoading } = useGetAllCategoriesQuery({ page: 0, pageSize: 10 });

    const categories = categoriesData?.payload || [];

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategoryId(categoryId);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <main className="flex flex-col">
            <ToastContainer />
            {/* Category Section */}
            <section className="bg-white md:p-6 mb-5 flex flex-col gap-5 p-2 rounded-lg">
                <ul className="grid gap-2 list-none">
                    <li className="flex items-center">
                        <Image src="/icons/Romdol.svg" alt="Romdol Icon" width={33} height={33} />
                        <span className="font-moulpali text-lg px-5 text-color-2">ប្រភេទអាហារ</span>
                    </li>
                </ul>

                {/* Category List */}
                {isLoading ? (
                    <CategorySkeleton />
                ) : error ? (
                    <p className="text-red-500 text-center">Failed to load categories</p>
                ) : (
                    <CategoryList
                        categories={categories}
                        activeCategoryId={activeCategoryId}
                        onCategoryClick={handleCategoryClick}
                    />
                )}
            </section>

            {/* Food List Section */}
            <section className="bg-white py-5 px-2 md:bg-white md:py-5 lg:p-8 rounded-md h-full">
                <ul className="grid grid-cols-1 lg:flex gap-3 lg:justify-between">
                    {/* Header title */}
                    <li className="flex items-center">
                        <Image src="/icons/Romdol.svg" alt="Romdol Icon" width={33} height={33} />
                        <span className="font-moulpali text-lg px-5 text-color-2">បញ្ជីមុខម្ហូប</span>
                    </li>
                    {/* Search */}
                    <li className="input input-bordered flex items-center mt-4 w-fit dark:bg-white text-black">
                        <input
                            id="search"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full py-2 pl-5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-white text-black placeholder:text-gray-500"
                            placeholder="ស្វែងរក..."
                        />
                        {/* Search Icon */}
                        <div className="left-0 flex items-center pointer-events-none ml-[-38px]">
                            <Image
                                src="/icons/search.svg"
                                alt="Search Icon"
                                width={20}
                                height={20}
                                className="text-gray-500"
                            />
                        </div>
                    </li>
                </ul>

                {/* Food List */}
                <FoodList activeCategoryId={activeCategoryId} query={query} />
            </section>
        </main>
    );
};

export default ExploreFood;