'use server'
import { getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

export const getToken = async () => {
    const session = await getServerSession(nextAuthOptions);
    const token = session?.user?.token;
    return {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};