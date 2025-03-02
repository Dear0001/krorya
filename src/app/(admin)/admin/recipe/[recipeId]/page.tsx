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

export default function FoodDetailPage() {
    const [groceryList, ] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<string>("");
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
        <main className={"h-screen overflow-auto scrollbar-hide"}>
            <section className={"flex flex-col gap-6 relative"}>
                <div className={"relative mx-20 h-[444px]"}>
                    <Image
                        src={recipeImageUrl}
                        alt={"Recipe Image"}
                        className={"rounded-lg w-full h-full object-cover"}
                        layout="fill"
                        quality={100}
                    />
                </div>
                <div className={" bg-white self-center w-2/3 absolute top-3/4 rounded-md"}>
                <div className={" flex flex-col items-center pt-14 px-14 gap-4"}>
                <span
                    className={"font-moulpali text-5xl text-center text-secondary"}
                >
                  {recipeData?.name}
                </span>
                        <Image
                            className={"pt-3"}
                            src={"/icons/Kbach.svg"}
                            alt={"logo"}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className={" pt-14 px-14"}>
                        <div>
                            <div className={"flex items-center gap-2 mb-2"}>
                                <Image
                                    src={"/icons/Romdol.svg"}
                                    alt="Romdol Icon"
                                    width={20}
                                    height={20}
                                />
                                <span className={"text-secondary text-xl font-semibold"}>
                  អំពីមុខម្ហូប៖
                </span>
                            </div>
                            <p className="text-slate-700">{recipeData?.description}</p>
                        </div>
                        <div
                            className={
                                "flex gap-2 my-2 p-4 border-t mt-4 border-b justify-between "
                            }
                        >
                            <div className={"flex gap-8  "}>
                                <div className={"flex flex-col items-center gap-4"}>
                                    <Image
                                        src={"/icons/heart click Final.png"}
                                        alt="Romdol Icon"
                                        width={23}
                                        height={23}
                                    />
                                    <span className="text-slate-700">រក្សាទុក</span>
                                </div>
                                <div className={"flex flex-col items-center gap-4"}>
                                    <Image
                                        src={"/icons/iconamoon_restart-thin.svg"}
                                        alt="Romdol Icon"
                                        width={23}
                                        height={23}
                                    />
                                    <span className="text-slate-700">បង្កើតម្តងទៀត</span>
                                </div>
                                <div className={"flex flex-col items-center gap-4"}>
                                    <button
                                        className="flex flex-col items-center gap-4"
                                        onClick={() =>
                                            (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal()
                                        }
                                    >
                                        <Image
                                            src={"/icons/material-symbols-light_not-started-outline.svg"}
                                            alt="Romdol Icon"
                                            width={23}
                                            height={23}
                                        />
                                        <span className="text-slate-700">ចាប់ផ្ដើមចម្អិន</span>
                                    </button>
                                    <dialog id="my_modal_1" className="modal    ">
                                        <div className="modal-box max-w-fit  flex flex-col items-center bg-white text-slate-700 p-0 w-[1000px] rounded-lg  hide-scrollbar">
                                            <CookingStep cookingSteps={recipeData?.cookingSteps} image={recipeData?.photo}/>
                                        </div>
                                    </dialog>
                                </div>
                                <div className={"flex flex-col items-center gap-4"}>
                                    <button
                                        className="flex flex-col items-center gap-4"
                                        onClick={() =>
                                            (document.getElementById("my_modal_2") as HTMLDialogElement)?.showModal()
                                        }
                                    >
                                        <Image
                                            src={"/icons/gala_add.svg"}
                                            alt="Romdol Icon"
                                            width={23}
                                            height={23}
                                        />
                                        <span className="text-slate-700">
                      បញ្ចូលក្នុងបញ្ជីមុខម្ហូប
                    </span>
                                    </button>
                                    <dialog id="my_modal_2" className="modal   ">
                                        <div className="modal-box w-64 flex flex-col items-start bg-white text-slate-700">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                    ✕
                                                </button>
                                            </form>
                                            <h3 className="text-slate-700 font-semibold">
                                                រក្សាទុកក្នុងបញ្ជីគ្រឿងទេស
                                            </h3>
                                            <div>
                                                {/* Search input */}
                                                <input
                                                    type="text"
                                                    name="search"
                                                    placeholder="ប្រភេទមុខម្ហូប...."
                                                    className="input input-bordered w-full bg-white mt-4"
                                                    value={selectedItems}
                                                    onChange={(e) => setSelectedItems(e.target.value)}
                                                />

                                                {/* Grocery list checkboxes */}
                                                <form
                                                    className="flex flex-col self-start w-full mt-4"
                                                    onSubmit={(e) => e.preventDefault()}
                                                >
                                                    <div className="form-control w-fit">
                                                        {selectedItems === "" ? (
                                                                // Show all groceryList items when searchTerm is empty
                                                                groceryList?.map((item, index) => (
                                                                    <label
                                                                        key={index}
                                                                        className="label cursor-pointer flex items-center"
                                                                    >
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                type="radio"
                                                                                name="groceryList"
                                                                                onChange={(event) =>
                                                                                    setSelectedItems(event.target.value)
                                                                                }
                                                                                className="checkbox border-primary [--chkbg:theme(#D7AD45)] [--chkfg:white] checkbox-warning mr-2"
                                                                            />
                                                                            <span className="label-text text-slate-700">
                                      {item.groceryListTitle}
                                    </span>
                                                                        </div>
                                                                    </label>
                                                                ))
                                                            ) : // Show filtered groceryList items
                                                            groceryList?.length > 0 ? (
                                                                groceryList?.map((item, index) => (
                                                                    <label
                                                                        key={index}
                                                                        className="label cursor-pointer flex items-center"
                                                                    >
                                                                        <div className="flex items-center">
                                                                            <input
                                                                                type="radio"
                                                                                name="groceryList"
                                                                                className="checkbox border-primary [--chkbg:theme(#D7AD45)] [--chkfg:white] checkbox-warning mr-2"
                                                                            />
                                                                            <span className="label-text text-slate-700">
                                      {item.groceryListTitle}
                                    </span>
                                                                        </div>
                                                                    </label>
                                                                ))
                                                            ) : (
                                                                <span>មិនមាន</span>
                                                            )}
                                                    </div>
                                                    <button>Click</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </div>
                            </div>
                            <div className={"flex flex-col items-center gap-4"}>
                                <button
                                    className="flex flex-col items-center gap-4"
                                    onClick={() =>
                                        (document.getElementById("my_modal_3kjy") as HTMLDialogElement)?.showModal()
                                    }
                                >
                                    <Image
                                        src={"/icons/pancel.svg"}
                                        alt="Romdol Icon"
                                        width={23}
                                        height={23}
                                    />
                                    <span className="text-slate-700">កែប្រែរូបមន្ដ</span>
                                </button>
                                <dialog id="my_modal_3kjy" className="modal rounded-lg w-[650px]">
                                    <div className="modal-box py-5 px-5 flex flex-col items-center text-slate-700">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                ✕
                                            </button>
                                        </form>
                                        <h3 className="font-bold mb-5 text-lg font-moulpali text-secondary text-center">
                                            កែប្រែរូបមន្ដ
                                        </h3>
                                        <Image
                                            src={"/icons/Kbach.svg"}
                                            width={100}
                                            height={100}
                                            alt={"image"}
                                            className={"mb-5"}
                                        />
                                        <EditRecipeForm editRecipeData={transformedRecipe} recipeId={recipeId} onSuccess={closeModal} />
                                    </div>
                                </dialog>
                            </div>
                        </div>
                        {/*show author*/}
                        <div>
                            <div className={"bg-gray-50 p-4 rounded-md mt-5"}>
                                <div className={"flex justify-between gap-4"}>
                                    <div>
                                        <div
                                            className={
                                                "flex flex-row justify-center items-center gap-2 mb-2"
                                            }
                                        >
                                            <Image
                                                src={"/icons/Romdol.svg"}
                                                alt="Romdol Icon"
                                                width={20}
                                                height={20}
                                            />
                                            <span className={"text-secondary text-lg   "}>
                                            បង្កើតដោយ៖
                                          </span>
                                        </div>
                                        <div className="flex gap-2 text-start justify-center items-center">
                                            <Image
                                                className="btn w-[45px] h-[45px] btn-circle btn-sm object-cover rounded-full"
                                                src={imageUrl}
                                                alt="Romdol Icon"
                                                width={100}
                                                height={100}
                                            />
                                            <div className="text-slate-700 text-md font-semibold">
                                                {recipeData?.user?.fullName}
                                            </div>
                                        </div>

                                    </div>
                                    <div className={"flex gap-20"}>
                                        <div>
                                            <div
                                                className={
                                                    "flex flex-row justify-center items-center gap-2 mb-2"
                                                }
                                            >
                                                <Image
                                                    src={"/icons/Romdol.svg"}
                                                    alt="Romdol Icon"
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className={"text-secondary text-lg   "}>
                                              ភាពលំបាក
                                            </span>
                                            </div>
                                            <div className={"flex flex-row justify-start pl-7 items-center gap-2 mb-2"}>
                                                <span className={"text-slate-700 text-md font-semibold"}>
                                                  {recipeData?.level}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                className={
                                                    "flex flex-row justify-center items-center gap-2 mb-2"
                                                }
                                            >
                                                <Image
                                                    src={"/icons/Romdol.svg"}
                                                    alt="Romdol Icon"
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className={"text-secondary text-lg   "}>
                                              រយះពេលចំអិន
                                            </span>
                                            </div>
                                            <div
                                                className={
                                                    "flex flex-row justify-start pl-7 items-center gap-2 mb-2"
                                                }
                                            >
                                            <span
                                                className={"text-slate-700 text-md font-semibold"}
                                            >
                                              {recipeData?.durationInMinutes} នាទី
                                            </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                className={
                                                    "flex flex-row justify-center items-center gap-2 mb-2"
                                                }
                                            >
                                                <Image
                                                    src={"/icons/Romdol.svg"}
                                                    alt="Romdol Icon"
                                                    width={20}
                                                    height={20}
                                                />
                                                <span className={"text-secondary text-xl"}>
                                                    ប្រភេទ
                                                </span>
                                            </div>

                                            <div
                                                className={
                                                    "flex flex-row justify-start pl-7 items-center gap-2 mb-2"
                                                }
                                            >
                                                <p className={"bg-[#FFEBBB] rounded-md font-bold p-1 text-primary px-2"}>
                                                    # {recipeData?.categoryName}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*listing ingredients*/}
                        <div className={" py-4"}>
                            <div>
                                <div
                                    className={"flex flex-row justify- items-center gap-2 mb-2"}
                                >
                                    <Image
                                        src={"/icons/Romdol.svg"}
                                        alt="Romdol Icon"
                                        width={20}
                                        height={20}
                                    />
                                    <span className={"text-secondary text-xl font-semibold   "}>
                                         គ្រឿងផ្សំ៖
                                    </span>
                                </div>
                                <div className={"w-full mb-2 bg-gray-50 rounded-md"}>
                                    <IngredientsGroupedByType ingredients={recipeData?.ingredients} />
                                </div>
                            </div>
                        </div>
                        {/*Cooking step lists*/}
                        <div className={" py-4"}>
                            <div>
                                <div
                                    className={
                                        "flex flex-row justify-start items-center gap-2 mb-2"
                                    }
                                >
                                    <Image
                                        src={"/icons/Romdol.svg"}
                                        alt="Romdol Icon"
                                        width={20}
                                        height={20}
                                    />
                                    <span className={"text-secondary text-xl font-semibold   "}>
                                    វិធីសាស្រ្តក្នុងការធ្វើ
                                  </span>
                                </div>

                                <div className={"flex flex-col gap-4 mt-4 text-slate-700"}>
                                    {recipeData?.cookingSteps?.map((step: { id: number; description: string }, index: number) => (
                                        <div className="flex gap-4 items-center" key={step.id}>
                                            {/* Circular Index */}
                                            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-white font-bold">
                                                {index + 1}
                                            </div>

                                            {/* Description Box */}
                                            <div className="w-fit shadow px-3 py-2 rounded-lg bg-gray-100">
                                                <p>{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*images*/}
                    <div className={"flex justify-between mt-20 mb-0"}>
                        <Image
                            src={"/icons/kbach-1.svg"}
                            alt={"kbach"}
                            width={155}
                            height={155}
                            className={"top-0 right-0 rotate-[180deg]"}
                        />
                        <Image
                            src={"/icons/kbach.svg"}
                            alt={"kbach"}
                            width={155}
                            height={155}
                        />
                        <Image
                            src={"/icons/kbach-1.svg"}
                            alt={"kbach"}
                            width={155}
                            height={155}
                            className={"top-0 right-0 rotate-[-270deg]"}
                        />
                    </div>
                </div>
            </section>

            <section className={"relative mt-36"}>
                <Image
                    src={"/icons/Asset-2.svg"}
                    alt={"kbach"}
                    width={155}
                    height={155}
                    className={"absolute fixed top-0 right-0"}
                />
                <Image
                    src={"/icons/Asset-1.svg"}
                    alt={"kbach"}
                    width={175}
                    height={175}
                    className={"absolute fixed top-0 left-0"}
                />
            </section>
        </main>
    );
}