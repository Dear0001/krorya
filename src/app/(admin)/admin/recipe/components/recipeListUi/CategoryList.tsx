"use client";

import React, { useState, useEffect } from "react";

type CategoryListProps = {
    categories: { id: string | number; categoryName: string }[]; // ✅ Changed categoryId -> id
    activeCategoryId: string;
    onCategoryClick: (categoryId: string) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({ categories, activeCategoryId, onCategoryClick }) => {

    return (
        <div className="flex gap-4 overflow-x-auto">
            <button
                key="all"
                className={`px-4 py-2 rounded-md ${activeCategoryId === "all" ? "bg-primary text-white" : "bg-gray-200"}`}
                onClick={() => onCategoryClick("all")}
            >
                ទាំងអស់
            </button>
            {categories.map((category, index) => {
                if (!category.id) return null; // ✅ Check for `id` instead of `categoryId`

                const categoryIdStr = category.id.toString(); // ✅ Convert id to string

                return (
                    <button
                        key={categoryIdStr || `category-${index}`} // ✅ Unique key
                        className={`px-4 py-2 rounded-md ${activeCategoryId === categoryIdStr ? "bg-primary text-white" : "bg-gray-200"}`}
                        onClick={() => onCategoryClick(categoryIdStr)}
                    >
                        {category.categoryName}
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryList;
