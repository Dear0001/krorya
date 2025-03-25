export type RecipeType = {
    id: number;
    photo: { photo: string; photoId: number }[];
    name: string;
    description: string;
    level: string;
    isFavorite: boolean;
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
    name: string;
    categoryId: number;
    photo: Photo[];
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
    description?: string;
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
    quantity?: string;
    price: number;
};

export  type CookingStep = {
    id: number;
    description: string;
};

export type PopularType = {
    id: number;
    photo: { photoId: number; photo: string }[];
    name: string;
    description: string;
    level: string;
    durationInMinutes: number;
    averageRating: number | null;
    totalRaters: number | null;
    isFavorite: boolean | null;
    itemType: string;
    user: {
        id: number;
        fullName: string;
        profileImage: string;
        role: string;
        deleted: boolean;
    };
}

export type GoogleLoginType = {
    email: string;
    fullName: string;
}

export type CategoryListProps = {
    categories: { id: string | number; categoryName: string }[];
    activeCategoryId: string;
    onCategoryClick: (categoryId: string) => void;
};

export type UserProfileState = {
    id: number | null;
    fullName: string;
    email: string;
    profileImage: string;
    phoneNumber: string;
    role: string;
    createdAt: string;
    emailVerifiedAt: string;
    emailVerified: boolean;
    deleted: boolean;
}