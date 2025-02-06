"use client";
import { useState } from "react";
import PaginatedList from "./PaginationList";
import { useGetAllCategoriesQuery, usePostCategoryMutation } from "@/redux/services/category";
import { useGetAllFoodQuery, usePostFoodMutation } from "@/redux/services/food";
import { ToastContainer } from "react-toastify";

export default function CuisineCategoryLayout() {
    const pageSize = 4;

    // Separate state for cuisines and categories
    const [cuisinePage, setCuisinePage] = useState(0);
    const [categoryPage, setCategoryPage] = useState(0);

    // Fetch cuisines and categories separately
    const { data: cuisinesData, refetch: refetchCuisines } = useGetAllFoodQuery({ page: cuisinePage, pageSize });
    const { data: categoriesData, refetch: refetchCategories } = useGetAllCategoriesQuery({ page: categoryPage, pageSize });

    // Separate loading states for both mutations
    const [createCuisine, { isLoading: isCreatingCuisine }] = usePostFoodMutation();
    const [createCategory, { isLoading: isCreatingCategory }] = usePostCategoryMutation();

    // Function for adding a new category
    const handleAddCategory = async (name: string) => {
        try {
            const response = await createCategory({ categoryName: name }).unwrap();
            console.log("Category Created:", response);
            refetchCategories();
        } catch (error: any) {
            console.error("Error creating category:", error?.message || error?.data || error);
        }
    };


    // Function for adding a new cuisine
    const handleAddCuisine = async (name: string) => {
        try {
            const response = await createCuisine({ cuisineName: name }).unwrap();
            console.log("Cuisine Created:", response);
            refetchCuisines();
        } catch (error: any) {
            console.error("Error creating cuisine:", error?.data || error?.message || error);
        }
    };


    return (
        <div className="flex flex-col md:flex-row gap-4 p-6">
            <ToastContainer />
            <PaginatedList
                items={cuisinesData?.payload || []}
                title="Cuisines"
                onCreate={handleAddCuisine} // Use the handleAddCuisine function here
                currentPage={cuisinePage}
                setCurrentPage={setCuisinePage}
                totalPages={cuisinesData?.paginationMeta?.totalPages || 1}
                isLoading={isCreatingCuisine} // Pass loading state for cuisines
            />
            <PaginatedList
                items={categoriesData?.payload || []}
                title="Categories"
                onCreate={handleAddCategory} // Use the handleAddCategory function here
                currentPage={categoryPage}
                setCurrentPage={setCategoryPage}
                totalPages={categoriesData?.paginationMeta?.totalPages || 1}
                isLoading={isCreatingCategory} // Pass loading state for categories
            />
        </div>
    );
}
