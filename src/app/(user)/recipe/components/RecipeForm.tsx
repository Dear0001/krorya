"use client"
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useGetAllFoodQuery } from "@/redux/services/food";
import { useGetAllCategoriesQuery } from "@/redux/services/category";
import { useUploadFileMutation } from "@/redux/services/file";
import { usePostRecipeMutation } from "@/redux/services/recipe";
import { toast } from "react-toastify";
import {convertRomanToKhmerWithIndex, getRecipeSchema} from "@/lib/constants";
import type { FormData } from "@/lib/definition";
import Loading from "@/components/loading/Loading";
import style from "@/app/style/recipe-form.module.css";

type UploadFileResponse = {
    message: string;
    payload: string[];
};

type RecipeFormProps = {
    onSuccess?: () => void;
};

const schema = getRecipeSchema();

export default function RecipeForm({ onSuccess }: RecipeFormProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedCuisine, setSelectedCuisine] = useState<number | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(true);
    const [categoryError, setCategoryError] = useState<string | null>(null);
    const [cuisineError, setCuisineError] = useState<string | null>(null);

    const [uploadFile] = useUploadFileMutation();
    const [createRecipe, { isLoading: isCreatingRecipe }] = usePostRecipeMutation();

    // Fetch cuisines and categories separately
    const { data: cuisinesData } = useGetAllFoodQuery({ page: 0, pageSize: 10 });
    const { data: categoriesData } = useGetAllCategoriesQuery({ page: 0, pageSize: 10 });

    const cuisines = cuisinesData?.payload;
    const categories = categoriesData?.payload;

    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema) as any,
        defaultValues: {
            id: 0,
            photo: [{ photo: "" }],
            name: "",
            description: "",
            durationInMinutes: 10,
            level: "Easy",
            categoryId: 0,
            cuisineId: 0,
            ingredients: [{ id: Date.now(), name: "", quantity: "", price: 0 }],
            cookingSteps: [{ id: 0, description: "" }],
        },
    });

    const { fields: ingredientFields, append: addIngredient, remove: removeIngredient } = useFieldArray({ control, name: "ingredients" });
    const { fields: cookingStepFields, append: addCookingStep, remove: removeCookingStep } = useFieldArray({ control, name: "cookingSteps" });

    const duration = watch("durationInMinutes");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setValue("photo.0.photo", imageUrl);
        } catch (error) {
            console.error("Error creating object URL:", error);
        }
    };

    const onSubmit = async (data: FormData) => {
        // Validate category and cuisine selection
        if (!selectedCategory) {
            setCategoryError("Please select a category.");
            return;
        } else {
            setCategoryError(null);
        }

        if (!selectedCuisine) {
            setCuisineError("Please select a cuisine.");
            return;
        } else {
            setCuisineError(null);
        }

        try {
            // Set default value for description if empty
            if (!data.description) {
                data.description = "មិនមទាន់ានទេ";
            }

            // Set default value for quantity if empty for each ingredient
            data.ingredients = data.ingredients.map(ingredient => ({
                ...ingredient,
                quantity: ingredient.quantity || "លៃឲ្យល្មម",
            }));

            let uploadedFileName = data.photo?.[0]?.photo || "";
            let fileName = uploadedFileName;

            if (selectedImage && selectedImage.startsWith("blob:")) {
                const formData = new FormData();
                const fileInput = document.getElementById("dropzone-file") as HTMLInputElement;

                if (fileInput?.files?.[0]) {
                    formData.append("files", fileInput.files[0]);

                    try {
                        const response = await uploadFile(formData).unwrap() as unknown as UploadFileResponse;
                        const fileUrl = response.payload?.[0] || "";
                        fileName = fileUrl.split("/").pop() || uploadedFileName;
                    } catch (uploadError) {
                        console.error("File upload failed:", uploadError);
                        throw new Error("Image upload failed, please try again.");
                    }
                }
            }

            const finalData = {
                ...data,
                id: 0,
                photo: [{ photo: fileName }],
            };

            try {
                await createRecipe(finalData).unwrap();
                toast.success("Recipe created successfully!");
                setIsFormOpen(false);
                if (onSuccess) {
                    onSuccess();
                }
            } catch (recipeError) {
                throw new Error("Failed to create recipe, please try again.");
            }
        } catch (error) {
            console.error("Error creating recipe:", error);
            toast.error("Failed to create recipe. Please try again.");
        }
    };

    if (!isFormOpen) {
        return null;
    }

    const level = ["Easy", "Medium", "Hard"];

    return (
        <main className="max-h-[700px] no-scrollbar overflow-y-auto sm:max-h-[500px] md:max-h-[600px] lg:max-h-[700px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Recipe Name */}
                <section className={"mb-5"}>
                    <label className={style.label}>
                        Recipe Name
                    </label>
                    <input
                        {...register("name")}
                        className={`${style.input} focus:outline-primary`}
                        placeholder="Enter recipe name"
                    />
                    <p className="text-red-500">{errors.name?.message}</p>
                </section>

                {/* Image Upload */}
                <section className="flex flex-col items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white">
                        {selectedImage ? (
                            <Image src={selectedImage} alt="Preview" width={250} height={250} className="rounded-lg" />
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            </div>
                        )}
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} />
                    </label>
                </section>

                {/* Description */}
                <section className={"mb-5"}>
                    <label className={style.label}>
                        Description
                    </label>
                    <textarea
                        {...register("description")}
                        className={`${style.input} focus:outline-primary`}
                        placeholder="Enter description"
                    />
                    <p className="text-red-500">{errors.description?.message}</p>
                </section>

                {/* Duration Slider */}
                <section className="mb-5">
                    <label className={style.label}>
                        រយៈពេលធ្វើម្ហូប
                    </label>
                    <div className="relative w-full">
                        <input
                            type="range"
                            min="1"
                            max="120"
                            {...register("durationInMinutes")}
                            className="w-full appearance-none h-2 rounded-lg border-2 border-primary cursor-pointer transition-all duration-200"
                            style={{
                                background: `linear-gradient(to right, #d7ad45 ${((duration - 1) / 119) * 100}%, #E5E7EB ${((duration - 1) / 119) * 100}%)`,
                            }}
                        />
                    </div>
                    <p className="text-center mt-2 text-lg font-semibold text-primary">{convertRomanToKhmerWithIndex(duration)} នាទី
                    </p>
                </section>

                {/* Level Selection */}
                <section className="mb-5">
                    <label className={style.label}>
                        កម្រិត
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {(level)?.map((lvl) => (
                            <button
                                key={lvl}
                                type="button"
                                className={`px-4 py-2 border rounded-lg ${watch("level") === lvl ? "bg-[#FFEFB1] text-secondary" : ""}`}
                                onClick={() => setValue("level", lvl)}
                            >
                                {lvl}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Categories Selection */}
                <section className={"mb-5"}>
                    <label className={style.label}>
                        ប្រភេទ
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {categories?.map((cat: any) => (
                            <button
                                key={cat.id}
                                type="button"
                                className={`px-4 py-2 border rounded-lg ${selectedCategory === cat.id ? "bg-[#FFEFB1] text-secondary" : ""}`}
                                onClick={() => {
                                    setSelectedCategory(cat.id);
                                    setValue("categoryId", cat.id);
                                    setCategoryError(null); // Clear category error on selection
                                }}
                            >
                                {cat.categoryName}
                            </button>
                        ))}
                    </div>
                    {categoryError && <p className="text-red-500">{categoryError}</p>}
                </section>

                {/* Cuisine Selection */}
                <section>
                    <label className={style.label}>
                        ឈ្មោះម្ហូប
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {cuisines?.map((cuisine: any) => (
                            <button
                                key={cuisine.id}
                                type="button"
                                className={`px-4 py-2 border rounded-lg ${selectedCuisine === cuisine.id ? "bg-[#FFEFB1] text-secondary" : ""}`}
                                onClick={() => {
                                    setSelectedCuisine(cuisine.id);
                                    setValue("cuisineId", cuisine.id);
                                    setCuisineError(null);
                                }}
                            >
                                {cuisine.cuisineName}
                            </button>
                        ))}
                    </div>
                    {cuisineError && <p className="text-red-500">{cuisineError}</p>}
                </section>

                {/* Ingredients */}
                <section className={"mb-5"}>
                    <label className={style.label}>
                        គ្រឿងផ្សំ
                    </label>
                    {ingredientFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mb-2 items-center ">
                            <input
                                {...register(`ingredients.${index}.name`)}
                                className={`${style.input} focus:outline-primary`}
                                placeholder="ឈ្មោះគ្រឿងផ្សំ"
                            />
                            <input
                                {...register(`ingredients.${index}.quantity`)}
                                className={`${style.input} focus:outline-primary`}
                                placeholder="បរិមាណ"
                            />
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    {...register(`ingredients.${index}.price`)}
                                    className="w-full pl-7 text-color-2 leading-6 bg-transparent flex items-start gap-2.5 pt-3.5 pb-3.5 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300"
                                    placeholder="តម្លៃ"
                                />
                            </div>
                            <button
                                type="button"
                                className="text-red-500 font-bold px-2 py-1 bg-gray-200 rounded hover:bg-red-500 hover:text-white transition"
                                onClick={() => removeIngredient(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <div className="flex w-full text-white text-2xl justify-center">
                        <button
                            type="button"
                            className="mt-2 py-[2px] px-2.5 btn bg-primary rounded-[45%] text-center"
                            onClick={() => addIngredient({ id: Date.now(), name: "", quantity: "", price: 0 })}
                        >
                            +
                        </button>
                    </div>
                </section>

                {/* Cooking Steps */}
                <section className={"mb-5"}>
                    <label className={style.label}>
                        ជំហានក្នុងការធ្វើម្ហូប
                    </label>
                    {cookingStepFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-center mb-2">
                            <span className="font-bold text-primary">{convertRomanToKhmerWithIndex(index + 1).toString()}.</span>
                            <input
                                {...register(`cookingSteps.${index}.description`)}
                                className={`${style.input} focus:outline-primary`}
                                placeholder="Describe the step"
                            />
                            <button
                                type="button"
                                className="text-red-500 font-bold px-2 py-1 bg-gray-200 rounded hover:bg-red-500 hover:text-white transition"
                                onClick={() => removeCookingStep(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <div className="flex w-full text-white text-2xl justify-center">
                        <button
                            type="button"
                            className="mt-2 py-[2px] px-2.5 btn bg-primary rounded-[45%] text-center"
                            onClick={() => addCookingStep({ id: Date.now(), description: "" })}
                        >
                            +
                        </button>
                    </div>
                </section>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-primary py-2 px-5 rounded-lg text-white"
                    disabled={isCreatingRecipe}
                >
                    {isCreatingRecipe ? <Loading/> : "បង្កើតរូបមន្ត"}
                </button>
            </form>
        </main>
    );
}