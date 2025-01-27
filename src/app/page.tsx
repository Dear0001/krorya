"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Form submission handler
    const onSubmit = async (data: any) => {
        try {
            const response = await loginService(data);
            if (response?.statusCode === "200") {
                toast.success("ការចូលគណនីបានជោគជ័យ!");
                router.push("/amin/dashboard");
            } else {
                toast.error(response?.message || "ការចូលគណនីមិនបានសម្រេច");
            }
        } catch (error) {
            toast.error("មានបញ្ហាបច្ចេកទេស! សូមព្យាយាមម្តងទៀត។");
        }
    };
    return (
        <div className="w-10/12 z-40 h-fit flex justify-center items-center">
            <ToastContainer/>
            <div className="mx-auto flex flex-col-reverse sm:flex-row gap-10 max-w-[1000px] lg:w-full lg:px-16 md:px-14 md:py-16 w-full rounded-3xl bg-white p-4 space-y-8">
                <div className="flex flex-col items-center  py-4 md:w-1/2 lg:w-1/2">
                    <h1 className="font-moulpali text-center font-bold text-2xl md:text-[30px] sm:text-3xl text-secondary mb-8">
                        ក្រយាសូមស្វាគមន៍!
                    </h1>
                    <Image
                        src="/assets/images/signin-icon.svg"
                        alt="kback"
                        width={100}
                        height={45}
                    />
                    <p className="text-center text-slate-800 mt-8">
                        សូមវាយបញ្ចូលអុីម៉ែលនិង ពាក្យសម្ងាត់ដើម្បីចូលគណនី
                    </p>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col items-center gap-3 w-full mt-4"
                    >
                        <div className="relative w-full">
                            <input
                                className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none"
                                type="email"
                                placeholder="john@gmail.com"
                                {...register("email", {
                                    required: "អ៊ីមែលត្រូវបានទាមទារ",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "អាសយដ្ឋានអ៊ីមែលមិនត្រឹមត្រូវ",
                                    },
                                })}
                            />
                            <div className="h-3 mt-2">
                                {errors.email && (
                                    <p className="text-red-500 text-xs pl-4">
                                        {typeof errors.password?.message === "string" && errors.password.message}
                                    </p>
                                )}
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
                            <Image
                                onClick={() => setShowPassword((prev) => !prev)}
                                width={20}
                                height={20}
                                className="absolute top-1/3 right-4 -translate-y-1/2 cursor-pointer z-20 opacity-100"
                                src={showPassword ? "/icons/eye-open.svg" : "/icons/eye.svg"}
                                alt="toggle password visibility"
                            />

                            <div className="h-3 flex justify-between items-center mt-2">
                                {errors.password && (
                                    <p className="text-red-500 pl-4 text-xs">
                                        {typeof errors.password?.message === "string" && errors.password.message}
                                    </p>
                                )}
                                <p className="ml-auto pr-4">
                                    <Link
                                        href="/auth/forgetpassword"
                                        className="text-primary text-xs"
                                    >
                                        ភ្លេចពាក្យសម្ងាត់?
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full text-white px-4 py-3 border-black rounded-3xl bg-primary hover:bg-opacity-70 mt-2"
                        >
                            ចូលគណនី
                        </button>
                    </form>
                    <div className="text-center flex gap-2 my-4">
                        <Image
                            src="/icons/group-1.svg"
                            alt="line"
                            width={100}
                            height={70}
                        />
                        <span>ឬភ្ជាប់ជាមួយ</span>
                        <Image
                            src="/icons/group-2.svg"
                            alt="line"
                            width={100}
                            height={70}
                        />
                    </div>
                    {/* <GoogleSignInButton type="button" /> */}
                    <div className="mt-4">
                        <span>តើអ្នកមានគណនីឬនៅ?</span>
                        <Link className="text-primary" href="/auth/signup">
                            {" "}
                            បង្កើតគណនី
                        </Link>
                    </div>
                </div>
                <div
                    className="md:h-[600px] rounded-lg overflow-hidden lg:w-1/2 mt-0"
                    style={{ margin: 0 }}
                >
                    <div
                        className="relative w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/assets/images/signin-image.png')",
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
};

export default Page;