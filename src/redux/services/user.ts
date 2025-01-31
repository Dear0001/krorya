import { kroryaApi } from "../api";

export const userApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all users
        getUsers: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/api/v1/user/all?page=${page}&size=${pageSize}`,
        }),
        // Fetch single user by ID
        getUserById: builder.query<any, number>({
            query: (id) => `/api/v1/user/${id}`,
        }),
        // Update user data
        updateUser: builder.mutation<any, { id: number; updatedUser: object }>({
            query: ({ id, updatedUser }) => ({
                url: `/api/v1/user/${id}/update`,
                method: "PATCH",
                body: updatedUser,
            }),
        }),
        // Delete user by ID
        deleteUser: builder.mutation<any, number>({
            query: (id) => ({
                url: `/api/v1/user/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;