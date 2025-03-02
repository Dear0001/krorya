"use client";
import Image from "next/image";
import "@/app/globals.css";
import { useGetRecipePopularQuery } from "@/redux/services/recipe";
import CardRecipePopular from "@/components/card/CardRecipePopular";
import LoadingFoodCard from "@/app/(admin)/admin/recipe/components/recipeListUi/LoadingFoodCard";

const RecipeComponent = () => {
    // Fetch popular recipes
    const { data, isLoading } = useGetRecipePopularQuery();
    const recipes = data?.payload?.popularRecipes || [];

    return (
        <main className="w-[1105px] my-5 px-5 pt-5 bg-white rounded-tl-[15px] rounded-lg rounded-tr-[15px]">
            <div className="flex gap-3 justify-start items-center text-center">
                <Image width={33} height={33} src="/assets/dashboard_icon.svg" alt="dashboard_icon" />
                <h1 className="text-h1">រូបមន្តអាហារ ពេញនិយម</h1>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className="mt-2 h-[calc(100%-70px)] overflow-x-auto no-scrollbar whitespace-nowrap flex gap-10">
                {/* Display 5 loading placeholders while fetching */}
                {isLoading && Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="w-[200px] pb-5">
                        <LoadingFoodCard />
                    </div>
                ))}

                {/* Display recipes when loaded */}
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="w-[200px] pb-5">
                        <CardRecipePopular recipe={recipe} />
                    </div>
                ))}
            </div>
        </main>
    );
};

export default RecipeComponent;
