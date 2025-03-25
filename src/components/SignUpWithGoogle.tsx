"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useAppDispatch} from "@/redux/hooks";
import {setAccessToken} from "@/redux/features/auth/authSlice";
import {setUserProfile} from "@/redux/features/auth/authSlice";

export function GoogleSignInButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user) {
      handlePostGoogleLogin(session.user);
    }
  }, [session]);

  const handleSignIn = async () => {
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

      // Validate response structure
      if (!data?.payload?.access_token) {
        throw new Error("Invalid response format: Missing access token");
      }
      console.log("sdddddd",data);

      // Store token in localStorage and Redux
      localStorage.setItem('access_token', data.payload.access_token);
      dispatch(setAccessToken(data.payload.access_token));
      dispatch(setUserProfile(data.payload));

      // Dispatch user profile data to Redux
      if (data.payload) {
        dispatch(setUserProfile({
          id: data.payload.id || null,
          fullName: data.payload.full_name || name || "",
          email: data.payload.email || email || "",
          profileImage: data.payload.profile_image || "",
          phoneNumber: data.payload.phone_number || "",
          role: data.payload.role || "ROLE_USER",
          createdAt: data.payload.created_date || "",
          emailVerifiedAt: data.payload.email_verified_at || "",
          emailVerified: Boolean(data.payload.email_verified_at),
          deleted: data.payload.deleted || false,
        }));
      }

      toast.success(data.message || "Logged in successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(
          error instanceof Error ? error.message : "Failed to authenticate with Google. Please try again.",
          {
            position: "top-right",
            autoClose: 5000,
          }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div>
        <ToastContainer />
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