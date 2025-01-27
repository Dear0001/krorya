import { kroryaApi } from "../api";

// Define types for authentication
type LoginCredentials = {
    email: string;
    password: string;
}

type LoginResponse = {
    accessToken: string;
    refreshToken: string;
    role: string;
    email: string;
    fullName: string | null;
    profileImage: string | null;
}

export const authenticatedApi = kroryaApi.injectEndpoints({
    endpoints: (build) => ({
            login: build.mutation<LoginResponse, LoginCredentials>({
                query: (credentials) => ({
                    url: '/auth/login',
                    method: 'POST',
                    body: credentials,
                }),
                transformResponse: (response: any) => ({
                    accessToken: response.payload.access_token,
                    refreshToken: response.payload.refresh_token,
                    role: response.payload.role,
                    email: response.payload.email,
                    fullName: response.payload.full_name || 'Unknown User',
                    profileImage: response.payload.profile_image || null,
                }),
            }),
    }),
});

export const { useLoginMutation } = authenticatedApi;
