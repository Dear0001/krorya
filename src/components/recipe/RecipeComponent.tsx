import React from 'react';
import Image from "next/image";
import CardRecipe from "@/components/recipe/CardRecipe";
import "@/app/globals.css";

const RecipeComponent = () => {
    return (
        <main className="w-[423px] my-5 px-5 pt-5 h-[699px] bg-white rounded-tl-[15px] rounded-tr-[15px]">
            <div className={"flex gap-3 justify-start items-center text-center"}>
                <Image width={33} height={33} src={"/assets/dashboard_icon.svg"} alt={"dashboard_icon"}/>
                <h1 className={"text-2xl"}>Food Recipes</h1>
            </div>
            {/* Scrollable container with hidden scrollbar */}
            <div className="mt-4 overflow-y-scroll h-[calc(100%-70px)] no-scrollbar">
                <CardRecipe/>
                <CardRecipe/>
                <CardRecipe/>
                <CardRecipe/>
                <CardRecipe/>
                <CardRecipe/>
            </div>
        </main>
    );
};

export default RecipeComponent;