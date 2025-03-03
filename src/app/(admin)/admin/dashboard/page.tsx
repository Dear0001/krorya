import React from 'react';
import BannerComponent from "@/components/banner/BannerComponent";
import TotalDataComponent from "@/components/total/TotalDataComponent";
import RecipeComponent from "@/components/recipe/RecipeComponent";
import PopularCardRecipe from "@/components/recipe/PopularCardRecipe";

function Dashboard() {
    return (
        <main className="w-full overflow-auto scrollbar-hide p-4">
            {/* Banner Section */}
            <BannerComponent/>

            {/* Main Content Section */}
            <section className="flex flex-col lg:flex-row gap-5">
                {/* Left Column: Total Data & Popular Recipes */}
                <div className="w-full lg:w-2/3 ">
                    <TotalDataComponent/>
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