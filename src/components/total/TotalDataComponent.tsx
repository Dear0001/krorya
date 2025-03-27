"use client";
import React, { useState, useEffect } from "react";
import TotalUi from "@/components/totalUI/TotalUI";
import Image from "next/image";
import { useGetDashboardCountQuery } from "@/redux/services/recipe";

const TotalDataComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

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

    if (isLoading || isDataLoading) {
        return (
            <main className="my-5 w-full px-5 h-auto bg-white rounded-[15px]">
                <div className="flex gap-3 pb-5 justify-start items-center text-center">
                    <Image height={33} width={33} src={"/assets/dashboard_icon.svg"} alt="Dashboard Icon" />
                    <h1 className="py-5 text-[22px] md:text-h2 sm:text-h3 lg:text-h1 xl:text-h1">តារាងសង្ខេបទិន្នន័យសរុប</h1>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-5"> {/* Always 2 columns */}
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 self-stretch p-4 rounded-2xl bg-gray-100 w-full animate-pulse"
                        >
                            <span className="h-6 w-1/2 bg-gray-300 rounded-md"></span>
                            <span className="h-10 w-3/4 bg-gray-300 rounded-md"></span>
                        </div>
                    ))}
                </div>
            </main>
        );
    }

    return (
        <main className="my-5 w-full px-5 h-auto bg-white rounded-[15px]">
            <div className="flex gap-3 pb-5 justify-start items-center text-center">
                <Image height={33} width={33} src={"/assets/dashboard_icon.svg"} alt="Dashboard Icon" />
                <h1 className="py-5 text-[22px] md:text-h2 sm:text-h3 lg:text-h1 xl:text-h1">តារាងសង្ខេបទិន្នន័យសរុប</h1>
            </div>
            <div className="grid grid-cols-2 gap-4 pb-5"> {/* Always 2 columns */}
                {dashboardItems?.map((item) => (
                    <TotalUi key={item.title} title={item.title} count={item.count} />
                ))}
            </div>
        </main>
    );
};

export default TotalDataComponent;