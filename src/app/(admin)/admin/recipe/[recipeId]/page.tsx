"use client";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useParams } from "next/navigation";
import { useGetRecipeByIdQuery } from "@/redux/services/recipe";
import { getImageUrl } from "@/lib/constants";
import IngredientsGroupedByType from "@/app/(admin)/admin/recipe/components/ui/IngredientsGroupedByType";
import CookingStep from "../components/ui/CookingStep";

type Recipe = {
    id: number;
    name: string;
    description: string;
    level: string;
    durationInMinutes: number;
    cookingSteps: { id: number; description: string }[];
    ingredients: { id: number; name: string; quantity: string; price: number }[];
    photo: { photoId: number; photo: string }[];
    user: {
        id: number;
        fullName: string;
        profileImage: string;
    };
}


export default function FoodDetailPage() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [groceryList, setGroceryList] = useState<any[]>([]);
    const [selectedItems, setSelectedItems] = useState<string>("");

    const params = useParams();
    const recipeId = params?.recipeId as string;
    const { data: recipes, isLoading, error } = useGetRecipeByIdQuery({ id: Number(recipeId) });


    const recipeData = recipes?.payload;
    console.log("data from url:", recipeData);

    // Check if the user profile data is loaded and if there's a profile image
    const userProfile = recipeData?.user?.profileImage;
    console.log("userProfile", userProfile);
    const recipeImage = recipeData?.photo[0]?.photo;


    // Use the getImageUrl function to construct the full image URL
    const imageUrl = getImageUrl(userProfile);
    const recipeImageUrl = getImageUrl(recipeImage);
    console.log("recipeImageUrl", recipeImageUrl);


    return (
        <>
            <ToastContainer />
            <section className={"flex flex-col gap-6 relative"}>
                <div className={"relative rounded-lg"}>
                    <div className={"h-96 rounded-md"}></div>
                    <Image
                        src={recipeImageUrl}
                        fill
                        alt={"image"}
                        style={{
                            borderRadius: "6px",
                        }}
                        className={"rounded-lg px-20 object-cover"}
                    />
                </div>

                <div
                    className={
                        " bg-white self-center p-14 w-2/3 absolute top-3/4 rounded-md"
                    }
                >
                    <div className={" flex flex-col items-center gap-4"}>
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
                    <div>
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
                                            <CookingStep cookingSteps={recipeData?.cookingSteps}/>
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
                                                                groceryList.map((item, index) => (
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
                                                            groceryList.length > 0 ? (
                                                                groceryList.map((item, index) => (
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
                                        src={"/icons/material-symbols-light_report-outline.svg"}
                                        alt="Romdol Icon"
                                        width={23}
                                        height={23}
                                    />
                                    <span className="text-slate-700">រាយការណ៌</span>
                                </button>
                                <dialog id="my_modal_3kjy" className="modal">
                                    <div className="modal-box flex flex-col items-center bg-white text-slate-700">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                                ✕
                                            </button>
                                        </form>
                                        <h3 className="font-bold text-lg font-moulpali text-secondary text-center">
                                            រាយការណ៍
                                        </h3>
                                        <Image
                                            src={"/icons/Kbach.svg"}
                                            width={100}
                                            height={100}
                                            alt={"image"}
                                        />
                                        <p className="py-4">
                                            ជួយពួកយើងខ្ញុំក្នុងការយល់ដឹងបន្ថែមអំពីបញ្ហាដែលអ្នកបានរកឃើញ។
                                            យើងប្រាកដថា
                                            ការរាយការណ៍របស់អ្នកនិងត្រូវបានផ្ទៀងផ្ទាត់ដោយអ្នកគ្រប់គ្រង
                                            កម្មវិធីមួយនេះ។
                                        </p>
                                        <form
                                            className="flex flex-col self-start w-full"
                                            onSubmit={(e) => e.preventDefault()}
                                        >
                                            <label htmlFor="report font-bold">មូលហេតុ</label>
                                            <textarea
                                                id="report"
                                                name="report"
                                                className="resize-none border mt-3 focus:border-slate-400 focus:outline-slate-400 border-slate-400 bg-white rounded-md w-full h-40 p-4"
                                            ></textarea>
                                            <div className="modal-action">
                                                <button
                                                    type="submit"
                                                    className="btn  w-fit bg-primary text-slate-100 self-end mt-4 border-none hover:bg-primary hover:opacity-65"
                                                >
                                                    បញ្ជូន
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </dialog>
                            </div>
                        </div>
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
                                                className="btn w-[65px] h-[65px] btn-circle btn-sm object-cover rounded-full"
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
                                            <div
                                                className={
                                                    "flex flex-row justify-start pl-7 items-center gap-2 mb-2"
                                                }
                                            >
                        <span
                            className={"text-slate-700 text-md font-semibold"}
                        >
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
                                                <span className={"text-secondary text-lg"}>
                          ម្ហូបសម្រាប់មនុស្ស
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
                          4 នាក់
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                <div className={"flex justify-between items-center gap-6 mb-2"}>
                                    <IngredientsGroupedByType ingredients={recipeData?.ingredients} />
                                </div>
                            </div>
                        </div>
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
                                        <div className={"flex gap-2"} key={step.id}>
        <span className="btn btn-circle btn-xs bg-primary text-slate-700">
            {index + 1}
        </span>
                                            <div className={"w-fit shadow px-2 py-2 rounded-lg bg-gray-100"}>
                                                <p>{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={" py-4"}>
                            <div>
                                <div
                                    className={"flex flex-row justify- items-center gap-2 mb-2"}
                                >
                                    <Image
                                        src={"/icons/Romdol.svg"}
                                        alt="Romdol Icon"
                                        width={25}
                                        height={25}
                                    />
                                    <span className={"text-secondary text-xl font-semibold   "}>
                    ប្រភេទ
                  </span>
                                </div>
                                <div className={"flex  gap-4 mt-4"}>
                                        <p className={"bg-[#FFEBBB] rounded-md p-1 text-primary px-2"}>
                                            # {recipeData?.categoryName}
                                        </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
