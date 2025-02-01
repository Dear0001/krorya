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

            // Log the response status and headers to inspect any issues
            console.log("Refresh Response Status:", refreshResponse.status);
            console.log("Refresh Response Headers:", refreshResponse.headers);

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json();

                // Log the full response to verify the structure
                console.log("Full Refresh API Response:", JSON.stringify(refreshData, null, 2));

                const newAccessToken = refreshData.accessToken;
                console.log("New Access Token:", newAccessToken); // Explicitly log the token

                if (newAccessToken) {
                    api.dispatch(setAccessToken(newAccessToken));
                    console.log("Updated Access Token in Redux:", (api.getState() as RootState).auth.token);

                    // Retry the original request with the new token
                    result = await baseQuery(args, api, extraOptions);
                    console.log("Retry Result:", result);
                } else {
                    console.error("Refresh API did not return a new access token");
                }
            } else {
                console.error("Failed to refresh token, logging out...");
                api.dispatch(clearAccessToken());
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