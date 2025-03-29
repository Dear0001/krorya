import { kroryaApi } from "../api";

export const GuestApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        // fetch guest recipe by name
        getRecipeByName: builder.query<any, { name: string }>({
            query: ({ name }) => `/api/v1/guest-user/food-recipe/search?name=${name}`,
            providesTags: [{ type: "guest", id: "LIST" }]
        }),
        // fetch food detail by id /api/v1/foods/detail/1?itemType=FOOD_RECIPE
        getDetailFoodById: builder.query<any, { id: number }>({
            query: ({ id }) => `/api/v1/guest-user/foods/detail/${id}?itemType=FOOD_RECIPE`,
            providesTags: [{ type: "guest", id: "LIST" }]
        }),
    }),
    overrideExisting: true
});

export const { useGetRecipeByNameQuery, useGetDetailFoodByIdQuery } = GuestApi;