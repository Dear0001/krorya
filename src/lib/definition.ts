export type ProductType = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
};


export type CartProductType = {
    title: string;
    image: string;
    price: number;
    id: number;
    onClick?: () => void;
};


// Define the type for recipe data
export type RecipeType = {
    id: number;
    photo: { photo: string; photoId: number }[];
    name: string;
    description: string;
    level: string;
    durationInMinutes?: string;
}

export type IngredientType = {
    ingredientId: number;
    ingredientName: string;
    quantity: string;
    ingredientType: string;
};


export type PaginationMeta = {
    totalCategories: number;
    totalPages: number;
    currentPage: number;
    size: number;
    nextLink: string | null;
    prevLink: string | null;
};

export type Photo = {
    photoId: number;
    photo: string;
};

export type User = {
    id: number;
    fullName: string;
    profileImage: string;
    role: string;
    deleted: boolean;
};

export type FoodRecipe = {
    id: number;
    foodName: string; // ✅ Added missing field
    categoryId: number; // ✅ Added missing field
    photo: Photo[]; // Array of images
    description: string;
    level: string;
    durationInMinutes: number;
    averageRating: number | null;
    totalRaters: number | null;
    isFavorite: boolean;
    itemType: string;
    user: User;
};


export type FoodRecipeResponse = {
    paginationMeta: PaginationMeta;
    message: string;
    payload: FoodRecipe[]; // Array of food items
    statusCode: string;
    timestamp: string;
};
