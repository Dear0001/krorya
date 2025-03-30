"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hooks";
import { setAccessToken } from "@/redux/features/auth/authSlice";
import { checkEmailExist } from "@/lib/constants";

export function FacebookSignInButton() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSignIn = async () => {
    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    try {
      // Step 1: Initiate Facebook sign-in
      const result = await signIn("facebook", { redirect: false });

      if (result?.error) {
        setError(result.error === "AccessDenied"
            ? "Access denied. Please try another account."
            : "Sign in failed. Please try again.");
        return;
      }

      // Step 2: Get the user data after sign-in
      const sessionResponse = await fetch('/api/auth/session');
      const session = await sessionResponse.json();

      if (!session?.user?.email) {
        throw new Error("Failed to get user data from Facebook");
      }

      const { email, name } = session.user;

      // Step 3: Check if email exists in our system
      const emailExists = await checkEmailExist(email);

      if (!emailExists) {
        toast.info("Please complete your registration first");
        router.push(`/register?email=${email}&name=${(name || '')}`);
        return;
      }

      // Step 4: Process login with our backend
      const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/facebook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName: name }),
        credentials: "include",
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${loginResponse.status}`);
      }

      const data = await loginResponse.json();
      if(data?.user?.role === "ROLE_USER") {
        router.push("/home");
      } else {
        router.push("/dashboard");
      }
      if (!data.accessToken) {
        throw new Error("Access token is missing in API response.");
      }

      dispatch(setAccessToken(data.accessToken));
      toast.success("Logged in successfully!");
      router.push("/home");
    } catch (error) {
      console.error("Facebook login error:", error);
      setError(error instanceof Error ? error.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
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
          <Image src="/facebook.png" alt="Facebook Logo" width={22} height={22} />
          <span className="ml-4">{isLoading ? "Loading..." : "Continue with Facebook"}</span>
        </button>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
  );
}