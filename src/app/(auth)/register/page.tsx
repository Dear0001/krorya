"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React from "react";
import {GoogleSignInButton} from "@/components/SignUpWithGoogle";

const SignUpPage = React.memo(() => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onBlur",
    });


    return (
        <div className="w-11/12 z-40 h-fit flex justify-center items-center">
            <div className="mx-auto flex h-5/6 py-4 flex-col-reverse sm:flex-row md:flex-col md:items-center md:h-1/2 lg:flex-row gap-10 max-w-[1000px] lg:w-full lg:px-16 md:px-14 md:py-16 w-full rounded-3xl bg-white p-4 space-y-8">
                <div className="flex flex-col items-center justify-center gap-2 md:w-full lg:w-1/2">
                    <h1 className="font-moulpali text-center font-bold text-[13px] md:text-3xl lg:text-[30px] sm:text-[9px] text-secondary">
                        ក្រយាសូមស្វាគមន៍!
                    </h1>
                    <Image
                        src="/assets/images/signin-icon.svg"
                        alt="Sign In Icon"
                        width={100}
                        height={45}
                    />
                    <p className="text-center">បង្កើតគណនី</p>
                    <form
                        className="flex flex-col items-center gap-3 w-full"
                    >
                        <div className="flex gap-4 w-full">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    {...register("firstname", { required: "សូមបញ្ចូលនាមត្រកូល" })}
                                    placeholder="នាមត្រកូល"
                                    className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none"
                                />
                                <div className="h-2 text-xs pl-4">
                                </div>
                            </div>
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    {...register("lastname", { required: "សូមបញ្ចូលនាមខ្លួន" })}
                                    placeholder="នាមខ្លួន"
                                    className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none"
                                />
                                <div className="h-2 text-xs pl-4">
                                </div>
                            </div>
                        </div>{" "}
                        <div className="relative w-full">
                            <input
                                type="email"
                                {...register("email", {
                                    required: "អ៊ីមែលត្រូវបានទាមទារ",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "អាសយដ្ឋានអ៊ីមែលមិនត្រឹមត្រូវ",
                                    },
                                })}
                                placeholder="បញ្ចូលអុីម៉ែល"
                                className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none"
                            />
                            <div className="h-2 text-xs pl-4">
                            </div>
                        </div>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "ពាក្យសម្ងាត់ត្រូវបានទាមទារ",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "ពាក្យសម្ងាត់ត្រូវតែមានចាប់យកប្រាក់ 6 តួអក្សរឬច្រើនជាង",
                                    },
                                })}
                                placeholder="បញ្ចូលពាក្យសម្ងាត់"
                                className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none"
                            />
                            <div className="h-2 text-xs pl-4">
                            </div>
                        </div>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("confirmPassword", {
                                    required: "សូមបញ្ចូលពាក្យសម្ងាត់ដ",
                                    validate: (value) =>
                                        value === watch("password") || "ពាក្យសម្ងាត់ត្រូវតែដូចគ្នា",
                                })}
                                placeholder="បញ្ចូលពាក្យសម្ងាត់"
                                className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none"
                            />
                            <div className="h-4 text-xs pl-4">
                                <p className="text-red-500">
                                    {errorMessage}
                                </p>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full text-white px-4 py-3 border-black rounded-3xl bg-primary hover:bg-opacity-70"
                        >
                            ចុះឈ្មោះ
                        </button>
                    </form>
                    <div className="text-center flex gap-2">
                        <Image
                            src={"/icons/group-1.svg"}
                            alt={"line"}
                            width={100}
                            height={70}
                        />
                        <span>ឬភ្ជាប់ជាមួយ</span>
                        <Image
                            src={"/icons/group-2.svg"}
                            alt={"line"}
                            width={100}
                            height={70}
                        />
                    </div>
                    <GoogleSignInButton />
                    <div className={"mt-2"}>
                        <span>តើអ្នកមានគណនីឬនៅ?</span>
                        <Link href={"/login"} className={"text-primary"}>
                             ចូលគណនី
                        </Link>
                    </div>
                </div>
                <div className="md:h-[600px] rounded-lg overflow-hidden lg:w-1/2 mt-0">
                    <div
                        className="relative w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('/assets/images/rice-noodles-bowl-curry-paste-with-chili-cucumber-long-bean-lime-garlic-spring-onion_1150-27067 4.png')",
                        }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4">
                            <p className="text-white text-base t font-moulpali leading-8 p-4 text-center bg-white bg-opacity-30 rounded-lg">
                                ម្ហូបខ្មែរមានភាពសម្បូរបែបអស្ចារ្យ ដែលបង្ហាញពីប្រណីតភាពនៃ រសជាតិ
                                ព្រមទាំងគំនិតច្នៃប្រឌិត ។
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default SignUpPage;
