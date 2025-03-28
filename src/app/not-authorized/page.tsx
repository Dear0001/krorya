"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotAuthorizedPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/home");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
            <h1 className="text-6xl font-bold mb-4 animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
                ACCESS DENIED
            </h1>
            <p className="text-2xl text-center">
                You're not supposed to be here, <span className="font-mono text-primary">hacker</span>.
                <br />
                The system is watching you...
            </p>
            <img
                src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
                alt="Intruder Alert"
                className="mt-8 w-80 rounded-xl border-2 border-red-500 shadow-lg shadow-red-500/50"
            />
            <div className="mt-6 text-center">
                <p className="text-gray-400 mb-2">Returning to safety in...</p>
                <div className="text-xl font-mono bg-gray-800 px-4 py-2 rounded-lg">
                    {countdown} second{countdown !== 1 ? 's' : ''}
                </div>
            </div>
        </div>
    );
}