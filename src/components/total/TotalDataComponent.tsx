"use client";
import TotalUi from "@/components/totalUI/TotalUI";
import Image from "next/image";
import { useGetDashboardCountQuery } from "@/redux/services/recipe";
import Skeleton from "@/components/Skeleton";

const TotalDataComponent = () => {
    // Fetch dashboard count data
    const { data, isLoading, error } = useGetDashboardCountQuery();
    console.log("data", data);

    if (isLoading) {
        return (
            <main className="my-5 w-full px-5 h-[222px] bg-white rounded-[15px]">
                <div className="flex gap-2">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                </div>
            </main>
        );
    }

    if (error) return <p>Error loading data.</p>;

    // Ensure data exists before mapping
    const dashboardItems =
        data && typeof data === "object"
            ? (Object.entries(data) as [string, number][]).map(([key, value]) => ({
                title: key,
                count: value,
            }))
            : [];

    return (
        <main className="my-5 w-full px-5 h-[222px] bg-white rounded-[15px]">
            <div className="flex gap-3 justify-start items-center text-center">
                <Image height={33} width={33} src={"/assets/dashboard_icon.svg"} alt="Dashboard Icon" />
                <h1 className="py-5 text-h1">តារាងសង្ខេបទិន្នន័យសរុប</h1>
            </div>

            <div className="flex gap-2">
                {dashboardItems.map((item) => (
                    <TotalUi key={item.title} title={item.title} count={item.count} />
                ))}
            </div>
        </main>
    );
};

export default TotalDataComponent;