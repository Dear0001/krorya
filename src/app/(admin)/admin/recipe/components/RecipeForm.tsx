"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import {useGetAllFoodQuery} from "@/redux/services/food";
import {useGetAllCategoriesQuery} from "@/redux/services/category";
import {useUploadFileMutation} from "@/redux/services/file";
import {usePostRecipeMutation} from "@/redux/services/recipe";

type Ingredient = {
    id: number;
    name: string;
    quantity: string;
    price: number;
};

type CookingStep = {
    id: number;
    description: string;
};

type FormData = {
    photo: { photo: string }[];
    name: string;
    description: string;
    durationInMinutes: number;
    level: "Easy" | "Medium" | "Hard";
    cuisineId: number;
    categoryId: number;
    ingredients: Ingredient[];
    cookingSteps: CookingStep[];
};
type UploadFileResponse = {
    message: string;
    payload: string[];
};

const options = ["ម៉ោង", "នាទី"];

const schema: Yup.ObjectSchema<FormData> = Yup.object({
    photo: Yup.array().of(Yup.object({ photo: Yup.string().required("Photo URL is required") })).required(),
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    durationInMinutes: Yup.number().min(1, "Duration must be at least 1 minute").required("Duration is required"),
    level: Yup.mixed<"Easy" | "Medium" | "Hard">()
        .oneOf(["Easy", "Medium", "Hard"], "Invalid level")
        .required("Level is required"),
    categoryId: Yup.number().required("Category is required"),
    cuisineId: Yup.number().required("Cuisine is required"),
    ingredients: Yup.array()
        .of(
            Yup.object({
                id: Yup.number().required(),
                name: Yup.string().required("Ingredient name is required"),
                quantity: Yup.string().required("Quantity is required"),
                price: Yup.number().min(0, "Price must be positive").required("Price is required"),
            })
        )
        .required(),
    cookingSteps: Yup.array()
        .of(
            Yup.object({
                id: Yup.number().required(),
                description: Yup.string().required("Cooking step is required"),
            })
        )
        .required(),
});

