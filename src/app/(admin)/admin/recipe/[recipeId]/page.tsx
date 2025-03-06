"use client";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import React, { useState} from "react";
import { useParams } from "next/navigation";
import { useGetRecipeByIdQuery } from "@/redux/services/recipe";
import { getImageUrl } from "@/lib/constants";
import IngredientsGroupedByType from "@/app/(admin)/admin/recipe/components/ui/IngredientsGroupedByType";
import CookingStep from "../components/ui/CookingStep";
import EditRecipeForm from "@/app/(admin)/admin/recipe/components/EditRecipeForm";
import {useGetAllFoodQuery} from "@/redux/services/food";
import {useGetAllCategoriesQuery} from "@/redux/services/category";
import {Skeleton} from "../components/recipeListUi/Skeleton";
import {ToastContainer} from "react-toastify";

export default function FoodDetailPage() {
    // const [groceryList, ] = useState<any[]>([]);
    // const [selectedItems, setSelectedItems] = useState<string>("");
    const [, setIsModalOpen] = useState<boolean>(false);

    const params = useParams();
    const recipeId = params?.recipeId as string;
    console.log("recipeId:", recipeId);
    const { data: recipes, isLoading: isRecipeLoading } = useGetRecipeByIdQuery({ id: Number(recipeId) });
    const { data: cuisinesData, isLoading: isCuisinesLoading } = useGetAllFoodQuery({ page: 0, pageSize: 10 });
    const { data: categoriesData, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery({ page: 0, pageSize: 10 })

    // Show skeleton if any API is still loading
    if (isRecipeLoading || isCuisinesLoading || isCategoriesLoading) {
        return <Skeleton />;
    }
    const recipeData = recipes?.payload;
    console.log("data from url:", recipeData);

    // Check if the user profile data is loaded and if there's a profile image
    const recipeImage = recipeData?.photo?.[0]?.photo || "";
    const userProfile = recipeData?.user?.profileImage || "";

    // Convert to valid URLs
    const recipeImageUrl = getImageUrl(recipeImage);
    const imageUrl = getImageUrl(userProfile);

    type RecipeFormProps = {
        onSuccess?: () => void;
    };
    const openModal = () => {
        setIsModalOpen(true); // Open the modal
    };

    const transformedRecipe = {
        id: recipeData?.id,
        photo: recipeData?.photo,
        name: recipeData?.name,
        description: recipeData?.description,
        durationInMinutes: recipeData?.durationInMinutes,
        level: recipeData?.level,
        ingredients: recipeData?.ingredients,
        cookingSteps: recipeData?.cookingSteps,

        // Convert categoryName to categoryId using correct dataset (categoriesData.payload)
        categoryId: categoriesData?.payload?.find((cat: { categoryName: string; id: number }) =>
            cat.categoryName.trim().toLowerCase() === recipeData?.categoryName?.trim().toLowerCase()
        )?.id || 0,

        // Convert cuisineName to cuisineId using correct dataset (cuisinesData.payload)
        cuisineId: cuisinesData?.payload?.find((cuisine: { cuisineName: string; id: number }) =>
            cuisine.cuisineName.trim().toLowerCase() === recipeData?.cuisineName?.trim().toLowerCase()
        )?.id || 0,
    };

    const closeModal = () => {
        const modal = document.getElementById("my_modal_3kjy") as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
    };

    return (
        <main className={"h-screen overflow-auto scrollbar-hide z-10"}>
            <section className={"flex flex-col gap-6 relative"}>
                <div
                    className="relative lg:mx-20 lg:h-[444px] md:h-[344px] sm:h-[244px] h-full sm:mx-5 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${recipeImageUrl})` }}
                ></div>

                <div className="bg-white self-center w-full lg:w-2/3 md:w-2/3 absolute top-3/4 rounded-md">
                    {/* Recipe Name and Logo */}
                    <div className="flex flex-col items-center pt-8 px-4 sm:pt-14 sm:px-14 gap-4">
        <span className="font-moulpali text-3xl sm:text-4xl lg:text-5xl text-center text-secondary">
            {recipeData?.name}
        </span>
                        <Image
                            className="pt-3"
                            src="/icons/Kbach.svg"
                            alt="logo"
                            width={80}
                            height={80}
                        />
                    </div>

                    {/* Recipe Description */}
                    <div className="pt-8 px-4 sm:pt-14 sm:px-14">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Image
                                    src="/icons/Romdol.svg"
                                    alt="Romdol Icon"
                                    width={20}
                                    height={20}
                                />
                                <span className="text-secondary text-lg sm:text-xl font-semibold">
                    អំពីមុខម្ហូប៖
                </span>
                            </div>
                            <p className="text-slate-700 text-sm sm:text-base">{recipeData?.description}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 my-2 p-4 border-t mt-4 border-b justify-between">
                            <div className="flex gap-4">
                                {/* Save Button */}
                                <div className="flex flex-col items-center gap-2">
                                    <Image
                                        src="/icons/heart click Final.png"
                                        alt="Save Icon"
                                        width={20}
                                        height={20}
                                    />
                                    <span className="text-slate-700 text-sm">រក្សាទុក</span>
                                </div>

                                {/* Restart Button */}
                                <div className="flex flex-col items-center gap-2">
                                    <Image
                                        src="/icons/iconamoon_restart-thin.svg"
                                        alt="Restart Icon"
                                        width={20}
                                        height={20}
                                    />
                                    <span className="text-slate-700 text-sm">បង្កើតម្តងទៀត</span>
                                </div>

                                {/* Start Cooking Button */}
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        className="flex flex-col items-center gap-2"
                                        onClick={() =>
                                            (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal()
                                        }
                                    >
                                        <Image
                                            src="/icons/material-symbols-light_not-started-outline.svg"
                                            alt="Start Cooking Icon"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="text-slate-700 text-sm">ចាប់ផ្ដើមចម្អិន</span>
                                    </button>
                                    <dialog id="my_modal_1" className="modal">
                                        <div className="modal-box max-w-full sm:max-w-fit flex flex-col items-center bg-white text-slate-700 p-4 sm:p-8 rounded-lg hide-scrollbar">
                                            <CookingStep cookingSteps={recipeData?.cookingSteps} image={recipeData?.photo} />
                                        </div>
                                    </dialog>
                                </div>
                            </div>

                            {/* Edit Recipe Button */}
                            <div className="flex flex-col items-center gap-2 overflow-y-scroll no-scrollbar">
                                <button
                                    className="flex flex-col items-center gap-2"
                                    onClick={() =>
                                        (document.getElementById("my_modal_3kjy") as HTMLDialogElement)?.showModal()
                                    }
                                >
                                    <Image
                                        src="/icons/pancel.svg"
                                        alt="Edit Icon"
                                        width={20}
                                        height={20}
                                    />
                                    <span className="text-slate-700 text-sm">កែប្រែរូបមន្ដ</span>
                                </button>
                                <dialog id="my_modal_3kjy" className="modal rounded-lg hide-scrollbar">
                                    <div className="modal-box max-w-full sm:max-w-[650px] w-[95%] mx-auto py-5 px-5 flex flex-col items-center text-slate-700">
                                        {/* Close Button */}
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>

                                        {/* Modal Title */}
                                        <h3 className="font-bold mb-5 text-lg font-moulpali text-secondary text-center">
                                            កែប្រែរូបមន្ដ
                                        </h3>

                                        {/* Image */}
                                        <Image
                                            src="/icons/Kbach.svg"
                                            width={80}
                                            height={80}
                                            alt="image"
                                            className="mb-5"
                                        />

                                        {/* Edit Recipe Form */}
                                        <EditRecipeForm
                                            editRecipeData={transformedRecipe}
                                            recipeId={recipeId}
                                            onSuccess={closeModal}
                                        />
                                    </div>
                                </dialog>
                            </div>
                        </div>

                        {/* Author and Details Section */}
                        <div className="bg-gray-50 p-4 rounded-md mt-4">
                            <div className="flex flex-col sm:flex-row justify-between gap-4">
                                {/* Author */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Image
                                            src="/icons/Romdol.svg"
                                            alt="Romdol Icon"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="text-secondary text-lg">បង្កើតដោយ៖</span>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Image
                                            className="w-10 h-10 rounded-full object-cover"
                                            src={imageUrl}
                                            alt="User Avatar"
                                            width={40}
                                            height={40}
                                        />
                                        <div className="text-slate-700 text-sm sm:text-base font-semibold">
                                            {recipeData?.user?.fullName}
                                        </div>
                                    </div>
                                </div>

                                {/* Difficulty, Duration, and Category */}
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Image
                                                src="/icons/Romdol.svg"
                                                alt="Romdol Icon"
                                                width={20}
                                                height={20}
                                            />
                                            <span className="text-secondary text-lg">ភាពលំបាក</span>
                                        </div>
                                        <span className="text-slate-700 text-sm sm:text-base font-semibold">
                            {recipeData?.level}
                        </span>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Image
                                                src="/icons/Romdol.svg"
                                                alt="Romdol Icon"
                                                width={20}
                                                height={20}
                                            />
                                            <span className="text-secondary text-lg">រយះពេលចំអិន</span>
                                        </div>
                                        <span className="text-slate-700 text-sm sm:text-base font-semibold">
                            {recipeData?.durationInMinutes} នាទី
                        </span>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Image
                                                src="/icons/Romdol.svg"
                                                alt="Romdol Icon"
                                                width={20}
                                                height={20}
                                            />
                                            <span className="text-secondary text-lg">ប្រភេទ</span>
                                        </div>
                                        <p className="bg-[#FFEBBB] rounded-md font-bold p-1 text-primary px-2 text-sm sm:text-base">
                                            # {recipeData?.categoryName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="py-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Image
                                    src="/icons/Romdol.svg"
                                    alt="Romdol Icon"
                                    width={20}
                                    height={20}
                                />
                                <span className="text-secondary text-xl font-semibold">គ្រឿងផ្សំ៖</span>
                            </div>
                            <div className="w-full bg-gray-50 rounded-md p-4">
                                <IngredientsGroupedByType ingredients={recipeData?.ingredients} />
                            </div>
                        </div>

                        {/* Cooking Steps */}
                        <div className="py-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Image
                                    src="/icons/Romdol.svg"
                                    alt="Romdol Icon"
                                    width={20}
                                    height={20}
                                />
                                <span className="text-secondary text-xl font-semibold">វិធីសាស្រ្តក្នុងការធ្វើ</span>
                            </div>
                            <div className="flex flex-col gap-4 mt-4 text-slate-700">
                                {recipeData?.cookingSteps?.map((step: { id: number; description: string }, index: number) => (
                                    <div className="flex gap-4 items-center" key={step.id}>
                                        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-white font-bold">
                                            {index + 1}
                                        </div>
                                        <div className="w-fit shadow px-3 py-2 rounded-lg bg-gray-100">
                                            <p>{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Background Images */}
                    <div className="flex justify-between items-center mt-10 mb-0">
                        <div className="w-[100px] h-[100px] sm:w-[155px] sm:h-[155px] bg-[url('/icons/kbach-1.svg')] bg-contain bg-no-repeat rotate-180"></div>
                        <div className="w-[100px] h-[100px] sm:w-[155px] sm:h-[155px] bg-[url('/icons/Kbach.svg')] bg-contain bg-no-repeat"></div>
                        <div className="w-[100px] h-[100px] sm:w-[155px] sm:h-[155px] bg-[url('/icons/kbach-1.svg')] bg-contain bg-no-repeat rotate-[-270deg]"></div>
                    </div>
                </div>
            </section>

            <section className={"relative mt-36 hidden sm:hidden"}>
                <Image
                    src={"/icons/Asset-2.svg"}
                    alt={"kbach"}
                    width={155}
                    height={155}
                    className={"absolute top-0 right-0"}
                />
                <Image
                    src={"/icons/Asset-1.svg"}
                    alt={"kbach"}
                    width={175}
                    height={175}
                    className={"absolute top-0 left-0"}
                />
            </section>
        </main>
    );
}