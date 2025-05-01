"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {useAppDispatch} from "@/redux/hooks";
import {setAccessToken} from "@/redux/features/auth/authSlice";
import {GoogleSignInButton} from "@/components/SignUpWithGoogle";
import {FacebookSignInButton} from "@/components/SignUpWithFacebook";
import style from "@/app/style/auth.module.css";

type ValueTypes = { email: string; password: string };

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ValueTypes>();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit: SubmitHandler<ValueTypes> = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: values.email.toLowerCase(), password: values.password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("ការចូលគណនីបានជោគជ័យ!");
                dispatch(setAccessToken(data?.payload?.access_token));
                if(data?.user?.role === "ROLE_USER") {
                    router.push("/home");
                } else {
                    router.push("/dashboard");
                }

            } else if (response.status === 404 && data.detail === "You have been banned") {
                toast.error(data.detail || "គណនីរបស់អ្នកត្រូវបានហាម");
            } else {
                toast.error(data?.message || "ការចូលគណនីមិនបានសម្រេច");
            }
        } catch (error) {
            toast.error("មានបញ្ហាបច្ចេកទេស! សូមព្យាយាមម្តងទៀត។");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-11/12 z-40 h-fit flex justify-center items-center">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/**/}
            <section className={style.container}>
                <div className="flex flex-col items-center py-4 md:w-1/2 lg:w-1/2">
                    <h1 className={style.header}>
                        ក្រយាសូមស្វាគមន៍!
                    </h1>
                    <Image src="/assets/images/signin-icon.svg" alt="kback" width={100} height={45} />
                    <p className="text-center text-slate-800 mt-8">
                        សូមវាយបញ្ចូលអុីម៉ែលនិង ពាក្យសម្ងាត់ដើម្បីចូលគណនី
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3 w-full mt-4">
                        <div className="relative w-full">
                            <input
                                className={style.input}
                                type="email"
                                placeholder="john@gmail.com"
                                {...register("email", {
                                    required: "អ៊ីមែលត្រូវបានទាមទារ",
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "អាសយដ្ឋានអ៊ីមែលមិនត្រឹមត្រូវ" },
                                })}
                            />
                            <div className="h-3 mt-2">{errors.email && <p className="text-red-500 text-xs pl-4">{errors.email.message}</p>}</div>
                        </div>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "ពាក្យសម្ងាត់ត្រូវបានទាមទារ",
                                    minLength: { value: 6, message: "ពាក្យសម្ងាត់ត្រូវតែមានចាប់យកប្រាក់ 6 តួអក្សរឬច្រើនជាង" },
                                })}
                                placeholder="បញ្ចូលពាក្យសម្ងាត់"
                                className={style.input}
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
                                {errors.password && <p className="text-red-500 pl-4 text-xs">{errors.password.message}</p>}
                                <p className="ml-auto pr-4">
                                    <Link href="/auth/forgetpassword" className="text-xs pointer-events-none text-gray-400">
                                        ភ្លេចពាក្យសម្ងាត់?
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <button type="submit" disabled={isSubmitting || loading} className="w-full text-white px-4 py-3 border-black rounded-3xl bg-primary hover:bg-opacity-70 mt-2">
                            {loading ? "កំពុងផ្ទុក..." : "ចូលគណនី"}
                        </button>
                    </form>
                    <div className="text-center flex gap-2 my-4">
                        <Image src="/icons/group-1.svg" alt="line" width={100} height={70} />
                        <span>ឬភ្ជាប់ជាមួយ</span>
                        <Image src="/icons/group-2.svg" alt="line" width={100} height={70} />
                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        <GoogleSignInButton />
                        {/*<span  className={"opacity-50 pointer-events-none"}>*/}
                        {/*    <FacebookSignInButton />*/}
                        {/*</span>*/}
                        <div className="relative w-full group cursor-not-allowed">
                          <span className="opacity-50 pointer-events-none">
                            <FacebookSignInButton />
                          </span>

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 rounded text-xs text-white bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                Developing
                            </div>
                        </div>

                    </div>

                    <div className="mt-4">
                        <span>តើអ្នកមានគណនីឬនៅ?</span>
                        <Link className="text-primary" href="/register">
                        {/*<Link className="pointer-events-none text-gray-400" href="/register">*/}
                            {" "}
                            បង្កើតគណនី
                        </Link>
                    </div>

                </div>
                <div className="md:h-[600px] rounded-lg overflow-hidden lg:w-1/2 mt-0" style={{ margin: 0 }}>
                    <div className="relative w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/signin-image.png')" }}>
                        <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center p-4">
                            <p className="text-white text-base font-moulpali leading-8 p-4 text-center bg-white bg-opacity-30 rounded-lg">
                                ម្ហូបខ្មែរមានភាពសម្បូរបែបអស្ចារ្យ ដែលបង្ហាញពីប្រណីតភាពនៃ រសជាតិ ព្រមទាំងគំនិតច្នៃប្រឌិត ។
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Login;
