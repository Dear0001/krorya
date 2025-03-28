"use client";
import { useState } from "react";
import PaginatedList from "./PaginationList";
import { useGetAllCategoriesQuery, usePostCategoryMutation } from "@/redux/services/category";
import { useGetAllFoodQuery, usePostFoodMutation } from "@/redux/services/food";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CuisineCategoryLayout() {
    const pageSize = 4;

    // Separate state for cuisines and categories
    const [cuisinePage, setCuisinePage] = useState(0);
    const [categoryPage, setCategoryPage] = useState(0);

    // Fetch cuisines and categories separately
    const { data: cuisinesData, refetch: refetchCuisines } = useGetAllFoodQuery({ page: cuisinePage, pageSize });
    const { data: categoriesData, refetch: refetchCategories } = useGetAllCategoriesQuery({ page: categoryPage, pageSize });

    // Mutations for creating cuisines and categories
    const [createCuisine, { isLoading: isCreatingCuisine }] = usePostFoodMutation();
    const [createCategory, { isLoading: isCreatingCategory }] = usePostCategoryMutation();

    // Function for adding a new category
    const handleAddCategory = async (name: string) => {
        try {
            const response = await createCategory({ categoryName: name }).unwrap();

            if (response.statusCode === "200") {
                toast.success(response.message || "Category created successfully");
                refetchCategories();
            } else {
                toast.error(response.message || "Failed to create category");
            }

            // console.log("Category Created:", response);
        } catch (error: any) {
            toast.error(error?.data?.message || "Error creating category");
            console.error("Error creating category:", error?.message || error?.data || error);
        }
    };

    // Function for adding a new cuisine
    const handleAddCuisine = async (name: string) => {
        try {
            const response = await createCuisine({ cuisineName: name }).unwrap();

            if (response.statusCode === "200") {
                toast.success(response.message || "Cuisine created successfully");
                refetchCuisines();
            } else {
                toast.error(response.message || "Failed to create cuisine");
            }

            // console.log("Cuisine Created:", response);
        } catch (error: any) {
            toast.error(error?.data?.message || "Error creating cuisine");
            console.error("Error creating cuisine:", error?.data || error?.message || error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 p-6">
            <ToastContainer />
            {/* Cuisines List */}
            <PaginatedList
                items={cuisinesData?.payload || []}
                title="ម្ហូប"
                onCreate={handleAddCuisine}
                currentPage={cuisinePage}
                setCurrentPage={setCuisinePage}
                totalPages={cuisinesData?.paginationMeta?.totalPages || 1}
                isLoading={isCreatingCuisine}
            />
            {/* Categories List */}
            <PaginatedList
                items={categoriesData?.payload || []}
                title="ប្រភេទអាហារ"
                onCreate={handleAddCategory}
                currentPage={categoryPage}
                setCurrentPage={setCategoryPage}
                totalPages={categoriesData?.paginationMeta?.totalPages || 1}
                isLoading={isCreatingCategory}
            />
        </div>
    );
}