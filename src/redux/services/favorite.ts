import { kroryaApi } from "../api";

export const favoriteApi = kroryaApi.injectEndpoints({
    overrideExisting: true, // Add this line to allow overriding
    endpoints: (builder) => ({
        //get favorite list /api/v1/favorite/all
        getFavoriteList: builder.query({
            query: () => `/api/v1/favorite/all`,
            providesTags: [{ type: "recipe", id: "LIST" }],
        }),

        // post favorite /api/v1/favorite/add-favorite?foodId=100&itemType=FOOD_RECIPE
        addFavorite: builder.mutation({
            query: ({id}) => ({
                url: `/api/v1/favorite/add-favorite?foodId=${id}&itemType=FOOD_RECIPE`,
                method: "POST",
                invalidatesTags: [{ type: "recipe", id: "LIST" }],
            }),
        }),

        // remove favorite /api/v1/favorite/remove-favorite?foodId=100&itemType=FOOD_RECIPE
        removeFavorite: builder.mutation({
            query: ({id}) => ({
                url: `/api/v1/favorite/remove-favorite?foodId=${id}&itemType=FOOD_RECIPE`,
                method: "DELETE",
                invalidatesTags: [{ type: "recipe", id: "LIST" }],
            }),
        }),
    }),
});

export const {
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
    useGetFavoriteListQuery
} = favoriteApi;