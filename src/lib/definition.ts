export type RecipeType = {
    id: number;
    photo: { photo: string; photoId: number }[];
    name: string;
    description: string;
    level: string;
    durationInMinutes?: string;
}

export type IngredientType = {
    id: number;
    name: string;
    quantity: string;
    price: number;
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
    name: string; // ✅ Added missing field
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
    payload: FoodRecipe[];
    statusCode: string;
    timestamp: string;
};


export type FormData = {
    id: number;
    photo: { photo: string }[];
    name: string;
    description: string;
    durationInMinutes: number;
    level: string;
    cuisineId: number;
    categoryId: number;
    ingredients: Ingredient[];
    cookingSteps: CookingStep[];
};

export type Ingredient = {
    id: number;
    name: string;
    quantity: string;
    price: number;
};

export  type CookingStep = {
    id: number;
    description: string;
};