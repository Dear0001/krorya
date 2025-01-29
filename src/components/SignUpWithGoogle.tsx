"use client";
import Image from "next/image";

export function GoogleSignInButton() {


  return (
    <button
      className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none flex justify-center items-center"
    >
      <Image src="/Google_logo.svg" alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}
