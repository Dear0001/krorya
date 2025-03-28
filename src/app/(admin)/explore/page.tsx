"use client";
import React from "react";
import ExploreFood from "@/app/(admin)/recipe/components/recipeListUi/ÊxploreFood";
import {ToastContainer} from "react-toastify";


const ExplorePage = () => {
    return (
        <main>
            <ToastContainer />
            <section className="bg-gray-50 overflow-auto scrollbar-hide ">
                <ExploreFood />
            </section>
        </main>
    );
};

export default ExplorePage;
