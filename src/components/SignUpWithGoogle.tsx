"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useAppDispatch} from "@/redux/hooks";
import {setAccessToken} from "@/redux/features/auth/authSlice";

export function GoogleSignInButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const isMounted = useRef(true);
  const isProcessing = useRef(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user && !isProcessing.current) {
      isProcessing.current = true;
      handlePostGoogleLogin(session.user)
          .finally(() => {
            if (isMounted.current) {
              isProcessing.current = false;
            }
          });
    }
  }, [session, status]);

  const handleSignIn = async () => {
    if (isProcessing.current) return;

    setError(null);
    setIsLoading(true);
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.error) {
        setError(result.error === "AccessDenied"
            ? "Access denied. Please try another account."
            : "Sign in failed. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      console.error("Google sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostGoogleLogin = async (user: any) => {
    if (!isMounted.current) return;

    setIsLoading(true);
    try {
      const { email, name } = user;
      const userData = {
        email,
        fullName: name,
      };

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

      dispatch(setAccessToken(data.payload.access_token));

      toast.success(data.message || "Logged in successfully!");

      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (error) {
      if (!isMounted.current) return;

      console.error("Google login error:", error);
      toast.error(
          error instanceof Error ? error.message : "Failed to authenticate with Google. Please try again.");
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
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