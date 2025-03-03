// components/LoadingFoodCard.js

import React from "react";

export default function LoadingFoodCard() {
    return (
        <div className="card shadow-md p-2 rounded-lg mx-0 w-full sm:w-[14rem] max-w-[14rem] min-w-[10rem] animate-pulse">
            {/* Image placeholder */}
            <figure className="relative w-full h-32 sm:h-40 bg-gray-300 rounded-md"></figure>

            {/* Card body placeholder */}
            <div className="card-body p-2 bg-white md:col-span-1">
                {/* Title placeholder */}
                <div className="h-5 bg-gray-300 rounded-md mb-2 w-3/4"></div>

                {/* Duration placeholder */}
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
                    <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
                </div>

                {/* Level badge placeholder */}
                <div className="card-actions flex flex-row items-center justify-end">
                    <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
                </div>
            </div>
        </div>
    );
}