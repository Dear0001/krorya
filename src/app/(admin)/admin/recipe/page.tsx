"use client";
import React from "react";
import ExploreFood from "@/app/(admin)/admin/recipe/components/recipeListUi/ÊxploreFood";
import {ToastContainer} from "react-toastify";


const RecipeList = () => {
    return (
        <main>
            <section className="bg-gray-50 overflow-auto scrollbar-hide ">
                <ExploreFood />
            </section>
        </main>
    );
};

export default RecipeList;
