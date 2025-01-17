"use server";

import { NEXT_API_URL } from "@/utils/definition";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface DashboardCounts {
    totalUsers: number;
    totalPosts: number;
    totalComments: number;
}

export const getDashboardCounts = async (): Promise<DashboardCounts> => {
    try {
        // Retrieve the session
        const session = await getServerSession(authOptions);

        const access_token = session?.user?.token;

        // Make the API request
        const response = await fetch(`${NEXT_API_URL}/dashboard/counts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJnbWFpbCI6Im1peGFuZW02NTFAbmFsd2FuLmNvbSIsInJvbGVzIjoiUk9MRV9BRE1JTiIsInVzZXJJZCI6MSwic3ViIjoibWl4YW5lbTY1MUBuYWx3YW4uY29tIiwiaWF0IjoxNzM3MTI2NDYyLCJleHAiOjQ4OTA3MjY0NjJ9.jmToUH14abHcXA7e_5MakLUbZszpjn8uvG3CUaCehuA`,
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