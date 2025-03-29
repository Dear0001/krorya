"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "@/redux/hooks";
import { setAccessToken } from "@/redux/features/auth/authSlice";

export function GoogleSignInButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);

    try {
      // Step 1: Sign in with Google
      const result = await signIn("google", { redirect: false });

      if (result?.error) {
        setError(result.error === "AccessDenied"
            ? "Access denied. Please try another account."
            : "Sign in failed. Please try again.");
        return;
      }

      // Step 2: If Google sign-in was successful, fetch the user session
      const sessionResponse = await fetch('/api/auth/session');
      if (!sessionResponse.ok) {
        throw new Error("Failed to fetch user session");
      }

      const session = await sessionResponse.json();

      if (!session?.user) {
        throw new Error("User data not found in session");
      }

      // Step 3: Post the Google login to your backend
      const { email, name } = session.user;
      const userData = { email, fullName: name };

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.accessToken) {
        throw new Error("Access token is missing in API response.");
      }

      dispatch(setAccessToken(data.accessToken));
      toast.success(data.message || "Logged in successfully!");

      setTimeout(() => router.push("/home"), 1000);
    } catch (error) {
      console.error("Google login error:", error);
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div>
        <button
            onClick={handleSignIn}
            disabled={isLoading}
            className={`w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none flex justify-center items-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          {isLoading ? (
              <span>Loading...</span>
          ) : (
              <>
                <Image src="/Google_logo.svg" alt="Google Logo" width={20} height={20} />
                <span className="ml-4">Continue with Google</span>
              </>
          )}
        </button>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
  );
}