export default function RecipeForm() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedCuisine, setSelectedCuisine] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("");

    const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

    const [createRecipe, { isLoading: isCreatingRecipe }] = usePostRecipeMutation();

    // Fetch cuisines and categories separately
    const { data: cuisinesData, refetch: refetchCuisines } = useGetAllFoodQuery({
        page: 0,
        pageSize: 10,
    });
    const { data: categoriesData, refetch: refetchCategories } = useGetAllCategoriesQuery({
        page: 0,
        pageSize: 10,
    });

    const cuisines = cuisinesData?.payload;
    const categories = categoriesData?.payload;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        setInputValue(event.target.value); // Update input with selected option
    };

    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema) as any,
        defaultValues: {
            photo: [{ photo: "" }],
            name: "",
            description: "",
            durationInMinutes: 10,
            level: "Easy",
            categoryId: 0,
            cuisineId: 0,
            ingredients: [],
            cookingSteps: [{ id: 0, description: "" }],
        },
    });

    const { fields: ingredientFields, append: addIngredient } = useFieldArray({ control, name: "ingredients" });
    const { fields: cookingStepFields, append: addCookingStep } = useFieldArray({ control, name: "cookingSteps" });

    const duration = watch("durationInMinutes");

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setValue("photo.0.photo", imageUrl);
        }
    };

    const onSubmit = async (data: FormData) => {
        try {
            let uploadedFileName = data.photo?.[0]?.photo || ""; // Default to empty string
            let fileName = uploadedFileName; // Keep the original file if no new upload

            // If a new image is selected, upload it
            if (selectedImage && selectedImage.startsWith("blob:")) {
                const formData = new FormData();
                const fileInput = document.getElementById("dropzone-file") as HTMLInputElement;

                if (fileInput?.files?.[0]) {
                    formData.append("files", fileInput.files[0]); // FIX: Ensure it matches the backend requirement

                    try {
                        // Call the upload mutation
                        const response = await uploadFile(formData).unwrap() as unknown as UploadFileResponse;
                        const fileUrl = response.payload?.[0] || "";
                        fileName = fileUrl.split("/").pop() || uploadedFileName; // Extract filename or fallback
                    } catch (uploadError) {
                        console.error("File upload failed:", uploadError);
                        throw new Error("Image upload failed, please try again.");
                    }
                }
            }

            // Prepare the final data with only the filename in the photo array
            const finalData = {
                ...data,
                photo: [{ photo: fileName }],
            };

            console.log("Submitting Recipe:", finalData);

            try {
                await createRecipe(finalData).unwrap();
                // setIsOpen(false); // Reset form or close modal on success
            } catch (recipeError) {
                console.error("Recipe creation failed:", recipeError);
                throw new Error("Failed to create recipe, please try again.");
            }
        } catch (error) {
            console.error("Error submitting recipe:", error);
        }
    };

    return (
        <>
            {/* Scrollable Section */}
            <div className="max-h-[700px] no-scrollbar overflow-y-auto">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Recipe Name */}
                        <div className={"mb-5"}>
                            <label className="text-color-2 font-semibold mb-2.5 flex justify-start">
                                Recipe Name
                            </label>
                            <input {...register("name")}  className="w-full text-color-2 leading-6 bg-transparent flex items-start gap-2.5 pt-3.5 pb-3.5 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300"
                                   placeholder="Enter recipe name" />
                            <p className="text-red-500">{errors.name?.message}</p>
                        </div>
                        {/* Image Upload */}
                        <div className="flex flex-col items-center justify-center w-full">
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
                        </div>
                        {/* Description */}
                        <div className={"mb-5"}>
                            <label className="text-color-2 font-semibold mb-2.5 flex justify-start">
                                Description
                            </label>
                            <textarea {...register("description")}  className="w-full text-color-2 leading-6 bg-transparent flex items-start gap-2.5 pt-3.5 pb-3.5 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300" placeholder="Enter description" />
                            <p className="text-red-500">{errors.description?.message}</p>
                        </div>
                        {/* Duration Slider */}
                        <div className="flex border rounded-lg overflow-hidden">
                            {/* User Input */}
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleChange}
                                placeholder="Type or select..."
                                className="w-full text-color-2 leading-6 bg-transparent flex items-start gap-2.5 pt-3.5 pb-3.5 px-4 rounded-l-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300"
                            />

                            {/* Dropdown */}
                            <select
                                value={selectedOption}
                                onChange={handleSelect}
                                className="p-2 bg-gray-200 border-none outline-none"
                            >
                                <option value="">Select</option>
                                {options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Categories Selection */}
                        <div className={"mb-5"}>
                            <label className="text-color-2 font-semibold mb-2.5 flex justify-start">
                                ប្រភេទ
                            </label>
                            <div className="flex gap-2">
                                {categories?.map((cat: any) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        className={`px-4 py-2 border rounded-lg ${selectedCategory === cat.id ? "bg-[#FFEFB1] text-secondary" : ""}`}
                                        onClick={() => {
                                            setSelectedCategory(cat.id);
                                            setValue("categoryId", cat.id);
                                        }}
                                    >
                                        {cat.categoryName}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Cuisine Selection */}
                        <div>
                            <label className="text-color-2 font-semibold mb-2.5 flex justify-start">
                                ឈ្មោះម្ហូប
                            </label>
                            <div className="flex gap-2">
                                {cuisines?.map((cuisine: any) => (
                                    <button
                                        key={cuisine.id}
                                        type="button"
                                        className={`px-4 py-2 border rounded-lg ${selectedCuisine === cuisine.id ? "bg-[#FFEFB1] text-secondary" : ""}`}
                                        onClick={() => {
                                            setSelectedCuisine(cuisine.id);
                                            setValue("cuisineId", cuisine.id);
                                        }}
                                    >
                                        {cuisine.cuisineName}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Ingredients */}
                        <div className={"mb-5"}>
                            <label className="text-color-2 font-semibold mb-2.5 flex justify-start">
                                គ្រឿងផ្សំ
                            </label>
                            {ingredientFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 mb-2">
                                    <input {...register(`ingredients.${index}.name`)} className="w-full text-color-2 leading-6 bg-transparent flex items-start gap-2.5 pt-3.5 pb-3.5 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300" placeholder="Name" />
                                    <input {...register(`ingredients.${index}.quantity`)} className="w-full text-color-2 leading-6 bg-transparent flex items-start gap-2.5 pt-3.5 pb-3.5 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300" placeholder="Quantity" />
                                    <input type="number" {...register(`ingredients.${index}.price`)} className="w-full text-color-2 leading-6 bg-transparent flex items-start gap-2.5 pt-3.5 pb-3.5 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300" placeholder="Price" />
                                </div>
                            ))}
                            <div className={"flex w-full text-white text-2xl justify-center"}>
                                <button type="button" className="mt-2 py-[2px] px-2.5 btn bg-primary rounded-[45%] text-center" onClick={() => addIngredient({ id: Date.now(), name: "", quantity: "", price: 0 })}>
                                    +
                                </button>
                            </div>

                        </div>
                        {/* Cooking Steps */}

                        <div className={"mb-5"}>
                            <label className="text-color-2 font-semibold mb-2.5 flex justify-start">
                                ជំហានក្នុងការធ្វើម្ហូប
                            </label>
                            {cookingStepFields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-center mb-2">
                                    <span className="font-bold">{index + 1}.</span>
                                    <input
                                        {...register(`cookingSteps.${index}.description`)}
                                        className="w-full text-color-2 leading-6 bg-transparent flex items-start gap-2.5 pt-3.5 pb-3.5 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300"
                                        placeholder="Describe the step"
                                    />
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
                        </div>

                        <button type="submit" className="btn bg-primary py-2.5 rounded-md border-none text-white hover:bg-primary hover:outline-amber-200 normal-case w-32 font-normal">
                            បង្កើតរូបមន្ត
                        </button>
                    </form>
                </div>
        </>
    );
}
