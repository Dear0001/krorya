"use client";
import React from "react";
import ExploreFood from "@/app/(user)/explore/components/recipeListUi/ÊxploreFood";
import {ToastContainer} from "react-toastify";


const ExplorePage = () => {
    return (
        <main>
            <ToastContainer />
            <section className="py-5 overflow-auto scrollbar-hide">
                <ExploreFood />
            </section>
        </main>
    );
};

export default ExplorePage;
