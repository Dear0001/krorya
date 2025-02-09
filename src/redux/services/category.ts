import { kroryaApi } from "../api";

export const categoryApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all users
        getAllCategories: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/api/v1/category/all?page=${page}&size=${pageSize}`,
        }),
        // post category
        postCategory: builder.mutation<any, { categoryName: string }>({
            query: (newCategory) => ({
                url: "/api/v1/category/post-category",
                method: "POST",
                body: { categoryName: newCategory.categoryName },
            }),
        }),
        getFoodRecipeByCategoryId: builder.query<any, { categoryId: number }>({
            query: ({categoryId}) => `/api/v1/guest-user/foods/${categoryId}`,
        }),
    }),
});

export const { useGetAllCategoriesQuery, useGetFoodRecipeByCategoryIdQuery, usePostCategoryMutation } = categoryApi;
