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
        // fetch food-recipe by name
        getRecipeByName: builder.query<any, { name: string }>({
            query: ({ name }) => `/api/v1/food-recipe/search?name=${name}`,
        }),
        // fetch food detail by id /api/v1/foods/detail/1?itemType=FOOD_RECIPE
        getRecipeById: builder.query<any, { id: number }>({
            query: ({ id }) => `/api/v1/foods/detail/${id}?itemType=FOOD_RECIPE`,
        }),
        // fetch count of dashboard
        getDashboardCount: builder.query<any, void>({
            query: () => `/api/v1/dashboard/counts`,
        }),
    }),

});

export const { useGetAllRecipesQuery, useGetRecipeByNameQuery, useGetRecipeByIdQuery, useGetDashboardCountQuery , usePostRecipeMutation } = RecipeApi;
