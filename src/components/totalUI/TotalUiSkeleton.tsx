"use client";
import React from "react";
import Skeleton from "@/components/Skeleton";

const TotalUiSkeleton: React.FC = () => {
    return (
        <div
            className="flex flex-col gap-2 self-stretch p-4 rounded-2xl bg-gray-100 min-w-[170px] max-md:min-w-[150px] max-sm:p-3 max-sm:min-w-full animate-pulse"
        >
            {/* Skeleton for title */}
            <span className="h-6 w-1/2 bg-gray-300 rounded-md"></span>
            {/* Skeleton for count */}
            <span className="h-10 w-3/4 bg-gray-300 rounded-md"></span>
        </div>
    );
};

export default TotalUiSkeleton;
