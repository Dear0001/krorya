"use client";

import React, { useState, useEffect } from "react";

type CategoryListProps = {
    categories: { id: string | number; categoryName: string }[];
    activeCategoryId: string;
    onCategoryClick: (categoryId: string) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({ categories, activeCategoryId, onCategoryClick }) => {
    return (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-3 px-2">
            <button
                key="all"
                className={`px-4 py-2 rounded-md whitespace-nowrap ${activeCategoryId === "all" ? "bg-primary text-white" : "bg-gray-200"}`}
                onClick={() => onCategoryClick("all")}
            >
                ទាំងអស់
            </button>
            {categories.map((category, index) => {
                if (!category.id) return null;

                const categoryIdStr = category.id.toString();

                return (
                    <button
                        key={categoryIdStr || `category-${index}`}
                        className={`px-4 py-2 rounded-md whitespace-nowrap ${activeCategoryId === categoryIdStr ? "bg-primary text-white" : "bg-gray-200"}`}
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