"use client";

import React, { useState } from "react";
import Image from "next/image";
import FoodList from "@/app/(admin)/recipe/components/recipeListUi/FoodList";
import CategoryList from "@/app/(admin)/recipe/components/recipeListUi/CategoryList";
import { useGetAllCategoriesQuery } from "@/redux/services/category";
import RecipeForm from "../RecipeForm";
import CategorySkeleton from "@/app/(admin)/recipe/components/CategorySkeleton";
import { ToastContainer } from "react-toastify";

const ExploreFood: React.FC = () => {
    const [activeCategoryId, setActiveCategoryId] = useState<string>("all");
    const [query, setQuery] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
        <div className="flex flex-col">
            <ToastContainer />
            {/* Category Section */}
            <div className="bg-white md:p-6 mb-5 flex flex-col gap-5 p-2 rounded-lg">
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
            </div>

            {/* Food List Section */}
            <div className="bg-white p-5 md:p-6 lg:p-8 rounded-md h-full">
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
                            className="w-full  py-2 pl-5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-white text-black placeholder:text-gray-500"
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
                    {/* Create recipe button */}
                    <li>
                        <button
                            onClick={openModal}
                            className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white transition duration-300 md:m-2 sm:m-2"
                        >
                            បង្កើតម្ហូប
                        </button>
                    </li>
                </ul>

                {/* Food List */}
                <FoodList activeCategoryId={activeCategoryId} query={query} />
            </div>

            {/* Modal for RecipeForm */}
            {isModalOpen && (
                <div className="fixed h-screen inset-0 top-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="p-6 bg-white rounded-md w-full max-w-2xl relative mx-2">
                        <div className="text-center mt-2 mb-5">
                            <h3 className="mb-3 text-2xl font-semibold leading-5 font-moulpali text-secondary lg:text-2xl">បង្កើតរូបមន្តម្ហូប</h3>
                            <p className="mt-2 text-sm leading-4 text-slate-600 flex justify-center">
                                <Image src="/icons/Kbach.svg" alt="border" width={100} height={13} />
                            </p>
                        </div>
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
                        >
                            &times;
                        </button>
                        <RecipeForm onSuccess={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExploreFood;