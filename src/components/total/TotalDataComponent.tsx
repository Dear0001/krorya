import React from 'react';
import TotalUi from "@/components/totalUI/TotalUI";
import Image from "next/image";

const TotalDataComponent = async () => {
    // Define the state for the total count
    let getTotalCount: { id: number; title: string; count: number }[] = [];

    // try {
    //     // Fetch data from the API
    //     const data = await getDashboardCounts();
    //
    //     // Transform the API response
    //     getTotalCount = [
    //         { id: 1, title: "Recipes", count: data.recipes },
    //         { id: 2, title: "Categories", count: data.categories },
    //         { id: 3, title: "Users", count: data.users },
    //         { id: 4, title: "Cuisines", count: data.cuisines }, // Added cuisines
    //     ];
    // } catch (error) {
    //     console.error("Failed to fetch dashboard counts:", error);
    // }

    return (
        <main className="my-5 w-full px-5 h-[222px] bg-white rounded-[15px]">
            <div className={"flex gap-3 justify-start items-center text-center"}>
                <Image height={33} width={33} src={"/assets/dashboard_icon.svg"} alt={"image"}/>
                <h1 className="py-5 text-[26px]">Summaries of the data</h1>
            </div>

            <div className="flex gap-2">
                {getTotalCount.map((item) => (
                    <TotalUi key={item.id} title={item.title} count={item.count} />
                ))}
            </div>
        </main>
    );
};

export default TotalDataComponent;