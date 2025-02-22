"use client";
import React from "react";
import Skeleton from "@/components/Skeleton";

const TotalUiSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-2 self-stretch p-4 rounded-2xl flex-[1_0_0] bg-gray-200 min-w-[200px] max-md:min-w-[180px] max-sm:p-3 max-sm:min-w-full animate-pulse">
            {/* Title Skeleton */}
            <Skeleton className="w-1/3 h-5 bg-gray-300 rounded" />

            {/* Count Skeleton */}
            <Skeleton className="w-1/2 h-10 bg-gray-400 rounded" />
        </div>
    );
};

export default TotalUiSkeleton;
