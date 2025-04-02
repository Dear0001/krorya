import React, {useEffect, useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Image from "next/image";
import {useGetAllFoodQuery} from "@/redux/services/food";
import {useGetAllCategoriesQuery} from "@/redux/services/category";
import {useUploadFileMutation} from "@/redux/services/file";
import {useUpdateRecipeMutation} from "@/redux/services/recipe";
import {toast, ToastContainer} from "react-toastify";
import {convertRomanToKhmerWithIndex, getImageUrl, getRecipeSchema} from "@/lib/constants";
import type {FormData} from "@/lib/definition";
import Loading from "@/components/loading/Loading";
import style from "@/app/style/recipe-form.module.css";


type UploadFileResponse = {
    message: string;
    payload: string[];
};

type RecipeFormProps = {
    onSuccess?: () => void,
    editRecipeData?: FormData,
    recipeId: string,
};


const schema = getRecipeSchema();

export default function RecipeForm({ onSuccess, editRecipeData }: RecipeFormProps) {
    // console.log("Edit Recipe Data:", editRecipeData);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [, setSelectedCategory] = useState<number | null>(null);
    const [, setSelectedCuisine] = useState<number | null>(null);
    const [isFormOpen,] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(true);

    const [uploadFile] = useUploadFileMutation();
    const [updateRecipe, { isLoading: isUpdateRecipe }] = useUpdateRecipeMutation();

    // Fetch cuisines and categories
    const { data: cuisinesData } = useGetAllFoodQuery({ page: 0, pageSize: 10 });
    const { data: categoriesData } = useGetAllCategoriesQuery({ page: 0, pageSize: 10 });

    const cuisines = cuisinesData?.payload;
    const categories = categoriesData?.payload;

    const handleCategoryChange = (categoryId: number) => {
        setValue("categoryId", categoryId);
    };

    const handleCuisineChange = (cuisineId: number) => {
        setValue("cuisineId", cuisineId);
    };

    const {
        register,
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema) as any,
        defaultValues: editRecipeData ?? {
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

    useEffect(() => {
        if (editRecipeData) {
            const photoUrl = editRecipeData?.photo?.[0]?.photo || "";
            const fileName = photoUrl.split("/").pop();
            const baseUrl = getImageUrl(fileName);

            setValue("photo", [{ photo: photoUrl }]);
            setValue("name", editRecipeData?.name);
            setValue("description", editRecipeData?.description);
            setValue("durationInMinutes", editRecipeData?.durationInMinutes);
            setValue("level", editRecipeData?.level);
            setValue("categoryId", editRecipeData?.categoryId);
            setValue("cuisineId", editRecipeData?.cuisineId);
            setValue("ingredients", editRecipeData?.ingredients);
            setValue("cookingSteps", editRecipeData?.cookingSteps);

            // Set the selectedImage state with the existing image URL
            setSelectedImage(baseUrl || "/assets/image_placeholder.png");
            setSelectedCategory(editRecipeData?.categoryId);
            setSelectedCuisine(editRecipeData?.cuisineId);
        }
    }, [editRecipeData, setValue]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            // Display preview
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            console.log("Selected Image::", imageUrl);

            // Upload to API
            const formData = new FormData();
            formData.append("files", file);


            const response = await uploadFile(formData).unwrap() as unknown as UploadFileResponse;
            const uploadedFileName = response.payload?.[0] || "";
            console.log("Uploaded file name::", uploadedFileName);
            // slit
            const fileName = uploadedFileName.split("/").pop();

            if (fileName) {
                setValue("photo.0.photo", fileName);
            } else {
                console.error("File upload failed: No file name returned");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.error("Image upload failed. Please try again.");
        }
    };

    const onSubmit = async (data: FormData, event?: React.BaseSyntheticEvent) => {
        event?.preventDefault();
        try {
            if (!editRecipeData?.id) {
                toast.error("Error: No recipe ID provided for update.");
                return;
            }

            let fileName = data.photo?.[0]?.photo || "";
            const finalData = {
                ...data,
                photo: [{ photo: fileName }],
            };

            const response = await updateRecipe({
                id: editRecipeData.id,
                FormData: finalData,
            }).unwrap();

            if (response?.message) {
                toast.success(response.message);
            }

            setTimeout(() => {
                setIsFormVisible(false);
                if (onSuccess) onSuccess();
            }, 3000);

        } catch (error: any) {
            console.error("Error updating recipe:", error);
            const errorMessage = error?.data?.message || "Failed to update recipe. Please try again.";
            toast.error(errorMessage);
        }
    };

    const { fields: ingredientFields, append: addIngredient, remove: removeIngredient } = useFieldArray({ control, name: "ingredients" });
    const { fields: cookingStepFields, append: addCookingStep, remove: removeCookingStep } = useFieldArray({ control, name: "cookingSteps" });

    if (!isFormOpen) return null;


    return (
        <main>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="max-h-[700px] no-scrollbar mx-2 overflow-y-scroll no-scrollbar">
                <form onSubmit={handleSubmit((data, event) => onSubmit(data, event))} className="space-y-4">
                    {/* Recipe Name */}
                    <div className={"mb-5"}>
                        <label className={style.label}>
                            Recipe Name
                        </label>
                        <input
                            {...register("name")}
                            className={style.input}
                            placeholder="Enter recipe name"
                        />
                        <p className="text-red-500">{errors.name?.message}</p>
                    </div>

                    {/* Image Upload */}
                    <label htmlFor="dropzone-file"
                           className={style.labelFile}>
                        {selectedImage ? (
                            <div className="relative w-[250px] h-[250px]">
                                <Image
                                    src={selectedImage}
                                    alt="Preview"
                                    fill
                                    objectFit="cover"
                                    className="rounded-lg"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                            </div>
                        )}

                        <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload}/>
                    </label>

                    {/* Description */}
                    <div className={"mb-5"}>
                        <label className={style.label}>
                            Description
                        </label>
                        <textarea
                            {...register("description")}
                            className={style.input}
                            placeholder="Enter description"
                        />
                        <p className="text-red-500">{errors.description?.message}</p>
                    </div>

                    {/* Duration Slider */}
                    <div className="mb-5">
                        <label className={style.label}>
                            រយៈពេលធ្វើរូបមន្ត
                        </label>
                        <div className="relative w-full">
                            <input
                                type="range"
                                min="1"
                                max="120"
                                {...register("durationInMinutes")}
                                className="w-full appearance-none h-2 rounded-lg border-2 border-primary cursor-pointer transition-all duration-200"
                                style={{
                                    background: `linear-gradient(to right, #d7ad45 ${((watch("durationInMinutes") - 1) / 119) * 100}%, #E5E7EB ${((watch("durationInMinutes") - 1) / 119) * 100}%)`,
                                }}
                            />
                        </div>
                        <p className="text-center mt-2 text-lg font-semibold text-primary">
                            {watch("durationInMinutes")} នាទី
                        </p>
                    </div>

                    {/* Level Selection */}
                    <div className="mb-5">
                        <label className={style.label}>
                            កម្រិត
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {(["Easy", "Medium", "Hard"] as const)?.map((lvl) => (
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
                    </div>

                    {/* Categories Selection */}
                    <div className="mb-5">
                        <label className={style.label}>
                            ប្រភេទ
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories?.map((cat: any) => (
                                <button
                                    key={cat.id}
                                    type="button"
                                    className={`px-4 py-2 border rounded-lg ${watch("categoryId") === cat.id ? "bg-[#FFEFB1] text-secondary" : ""}`}
                                    onClick={() => handleCategoryChange(cat.id)}
                                >
                                    {cat.categoryName}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cuisine Selection */}
                    <div className="mb-5">
                        <label className={style.label}>
                            ឈ្មោះម្ហូប
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {cuisines?.map((cuisine: any) => (
                                <button
                                    key={cuisine.id}
                                    type="button"
                                    className={`px-4 py-2 border rounded-lg transition-all duration-200 ${
                                        watch("cuisineId") === cuisine.id ? "bg-[#FFEFB1] text-secondary border-primary" : "border-gray-300"
                                    }`}
                                    onClick={() => handleCuisineChange(cuisine.id)}
                                >
                                    {cuisine.cuisineName}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className={"mb-5"}>
                        <label className={style.label}>
                            គ្រឿងផ្សំ
                        </label>
                        {ingredientFields?.map((field, index) => (
                            <div key={field.id} className="flex gap-2 mb-2 items-center">
                                <input
                                    {...register(`ingredients.${index}.name`)}
                                    className={style.input}
                                    placeholder="ឈ្មោះគ្រឿងផ្សំ"
                                />
                                <input
                                    {...register(`ingredients.${index}.quantity`)}
                                    className={style.input}
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
                    </div>

                    {/* Cooking Steps */}
                    <div className={"mb-5"}>
                        <label className={style.label}>
                            ជំហានក្នុងការធ្វើម្ហូប
                        </label>
                        {cookingStepFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-center mb-2">
                                <span className="font-bold text-primary">{convertRomanToKhmerWithIndex(index + 1).toString()}.</span>
                                <input
                                    {...register(`cookingSteps.${index}.description`)}
                                    className={style.input}
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
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        onClick={() => console.log("Submit button clicked")}
                        className={`bg-primary py-2 px-5 rounded-lg text-white ${
                            isUpdateRecipe ? "opacity-50 cursor-not-allowed" : "hover:bg-primary hover:outline-amber-200"
                        }`}
                        disabled={isUpdateRecipe}
                    >
                        {isUpdateRecipe ? <Loading/> : "កែប្រែរូបមន្ដ"}
                    </button>


                </form>
            </div>
        </main>
    );
}