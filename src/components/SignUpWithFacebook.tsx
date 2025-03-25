"use client";
import Image from "next/image";

export function FacebookSignInButton() {


  return (
    <button
      className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none flex justify-center items-center"
    >
      <Image src="/facebook.png" alt="facebook Logo" width={25} height={25} />
      <span className="ml-4">Continue with Facebook</span>
    </button>
  );
}
