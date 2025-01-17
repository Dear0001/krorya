"use server";

import { getToken } from "@/utils/GetToken";
import { NEXT_API_URL } from "@/utils/definition";

export const getDashboardCounts = async () => {
    try {
        // Fetch the token dynamically
        const token = await getToken();

        // Make the API request
        const response = await fetch(`${NEXT_API_URL}/dashboard/counts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token.authorization,
            },
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to fetch dashboard counts: ${response.statusText}`);
        }

        // Parse and return the response data
        const data = await response.json();
        console.log("API Response Data:", data); // Debugging log
        return data;
    } catch (error) {
        console.error("Error fetching dashboard counts:", error);
        throw error; // Re-throw the error for handling in the component
    }
};