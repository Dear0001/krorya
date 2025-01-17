import { NEXT_API_URL } from "@/utils/definition";
import {getServerSession} from "next-auth";

const token = getServerSession();

// Define the type for the user object
interface UserCredentials {
    email: string;
    password: string;
}

// Define the type for the response data
interface LoginResponse {
    message: string;
    payload: {
        role: string;
        access_token: string;
        refresh_token: string;
        profile_image: string;
        full_name: string;
        email: string;
        created_date: string;
    };
    statusCode: string;
    timestamp: string;
}

export const loginService = async (user: UserCredentials): Promise<LoginResponse> => {
    const { email, password } = user;

    try {
        const res = await fetch(`${NEXT_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Login failed");
        }

        const data: LoginResponse = await res.json();
        console.log("dddssss", data);
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error(error instanceof Error ? error.message : "Login failed");
    }
};


export const fetchData = async () => {
    try {

        // Make an API request
        const response = await fetch(`${process.env.NEXT_API_URL}/protected`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
        },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const refreshToken = async (refresh_token: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token }),
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        return data.access_token; // Return the new access token
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
};