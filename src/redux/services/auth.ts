import { kroryaApi } from "../api";

export const authApi = kroryaApi.injectEndpoints({
    endpoints: (builder) => ({
        // Post email to get OTP
        postEmail: builder.mutation<any, { email: string }>({
            query: ({ email }) => ({
                url: `/api/v1/auth/send-otp?email=${email}`,
                method: "POST",
                invalidatesTags: [{ type: "auth", id: "LIST" }],
            }),
        }),

        // Post both email and OTP to verify OTP
        postVerifyEmail: builder.mutation<any, { email: string; otp: string }>({
            query: ({ email, otp }) => ({
                url: `/api/v1/auth/validate-otp?email=${email}&otp=${otp}`,
                method: "POST",
                invalidatesTags: [{ type: "auth", id: "LIST" }],
            }),
        }),
        // Register by email and set new password
        postRegister: builder.mutation<any, { email: string; newPassword: string }>({
            query: ({ email, newPassword }) => ({
                url: `/api/v1/auth/register`,
                method: "POST",
                body: { email, newPassword },
                invalidatesTags: [{ type: "auth", id: "LIST" }],
            }),
        }),
    //     Reset Password
        postResetPassword: builder.mutation<any, { email: string; newPassword: string }>({
            query: ({ email, newPassword }) => ({
                url: `/api/v1/auth/reset-password`,
                method: "POST",
                body: { email, newPassword },
                invalidatesTags: [{ type: "auth", id: "LIST" }],
            }),
        }),
    }),
});

export const { usePostEmailMutation, usePostVerifyEmailMutation, usePostRegisterMutation, usePostResetPasswordMutation  } = authApi;
