import { kroryaApi } from "../api";

export const foodApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all users
        getAllFood: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/api/v1/cuisine/all?page=${page}&size=${pageSize}`,
            providesTags: [{ type: "food", id: "LIST" }],
        }),
        // post food
        postFood: builder.mutation<any, { cuisineName: string }>({
            query: (newCuisine) => ({
                url: `/api/v1/cuisine/post-cuisine`,
                method: "POST",
                body: { cuisineName: newCuisine.cuisineName },
            }),
            invalidatesTags: [{ type: "food", id: "LIST" }],
        }),
    }),
});

export const { useGetAllFoodQuery, usePostFoodMutation } = foodApi;
