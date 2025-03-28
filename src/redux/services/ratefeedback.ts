import { kroryaApi } from "../api";

type RateFeedback = {
    foodId: number,
    ratingValue: string,
    commentText: string,
}

export const RateFeedbackApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        // post rate value and comment
        postRateFeedback: builder.mutation<any, RateFeedback>({
            query: ({ foodId, ratingValue, commentText }) => ({
                url: `/api/v1/feedback`,
                method: "POST",
                params: {
                    itemType: "FOOD_RECIPE"
                },
                body: {
                    foodId,
                    ratingValue: Number(ratingValue),
                    commentText
                },
            }),
            invalidatesTags: [{ type: "Feedback", id: "LIST" }],
        }),

        // get all rate feedback
        getRateFeedback: builder.query<any, { id: number }>({
            query: ({ id }) => `/api/v1/feedback/guest-user/${id}?itemType=FOOD_RECIPE`,
            providesTags: [{ type: "Feedback", id: "LIST" }]
        }),
    //     update rate feedback /api/v1/feedback/3
        updateRateFeedback: builder.mutation<any, { id: number, ratingValue: string, commentText: string }>({
            query: ({ id, ratingValue, commentText }) => ({
                url: `/api/v1/feedback/${id}`,
                method: "PUT",
                body: {
                    ratingValue: Number(ratingValue),
                    commentText
                },
            }),
            invalidatesTags: [{ type: "Feedback", id: "LIST" }],
        }),

    //     delete rate feedback /api/v1/feedback/3
        deleteRateFeedback: builder.mutation<any, { id: number }>({
            query: ({ id }) => ({
                url: `/api/v1/feedback/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "Feedback", id: "LIST" }],
        }),
    }),
});

export const { usePostRateFeedbackMutation, useGetRateFeedbackQuery, useUpdateRateFeedbackMutation, useDeleteRateFeedbackMutation  } = RateFeedbackApi;
