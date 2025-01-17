"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import {loginService} from "@/servises/auth.service";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";

// Define the Zod schema
const schema = z.object({
    email: z.string().email('Invalid email').min(1),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Infer the type from the Zod schema
type FormData = z.infer<typeof schema>;

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form data using Zod
        const result = schema.safeParse(formData);

        if (!result.success) {
            // Convert Zod errors to a more usable format
            const errorMessages: { [key: string]: string } = {};
            result.error.issues.forEach((issue) => {
                errorMessages[issue.path[0]] = issue.message;
            });
            setErrors(errorMessages);
            return;
        }

        // Call the handleLogin function
        await handleLogin(formData);
    };

    const handleLogin = async (userInfo: { email: string; password: string }) => {
        try {
            // Call the login service
            const response = await loginService(userInfo);

            // Store the token in cookies or localStorage
            if (typeof window !== "undefined") {
                document.cookie = `next-auth.session-token=${response.payload.access_token}; path=/;`;
            }

            // Log the response data on successful login
            console.log("Login successful! Response data:", response);

            // Check the user's role and navigate accordingly
            if (response.payload.role === "ROLE_ADMIN") {
                toast.success("Login successful!");
                router.push("/admin/dashboard");
            } else {
                document.cookie = "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                toast.warning("You are not authorized to access this page.");
                router.push("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error instanceof Error ? error.message : "Login failed");
        }
        setLoading(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    return (
        <main className="Login w-[1728px] h-[1117px] relative bg-[#F5F5F5] overflow-hidden shadow-2xl flex justify-center items-center">
            <ToastContainer />
            {/* Centered Box */}
            <section className="Login w-[1340px] z-20 rounded-2xl h-[828px] bg-neutral-100 overflow-hidden shadow-2xl mx-auto flex justify-center items-center">
                <div
                    className="flex flex-row gap-28 justify-between items-center w-full max-w-[1200px] max-md:flex-col max-md:gap-16">
                    <div className="flex flex-col flex-1 gap-8 items-center">
                        <div
                            className="text-5xl text-center text-red-700 leading-[56px] max-sm:text-4xl max-sm:leading-10">
                            គ្រាន់តែស្វាគមន៍!
                        </div>
                        <div className="w-full h-6 bg-center bg-no-repeat bg-[url(/assets/divider_login.svg)]"/>
                        <div className="text-xl leading-7 text-center text-zinc-800">
                            សូមវាយបញ្ចូលអុីម៉ែលនិង ពាក្យសម្ងាត់ដើម្បីចូលគណនី
                        </div>
                        <form onSubmit={handleSubmit}
                              className="flex flex-col gap-3 w-full max-w-[430px] max-sm:max-w-full">
                            {/* Email Input */}
                            <div>
                                <input
                                    className="py-5 rounded-[25px] border-0 outline-0 focus:ring-0 w-full"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="បញ្ចូលអ៊ីមែល"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <div className="relative">
                                    <input
                                        className="py-5 rounded-[25px] border-0 outline-0 focus:ring-0 w-full"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="បញ្ចូលពាក្យសម្ងាត់"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaRegEye className={"text-2xl"}/> :
                                            <FaRegEyeSlash className={"text-2xl"}/>}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            <a href="#" className="text-lg leading-6 text-right text-blue-500 no-underline">
                                ភ្លេចពាក្យសម្ងាត់?
                            </a>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#D7AD45] py-5 rounded-[25px] text-white"
                                >
                                    {loading ? 'Loading...' : 'ចូលគណនី'}
                                </button>
                            </div>


                            <Image src="/assets/divider_login.svg" alt="Divider" width={0} height={0}/>
                            <hr/>

                            {/* Google Login Button */}
                            <button type="button" className="border border-amber-300 py-5 rounded-[25px]">
                                ចូលគណនីតាមរយៈ Google
                            </button>
                        </form>
                    </div>
                    <div className="flex-1 max-md:w-full relative">
                        <div className="overflow-hidden w-full h-auto rounded-3xl">
                        <Image
                                src="/assets/image_login.png"
                                width={537}
                                height={674}
                                alt="Rice bowl with rice plants"
                                className="object-cover w-full h-auto"
                            />
                        </div>
                        {/* Text Image */}
                        <div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-5">
                            <div className={"bg-white/30 backdrop-blur-md rounded-2xl"}>
                                <Image
                                    src="/assets/text_on_images_login.svg"
                                    width={482.02}
                                    height={179.87}
                                    alt="Text on image"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Top-Left Image */}
            <div className="absolute top-0 left-0">
                <Image src="/assets/left_top_login.svg" alt="Top-Left Image" width={359} height={358}/>
            </div>

            {/* Top-Right Image */}
            <div className="absolute top-0 right-0">
                <Image src="/assets/right_top_login.svg" alt="Top-Right Image" width={359} height={358}/>
            </div>

            {/* Bottom-Left Image */}
            <div className="absolute bottom-0 left-0">
                <Image src="/assets/left_bottom_login.svg" alt="Bottom-Left Image" width={359} height={358} />
            </div>

            {/* Bottom-Right Image */}
            <div className="absolute bottom-0 right-0">
                <Image src="/assets/right_bottom_login.svg" alt="Bottom-Right Image" width={359} height={358} />
            </div>
        </main>
    );
};

export default Page;