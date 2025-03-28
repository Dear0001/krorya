"use client";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useGetFavoriteListQuery } from "@/redux/services/favorite";
import LoadingFoodCard from "@/app/(user)/recipe/components/recipeListUi/LoadingFoodCard";
import CardRecipePopular from "@/components/card/CardRecipePopular";
import React from "react";

export default function FavoriteLayout() {
    const token = useSelector(selectToken);
    const { data: favoriteData, isLoading } = useGetFavoriteListQuery({});
    // Extract recipes from the response data
    const recipes = favoriteData?.payload?.favoriteFoodRecipes || [];
    // console.log("fav page:",recipes);

    return (
        <>
            {token ? (
                <div className="rounded-md flex flex-col gap-4 overflow-hidden w-full h-full">
                    <div className="bg-white md:p-8 rounded-2xl w-full h-full overflow-hidden">
                        <div className="flex justify-between items-center mb-4 px-4">
                            <div className="flex items-center justify-center gap-5">
                                <Image
                                    src={"/icons/Romdol.svg"}
                                    alt="Romdol Icon"
                                    width={33}
                                    height={33}
                                />
                                <h1 className="text-md md:text-lg lg:text-lg text-slate-700 font-moulpali">
                                    ចំណង់ចំណូលចិត្ត
                                </h1>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <div key={index} className="w-full flex-shrink-0 pb-5">
                                        <LoadingFoodCard />
                                    </div>
                                ))}
                            </div>
                        ) : recipes.length > 0 ? (
                            <div className="w-full bg-white overflow-y-auto h-full overflow-hidden p-4 hide-scrollbar">
                                <div className="grid grid-cols-2 place-items-center mt-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {recipes.map((recipe:any) => (
                                        <CardRecipePopular
                                            key={recipe.id}
                                            recipe={recipe}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex justify-center items-center">
                                <div className="text-center py-8">
                                    <Image
                                        src={"/icons/BACKGROUND.svg"}
                                        width={200}
                                        height={200}
                                        alt="No favorites"
                                        className="mx-auto"
                                    />
                                    <p className="text-gray-500 mt-4">
                                        អ្នកមិនទាន់មានម្ហូបដែលចូលចិត្តទេ
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="max-w-96 m-auto text-center">
                        <Image
                            src={"/Group 1000006054.png"}
                            width={800}
                            height={800}
                            alt="login"
                        />
                        <div className="mt-4">
                            <h1 className="font-bold text-2xl">
                                លោកអ្នកមិនទាន់មានគណនីនៅឡើយទេ
                            </h1>
                            <span className="text-sm">សូមបង្កើតគណនីជាមុនសិន</span>
                        </div>
                        <div className="flex gap-4 items-center justify-center mt-4">
                            <Link
                                href="/register"
                                className="text-white text-center bg-primary w-56 py-2 px-6 rounded-lg"
                            >
                                បង្កើតគណនី
                            </Link>
                            <Link
                                href="/login"
                                className="border border-primary text-center text-primary px-6 w-56 py-2 rounded-lg"
                            >
                                ចូលគណនី
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}