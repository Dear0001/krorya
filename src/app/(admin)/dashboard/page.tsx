"use client"
import React from 'react';
import TotalDataComponent from "@/components/total/TotalDataComponent";
import {useGetAllCategoriesQuery} from "@/redux/services/category";
import Image from "next/image";
import {ToastContainer} from "react-toastify";

function Dashboard() {
    const { data: categoriesData, error, isLoading } = useGetAllCategoriesQuery({ page: 0, pageSize: 10 });
    const categories = categoriesData?.payload || [];

    return (
        <main className="w-full h-screen bg-white rounded-lg overflow-y-scroll no-scrollbar px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8 lg:py-10">
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

            <section className="flex flex-col md:flex-row gap-5">
                <div className="w-full flex justify-between gap-4 md:mx-[40px] md:ml-[120px]">
                    <h1 className="w-full font-moulpali text-secondary text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                        របាយការណ៍សរុប
                    </h1>
                    <div className="w-full md:w-auto flex justify-center">
                        <Image
                            width={350}
                            height={350}
                            src={"/icons/Cooking-dashboard.svg"}
                            alt={"dashboard"}
                            className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px] xxl:w-[500px]"
                        />
                    </div>
                </div>
            </section>

            {/* Main grid container with 12 columns */}
            <div className="grid grid-cols-12">
                <div className="col-span-8">
                    <TotalDataComponent/>
                </div>

                <div className="hidden lg:block lg:col-span-2"></div>
            </div>

        </main>
    );
}

export default Dashboard;