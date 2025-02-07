import { kroryaApi } from "../api";

// type for recipe form data
export type RecipeFormData = {
    photo: { photo: string }[];
    name: string;
    description: string;
    durationInMinutes: number;
    level: string;
    cuisineId: number;
    categoryId: number;
    ingredients: {
        id: number;
        name: string;
        quantity: string;
        price: number;
    }[];
    cookingSteps: {
        id: number;
        description: string;
    }[];
};


export const RecipeApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all users
        getAllRecipes: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/api/v1/food-recipe/list?page=${page}&size=${pageSize}`,
        }),
        // post recipe
            postRecipe: builder.mutation<any, RecipeFormData>({
                query: (newRecipe) => ({
                    url: `api/v1/food-recipe/post-food-recipe`,
                    method: "POST",
                    body: newRecipe, // Send entire recipe object
                }),
            }),
        // fetch count of dashboard
        getDashboardCount: builder.query<any, void>({
            query: () => `/api/v1/dashboard/counts`,
        }),
    }),

});

export const { useGetAllRecipesQuery, useGetDashboardCountQuery , usePostRecipeMutation } = RecipeApi;
