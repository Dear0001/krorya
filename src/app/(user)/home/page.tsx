"use client"
import React from 'react';
import BannerComponent from "@/components/banner/BannerComponent";
import RecipeComponent from "@/components/recipe/RecipeComponent";
import PopularCardRecipe from "@/components/recipe/PopularCardRecipe";
import CategoryList from "@/app/(user)/recipe/components/recipeListUi/CategoryList";
import CategorySkeleton from "@/app/(user)/recipe/components/CategorySkeleton";
import {useGetAllCategoriesQuery} from "@/redux/services/category";
import Image from "next/image";
import {ToastContainer} from "react-toastify";

function Dashboard() {
    const { data: categoriesData, error, isLoading } = useGetAllCategoriesQuery({ page: 0, pageSize: 10 });

    const categories = categoriesData?.payload || [];


    return (
        <main className="w-full overflow-auto scrollbar-hide p-4">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Banner Section */}
            <BannerComponent/>

            {/* Main Content Section */}
            <section className="flex flex-col lg:flex-row gap-5">
                {/* Left Column: Total Data & Popular Recipes */}
                <div className="w-full lg:w-2/3 ">
                    <div className="bg-white md:p-6 my-5 flex flex-col gap-5 p-2 rounded-lg">
                        <ul className="grid gap-2 list-none">
                            <li className="flex items-center">
                                <Image src="/icons/Romdol.svg" alt="Romdol Icon" width={33} height={33} />
                                <h1 className="mt-2 ml-2 text-[22px] font-moulpali md:text-h4 sm:text-h4 lg:text-h5 xl:text-h5">ប្រភេទមុខម្ហូប</h1>
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
                                activeCategoryId="all"
                                onCategoryClick={() => {}}
                            />
                        )}
                    </div>
                    <PopularCardRecipe />
                </div>

                {/* Right Column: RecipeComponent */}
                <div className="w-full lg:w-1/3">
                    <RecipeComponent/>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;