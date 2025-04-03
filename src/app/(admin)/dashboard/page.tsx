"use client"
import React from 'react';
import TotalDataComponent from "@/components/total/TotalDataComponent";
import {useGetAllCategoriesQuery} from "@/redux/services/category";
import Image from "next/image";
import {ToastContainer} from "react-toastify";

function Dashboard() {
    const { data: categoriesData } = useGetAllCategoriesQuery({ page: 0, pageSize: 10 });
    const categories = categoriesData?.payload || [];

    return (
        <div className="w-full min-h-screen bg-white rounded-lg overflow-y-scroll no-scrollbar px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8 lg:py-10">
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

            {/* Grid Container */}
            <div className="grid grid-cols-12 gap-8">
                {/* Header and Main Content - 8 columns */}
                <div className="col-span-12 lg:col-span-8">
                    {/* Header Section */}
                    <header className="mt-[70px] ml-[15px] mb-8 md:mb-12">
                        <h1 className="font-moulpali text-secondary text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                            របាយការណ៍សរុប
                        </h1>
                    </header>

                    {/* Main Content */}
                    <div className="mt-[40px] flex flex-col gap-8">
                        <TotalDataComponent/>
                    </div>
                </div>

                {/* Image Section - Hidden on mobile, shows on lg screens (4 columns) */}
                <div className="hidden lg:flex lg:col-span-4 justify-center lg:justify-start items-start">
                    <Image
                        width={350}
                        height={350}
                        src="/icons/Cooking-dashboard.svg"
                        alt="dashboard"
                        className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[450px]"
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;