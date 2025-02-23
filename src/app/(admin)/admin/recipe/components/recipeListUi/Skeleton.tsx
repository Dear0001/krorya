import React from "react";

export const Skeleton = () => {
    return (
        <main>
            <section className={"flex flex-col gap-6 relative"}>
                {/* Image Skeleton */}
                <div className={"relative mx-20 top-0 "}>
                    <div className={"h-96 rounded-lg bg-gray-200 animate-pulse"}></div>
                </div>

                {/* Content Skeleton */}
                <div className={"bg-white self-center p-14 w-2/3 absolute top-3/4 rounded-md"}>
                    <div className={"flex flex-col items-center gap-4"}>
                        <div className={"h-12 w-1/2 bg-gray-200 animate-pulse rounded"}></div>
                        <div className={"h-24 w-24 bg-gray-200 animate-pulse rounded-full"}></div>
                    </div>

                    {/* Description Skeleton */}
                    <div className={"mt-6"}>
                        <div className={"h-6 w-1/4 bg-gray-200 animate-pulse rounded"}></div>
                        <div className={"h-4 w-full bg-gray-200 animate-pulse rounded mt-2"}></div>
                        <div className={"h-4 w-3/4 bg-gray-200 animate-pulse rounded mt-2"}></div>
                    </div>

                    {/* Buttons Skeleton */}
                    <div className={"flex gap-2 my-2 p-4 border-t mt-4 border-b justify-between"}>
                        <div className={"flex gap-8"}>
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className={"flex flex-col items-center gap-4"}>
                                    <div className={"h-8 w-8 bg-gray-200 animate-pulse rounded-full"}></div>
                                    <div className={"h-4 w-16 bg-gray-200 animate-pulse rounded"}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Author and Details Skeleton */}
                    <div className={"bg-gray-50 p-4 rounded-md mt-5"}>
                        <div className={"flex justify-between gap-4"}>
                            <div>
                                <div className={"h-6 w-1/4 bg-gray-200 animate-pulse rounded"}></div>
                                <div className={"flex gap-2 mt-2"}>
                                    <div className={"h-10 w-10 bg-gray-200 animate-pulse rounded-full"}></div>
                                    <div className={"h-4 w-24 bg-gray-200 animate-pulse rounded"}></div>
                                </div>
                            </div>
                            <div className={"flex gap-20"}>
                                {[...Array(3)].map((_, index) => (
                                    <div key={index}>
                                        <div className={"h-6 w-1/4 bg-gray-200 animate-pulse rounded"}></div>
                                        <div className={"h-4 w-16 bg-gray-200 animate-pulse rounded mt-2"}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Ingredients Skeleton */}
                    <div className={"py-4"}>
                        <div className={"h-6 w-1/4 bg-gray-200 animate-pulse rounded"}></div>
                        <div className={"w-full mb-2 bg-gray-50 rounded-md mt-2"}>
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className={"h-8 w-full bg-gray-200 animate-pulse rounded mt-2"}></div>
                            ))}
                        </div>
                    </div>

                    {/* Cooking Steps Skeleton */}
                    <div className={"py-4"}>
                        <div className={"h-6 w-1/4 bg-gray-200 animate-pulse rounded"}></div>
                        <div className={"flex flex-col gap-4 mt-4"}>
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className={"flex gap-4 items-center"}>
                                    <div className={"w-7 h-7 bg-gray-200 animate-pulse rounded-full"}></div>
                                    <div className={"h-16 w-full bg-gray-200 animate-pulse rounded-lg"}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};