"use client"
import React from 'react';
import BannerComponent from "@/components/banner/BannerComponent";
import RecipeComponent from "@/components/recipe/RecipeComponent";
import PopularCardRecipe from "@/components/recipe/PopularCardRecipe";
import {useGetUserProfileQuery} from "@/redux/services/user";
import TotalDataComponent from "@/components/total/TotalDataComponent";
import CategoryList from "@/app/(admin)/recipe/components/recipeListUi/CategoryList";
import CategorySkeleton from "@/app/(admin)/recipe/components/CategorySkeleton";
import {useGetAllCategoriesQuery} from "@/redux/services/category";
import Image from "next/image";

function Dashboard() {
    const { data: categoriesData, error, isLoading } = useGetAllCategoriesQuery({ page: 0, pageSize: 10 });

    const categories = categoriesData?.payload || [];


    return (
        <main className="w-full h-screen bg-white rounded-lg overflow-auto scrollbar-hide px-16 py-10">
            <section className="flex flex-row lg:flex-row gap-5">
                <div className={"w-full flex justify-between mx-[40px] ml-[120px]"}>
                    <h1 className={"font-moulpali mt-16 text-secondary text-h1"}>របាយការណ៍សរុប</h1>
                    <div>
                        <Image
                            width={350}
                            height={350}
                            src={"/icons/Cooking-dashboard.svg"} alt={"dashboard"}/>
                    </div>
                </div>

            </section>
            {/* Main grid container with 12 columns */}
            <div className="grid grid-cols-12">
                <div className="col-span-8">
                    <TotalDataComponent/>
                </div>
                {/* Empty space spanning 2 columns */}
                <div className="col-span-2"></div>
            </div>

        </main>
    );
}

export default Dashboard;