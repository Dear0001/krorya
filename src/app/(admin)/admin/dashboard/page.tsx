import React from 'react';
import BannerComponent from "@/components/banner/BannerComponent";
import TotalDataComponent from "@/components/total/TotalDataComponent";
import RecipeComponent from "@/components/recipe/RecipeComponent";
import PopularFoodComponent from "@/components/foodPopular/PopularFoodComponent";

function Dashboard() {
    return (
        <main className={"w-full"}>
            <BannerComponent/>
            <section className={"flex"}>
                <div className={"w-full"}>
                    <TotalDataComponent/>
                    <PopularFoodComponent/>
                </div>
                <div className={"pl-5"}>
                    <RecipeComponent/>
                </div>

            </section>
        </main>
    );
}

export default Dashboard;