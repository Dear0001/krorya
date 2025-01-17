import { NEXT_API_URL } from "@/utils/definition";

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
        console.log("data", data);
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error(error instanceof Error ? error.message : "Login failed");
    }
};