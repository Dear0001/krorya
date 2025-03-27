"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotAuthorizedPage() {
    const router = useRouter();

    // Automatically redirect back after 5 seconds
    useEffect(() => {
        setTimeout(() => {
            router.push("/home");
        }, 5000);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <h1 className="text-6xl font-bold mb-4 animate-bounce">Who are You Broo?!</h1>
            <p className="text-2xl text-red-500">
                Why you try to access this path? <span className="text-primary">F*ck!</span>
            </p>
            <img
                src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
                alt="Angry Meme"
                className="mt-6 w-80 rounded-xl shadow-lg"
            />
            <p className="mt-4 text-gray-400">Redirecting you back in 5 seconds...</p>
        </div>
    );
}
