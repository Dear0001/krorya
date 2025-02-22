"use client";
import React from "react";
import Skeleton from "@/components/Skeleton";

const CardRecipeSkeleton: React.FC = () => {
    return (
        <div className="w-full h-[90px] flex bg-white rounded-lg overflow-hidden shadow-md animate-pulse mb-2">
            {/* Image Skeleton */}
            <div className="w-[90px] h-[90px] bg-gray-200"></div>

            {/* Content Skeleton */}
            <section className="flex flex-grow items-center justify-between p-3">
                <div className="flex flex-col gap-1 w-full">
                    {/* Title */}
                    <Skeleton className="w-2/3 h-4 bg-gray-300 rounded" />

                    {/* Duration */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-10 h-4 bg-gray-300 rounded" />
                    </div>

                    {/* Level Badge */}
                    <Skeleton className="w-[70px] h-5 bg-gray-300 rounded" />
                </div>

                {/* Favorite Icon Placeholder */}
                <div className="w-[19px] h-[17px]">
                    <Skeleton className="w-full h-full bg-gray-300 rounded" />
                </div>
            </section>
        </div>
    );
};

export default CardRecipeSkeleton;
