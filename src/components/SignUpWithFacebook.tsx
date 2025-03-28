"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { setAccessToken } from "@/redux/features/auth/authSlice";
import { checkEmailExistUrl } from "@/lib/constants";

export function FacebookSignInButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      handlePostFacebookLogin(session.user);
    }
  }, [session, status]);

  const checkEmailExist = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(checkEmailExistUrl(email));
      if (!response.ok) {
        // If status is 404, email doesn't exist
        if (response.status === 404) {
          return false;
        }
        throw new Error('Failed to check email');
      }
      // If status is 200, email exists
      return true;
    } catch (error) {
      console.error('Error checking email:', error);
      throw error;
    }
  };

  const handleSignIn = async () => {
    if (isLoading) return;

    setError(null);
    setIsLoading(true);
    try {
      const result = await signIn("facebook", { redirect: false });
      if (result?.error) {
        setError(result.error === "AccessDenied"
            ? "Access denied. Please try another account."
            : "Sign in failed. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      console.error("Facebook sign-in error:", error);
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const handlePostFacebookLogin = async (user: any) => {
    if (!isMounted.current) return;

    try {
      const { email, name } = user;

      // First check if email exists in our database
      const emailExists = await checkEmailExist(email);

      if (!emailExists) {
        // If email doesn't exist, redirect to signup page with Facebook data
        toast.info("Please complete your registration first");
        router.push(`/signup?email=${(email)}&name=${(name)}`);
        return;
      }

      // If email exists, proceed with login
      const userData = { email, fullName: name };

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/facebook`, {
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
      toast.success("Logged in successfully!");

      setTimeout(() => router.push("/home"), 1000);
    } catch (error) {
      if (!isMounted.current) return;
      console.error("Facebook login error:", error);
      toast.error(error instanceof Error ? error.message : "Login failed. Please try again.");
    }
  };

  return (
      <div className="w-full">
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
                <Image src="/facebook.png" alt="Facebook Logo" width={22} height={22} />
                <span className="ml-4">Continue with Facebook</span>
              </>
          )}
        </button>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
  );
}