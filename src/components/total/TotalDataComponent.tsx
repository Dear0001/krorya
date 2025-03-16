"use client";
import React, { useState, useEffect } from "react";
import TotalUi from "@/components/totalUI/TotalUI";
import Image from "next/image";
import { useGetDashboardCountQuery } from "@/redux/services/recipe";

const TotalDataComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true); // State to control loading

    // Fetch dashboard count data
    const { data, isLoading: isDataLoading, error } = useGetDashboardCountQuery();

    // Ensure data exists before mapping
    const dashboardItems =
        data && typeof data === "object"
            ? (Object.entries(data) as [string, number][]).map(([key, value]) => ({
                title: key,
                count: value || 0
            }))
            : [
                { title: "Recipes", count: 0 },
                { title: "Categories", count: 0 },
                { title: "Users", count: 0 },
                { title: "Cuisines", count: 0 },
            ];

    // Set a minimum loading time of 3 seconds
    useEffect(() => {
        if (isDataLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
        }
    }, [isDataLoading]);

    // Show skeleton if data is still loading or if the minimum loading time hasn't passed
    if (isLoading || isDataLoading) {
        return (
            <main className="my-5 w-full px-5 h-auto bg-white rounded-[15px]">
                <div className="flex gap-3 justify-start items-center text-center">
                    <Image height={33} width={33} src={"/assets/dashboard_icon.svg"} alt="Dashboard Icon" />
                    <h1 className="py-5 text-[22px] md:text-h2 sm:text-h3 lg:text-h1 xl:text-h1">តារាងសង្ខេបទិន្នន័យសរុប</h1>

                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-5">
                    {/* Render skeleton placeholders */}
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 self-stretch p-4 rounded-2xl bg-gray-100 min-w-[170px] max-md:min-w-[150px] max-sm:p-3 max-sm:min-w-full animate-pulse"
                        >
                            {/* Skeleton for title */}
                            <span className="h-6 w-1/2 bg-gray-300 rounded-md"></span>
                            {/* Skeleton for count */}
                            <span className="h-10 w-3/4 bg-gray-300 rounded-md"></span>
                        </div>
                    ))}
                </div>
            </main>
        );
    }

    // ✅ Show dashboard data when loaded
    return (
        <main className="my-5 w-full px-5 h-auto bg-white rounded-[15px]">
            <div className="flex gap-3 justify-start items-center text-center">
                <Image height={33} width={33} src={"/assets/dashboard_icon.svg"} alt="Dashboard Icon" />
                <h1 className="py-5 text-[22px] md:text-h2 sm:text-h3 lg:text-h1 xl:text-h1">តារាងសង្ខេបទិន្នន័យសរុប</h1>

            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-5">
                {dashboardItems?.map((item) => (
                    <TotalUi key={item.title} title={item.title} count={item.count} />
                ))}
            </div>
        </main>
    );
};

export default TotalDataComponent;