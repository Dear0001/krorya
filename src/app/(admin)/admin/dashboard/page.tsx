import React from 'react';
import BannerComponent from "@/components/banner/BannerComponent";
import TotalDataComponent from "@/components/total/TotalDataComponent";
import RecipeComponent from "@/components/recipe/RecipeComponent";
import PopularCardRecipe from "@/components/recipe/PopularCardRecipe";
// import PopularFoodComponent from "@/components/foodPopular/PopularFoodComponent";

function Dashboard() {
    return (
        <main className={"w-full overflow-auto scrollbar-hide"}>
            <BannerComponent/>
            <section className={"flex"}>
                <div className={"w-full"}>
                    <TotalDataComponent/>
                    <PopularCardRecipe />
                </div>
                <div className={"pl-5"}>
                    <RecipeComponent/>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;