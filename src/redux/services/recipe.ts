import { kroryaApi } from "../api";
import {FormData} from "@/lib/definition";

export const RecipeApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all recipes
        getAllRecipes: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/api/v1/guest-user/food-recipe/list?page=${page}&size=${pageSize}`,
            providesTags: [{ type: "recipe", id: "LIST" }],
        }),
        // post recipe
        postRecipe: builder.mutation<any, FormData>({
            query: (newRecipe) => ({
                url: `api/v1/food-recipe/post-food-recipe`,
                method: "POST",
                body: newRecipe,
            }),
            invalidatesTags: [{ type: "recipe", id: "LIST" }],
        }),
        // update recipe by id
        updateRecipe: builder.mutation<any, { id: number; FormData: any }>({
            query: ({ id, FormData }) => ({
                url: `api/v1/food-recipe/edit-food-recipe/${id}`,
                method: "PUT",
                body: FormData,
            }),
            invalidatesTags: [{ type: "recipe", id: "LIST" }],
        }),
        //delete recipe by id
        deleteRecipe: builder.mutation<any, { id: number }>({
            query: ({ id }) => ({ // Destructure `id` here
                url: `api/v1/food-recipe/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "recipe", id: "LIST"}],
        }),
        // fetch guest recipe by name
        getRecipeByName: builder.query<any, { name: string }>({
            query: ({ name }) => `/api/v1/guest-user/foods/search?name=${name}`,
            providesTags: [{ type: "recipe", id: "LIST" }]
        }),
        // fetch food detail by id /api/v1/foods/detail/1?itemType=FOOD_RECIPE
        getRecipeById: builder.query<any, { id: number }>({
            query: ({ id }) => `/api/v1/foods/detail/${id}?itemType=FOOD_RECIPE`,
            providesTags: [{ type: "recipe", id: "LIST" }]
        }),
        // fetch count of dashboard
        getDashboardCount: builder.query<any, void>({
            query: () => `/api/v1/dashboard/counts`,
            providesTags: [{ type: "recipe", id: "LIST" }]
        }),
    //     get all recipe popular
        getRecipePopular: builder.query<any, void>({
            query: () => `/api/v1/guest-user/foods/popular`,
            providesTags: [{ type: "recipe", id: "LIST" }]
        }),
    }),
});

export const { useGetAllRecipesQuery, useGetRecipeByNameQuery, useGetRecipeByIdQuery, useGetDashboardCountQuery , usePostRecipeMutation, useUpdateRecipeMutation, useGetRecipePopularQuery, useDeleteRecipeMutation } = RecipeApi;
