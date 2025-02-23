"use client";
import { useState, useEffect } from "react";
import TotalUi from "@/components/totalUI/TotalUI";
import Image from "next/image";
import { useGetDashboardCountQuery } from "@/redux/services/recipe";
import TotalUiSkeleton from "@/components/totalUI/TotalUiSkeleton";

const TotalDataComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true); // State to control loading

    // Fetch dashboard count data
    const { data, isLoading: isDataLoading, error } = useGetDashboardCountQuery();

    // Ensure data exists before mapping
    const dashboardItems =
        data && typeof data === "object"
            ? (Object.entries(data) as [string, number][]).map(([key, value]) => ({
                title: key,
                count: value,
            }))
            : [];

    // Set a minimum loading time of 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // After 2 seconds, set loading to false
        }, 2000); // 2 seconds delay

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    // Show skeleton if data is still loading or if the minimum loading time hasn't passed
    if (isLoading || isDataLoading) {
        return (
            <main className="my-5 w-full px-5 h-[222px] bg-white rounded-[15px]">
                <div className="flex gap-3 justify-start items-center text-center">
                    <Image height={33} width={33} src={"/assets/dashboard_icon.svg"} alt="Dashboard Icon" />
                    <h1 className="py-5 text-h1">តារាងសង្ខេបទិន្នន័យសរុប</h1>
                </div>
                <div className="flex gap-2">
                    <TotalUiSkeleton />
                    <TotalUiSkeleton />
                    <TotalUiSkeleton />
                </div>
            </main>
        );
    }

    // ✅ Show dashboard data when loaded
    return (
        <main className="my-5 w-full px-5 h-[222px] bg-white rounded-[15px]">
            <div className="flex gap-3 justify-start items-center text-center">
                <Image height={33} width={33} src={"/assets/dashboard_icon.svg"} alt="Dashboard Icon" />
                <h1 className="py-5 text-h1">តារាងសង្ខេបទិន្នន័យសរុប</h1>
            </div>
            <div className="flex gap-2">
                {dashboardItems?.map((item) => (
                    <TotalUi key={item.title} title={item.title} count={item.count} />
                ))}
            </div>
        </main>
    );
};

export default TotalDataComponent;