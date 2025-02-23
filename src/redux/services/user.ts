import { kroryaApi } from "../api";

export const userApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all users
        getUsers: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/api/v1/user/all?page=${page}&size=${pageSize}`,
            providesTags: [{ type: "user", id: "LIST" }],
        }),
        // Fetch single user by ID
        getUserById: builder.query<any, number>({
            query: (id) => `/api/v1/user/${id}`,
            providesTags: [{ type: "user", id: "LIST" }],
        }),
        // Update user data
        updateUserProfile: builder.mutation<any, { id: string; updatedUser: object }>({
            query: ({ id, updatedUser }) => ({
                url: `/api/v1/user/edit-profile`,
                method: "PUT",
                body: updatedUser,
            }),
            invalidatesTags: [{ type: "user", id: "LIST" }],
        }),
        // Delete user by ID
        deleteUserById: builder.mutation<any, number>({
            query: (id) => ({
                url: `/api/v1/user/deleteUserById/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: "user", id: "LIST" }],
        }),
    //     get user progile
        getUserProfile: builder.query<any, void>({
            query: () =>
                `/api/v1/user/profile`,
            providesTags: [{ type: "user", id: "LIST" }],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserProfileMutation,
    useDeleteUserByIdMutation,
    useGetUserProfileQuery,
} = userApi;