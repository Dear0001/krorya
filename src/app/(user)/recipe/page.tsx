"use client";
import React from "react";
import ExploreFood from "@/app/(user)/recipe/components/recipeListUi/ÊxploreFood";
import {ToastContainer} from "react-toastify";


const RecipeList = () => {
    return (
        <main>
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
            <section className="bg-gray-50 py-5 overflow-auto scrollbar-hide ">
                <ExploreFood />
            </section>
        </main>
    );
};

export default RecipeList;
