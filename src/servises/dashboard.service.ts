"use server";

import { NEXT_API_URL } from "@/utils/definition";

interface DashboardCounts {
    totalUsers: number;
    totalPosts: number;
    totalCuisine: number;
    totalCategories: number;
}

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJnbWFpbCI6Im1peGFuZW02NTFAbmFsd2FuLmNvbSIsInJvbGVzIjoiUk9MRV9BRE1JTiIsInVzZXJJZCI6MSwic3ViIjoibWl4YW5lbTY1MUBuYWx3YW4uY29tIiwiaWF0IjoxNzM3MTI5NjE3LCJleHAiOjQ4OTA3Mjk2MTd9.e-8fQJS-qoAcEC0_rMApKWaNT9vT9G0CP3YnmScZ7WE';

export const getDashboardCounts = async (): Promise<DashboardCounts> => {
    try {
        // Make the API request
        const response = await fetch(`${NEXT_API_URL}/dashboard/counts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${access_token}`,
                Authorization: `Bearer ${token}`,
            },
        });


        if (!response.ok) {
            throw new Error(`Failed to fetch dashboard counts: ${response.statusText}`);
        }

        // Parse and return the response data
        const data: DashboardCounts = await response.json();
        console.log("API Response Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching dashboard counts:", error);
        throw error;
    }
};

export const getAllFoodRecipes = async () => {
    try {
        const response = await fetch(`${NEXT_API_URL}/food-recipe/list`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch all food recipes: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching all food recipes:", error);
        throw error;
    }
}