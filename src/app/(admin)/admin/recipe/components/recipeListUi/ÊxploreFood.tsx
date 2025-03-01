"use client";

import React, { useState } from "react";
import Image from "next/image";
import FoodList from "@/app/(admin)/admin/recipe/components/recipeListUi/FoodList";
import CategoryList from "@/app/(admin)/admin/recipe/components/recipeListUi/CategoryList";
import { useGetAllCategoriesQuery } from "@/redux/services/category";
import RecipeForm  from "../RecipeForm";
import CategorySkeleton from "@/app/(admin)/admin/recipe/components/CategorySkeleton";

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
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Category Section */}
            <div className="bg-white md:p-6 lg:p-8 p-5 flex flex-col gap-4 rounded-md">
                <ul className="grid gap-2 list-none">
                    <li className="flex items-center">
                        <Image src="/icons/Romdol.svg" alt="Romdol Icon" width={33} height={33} />
                        <span className="font-moulpali text-lg px-5 text-color-2">របបអាហារ</span>
                    </li>
                </ul>

                {/* Category List */}
                {isLoading ? (
                    <CategorySkeleton/>
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
                    {/*header title*/}
                    <li className="flex items-center">
                        <Image src="/icons/Romdol.svg" alt="Romdol Icon" width={33} height={33} />
                        <span className="font-moulpali text-lg px-5 text-color-2">បញ្ជីមុខម្ហូប</span>
                    </li>
                    {/*search*/}
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
                    {/*create recipe button*/}
                    <li>
                        <button
                            onClick={openModal}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
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
                <div className="fixed h-screen inset-0 top-0  bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className=" p-6 bg-white rounded-md w-full max-w-2xl relative">
                        <div className="text-center mt-2 mb-5">
                            <h3 className="mb-3 text-2xl font-semibold leading-5 font-moulpali text-secondary lg:text-2xl">កែប្រែព័ត៍មាន</h3>
                            <p className="mt-2 text-sm leading-4 text-slate-600 flex justify-center">
                                <Image
                                    src="/icons/Kbach.svg"
                                    alt="border"
                                    width={100}
                                    height={13}
                                />
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