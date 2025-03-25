"use client";
import React from "react";

export default function Skeleton() {
    return (
        <main className={"h-screen overflow-auto scrollbar-hide z-10"}>
            <section className={"flex flex-col gap-6 relative"}>
                {/* Image Placeholder */}
                <div
                    className="relative lg:mx-20 lg:h-[444px] md:h-[344px] sm:h-[244px] h-full sm:mx-5 rounded-lg bg-gray-200 animate-pulse"
                ></div>

                {/* Content Placeholder */}
                <div className="bg-white self-center w-full lg:w-2/3 md:w-2/3 absolute top-3/4 rounded-md">
                    {/* Recipe Name and Logo Placeholder */}
                    <div className="flex flex-col items-center pt-8 px-4 sm:pt-14 sm:px-14 gap-4">
                        <div className="h-10 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-20 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>

                    {/* Recipe Description Placeholder */}
                    <div className="pt-8 px-4 sm:pt-14 sm:px-14">
                        <div className="h-6 w-1/4 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                        <div className="h-4 w-full bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>

                    {/* Action Buttons Placeholder */}
                    <div className="flex gap-2 my-2 p-4 border-t mt-4 border-b justify-between">
                        <div className="flex gap-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="flex flex-col items-center gap-2">
                                    <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-4 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="h-4 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>

                    {/* Author and Details Section Placeholder */}
                    <div className="bg-gray-50 p-4 rounded-md mt-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            {/* Author Placeholder */}
                            <div>
                                <div className="h-6 w-1/4 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                                <div className="flex gap-2 items-center">
                                    <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-4 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            </div>

                            {/* Difficulty, Duration, and Category Placeholder */}
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index}>
                                        <div className="h-6 w-1/4 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                                        <div className="h-4 w-16 bg-gray-200 rounded-lg animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Ingredients Placeholder */}
                    <div className="py-4">
                        <div className="h-6 w-1/4 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                        <div className="w-full bg-gray-50 rounded-md p-4">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="h-4 w-full bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                            ))}
                        </div>
                    </div>

                    {/* Cooking Steps Placeholder */}
                    <div className="py-4">
                        <div className="h-6 w-1/4 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
                        <div className="flex flex-col gap-4 mt-4">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="flex gap-4 items-center">
                                    <div className="h-7 w-7 bg-gray-200 rounded-full animate-pulse"></div>
                                    <div className="h-16 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Background Images Placeholder */}
                    <div className="flex justify-between items-center mt-10 mb-0">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="w-[100px] h-[100px] sm:w-[155px] sm:h-[155px] bg-gray-200 rounded-full animate-pulse"
                            ></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Hidden Section Placeholder */}
            <section className={"relative mt-36 hidden sm:hidden"}>
                <div className="h-40 w-40 bg-gray-200 rounded-full animate-pulse absolute top-0 right-0"></div>
                <div className="h-40 w-40 bg-gray-200 rounded-full animate-pulse absolute top-0 left-0"></div>
            </section>
        </main>
    );
}