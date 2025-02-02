// services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {RootState} from "@/redux/store";
import {clearAccessToken, setAccessToken} from "@/redux/features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SPRING_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        console.warn("Access token expired, attempting refresh...");

        try {
            const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/refresh`, {
                method: "POST",
                credentials: "include",
            });

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();

                const newAccessToken = refreshData.accessToken;
                // Explicitly log the token

                if (newAccessToken) {
                    api.dispatch(setAccessToken(newAccessToken));

                    // Retry the original request with the new token
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    console.error("Refresh API did not return a new access token");
                }
            } else {
                const logout = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/logout`, {
                    method: "POST",
                    credentials: "include",
                });
            }

        } catch (error) {
            console.error("Token refresh error:", error);
        }
    }

    return result;
};

export const kroryaApi = createApi({
    reducerPath: "kroryaApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({}),
});