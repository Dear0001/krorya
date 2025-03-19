import React from "react";
import { categoryIconMap } from "@/lib/constants";
import CategoryItem from "@/app/(admin)/admin/recipe/components/CategoryItem";

type CategoryListProps = {
    categories: { id: string | number; categoryName: string }[];
    activeCategoryId: string;
    onCategoryClick: (categoryId: string) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({ categories, activeCategoryId, onCategoryClick }) => {
    return (
        <section className="flex gap-4 overflow-x-auto scrollbar-hide pb-3 px-2">
            {/* "All" Category */}
            <CategoryItem
                id="all"
                name="ទាំងអស់"
                icon="all.svg"
                isActive={activeCategoryId === "all"}
                onClick={onCategoryClick}
            />

            {/* Mapped Categories */}
            {categories.map((category, index) => {
                if (!category.id) return null;

                const categoryIdStr = category.id.toString();
                const categoryIcon = categoryIconMap[category.categoryName] || "nham.svg";
                return (
                    <CategoryItem
                        key={categoryIdStr || `category-${index}`}
                        id={categoryIdStr}
                        name={category.categoryName}
                        icon={categoryIcon}
                        isActive={activeCategoryId === categoryIdStr}
                        onClick={onCategoryClick}
                    />
                );
            })}
        </section>
    );
};

export default CategoryList;