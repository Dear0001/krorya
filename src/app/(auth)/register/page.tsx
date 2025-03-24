"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import React from "react";
import { GoogleSignInButton } from "@/components/SignUpWithGoogle";
import { usePostEmailMutation, usePostVerifyEmailMutation, usePostRegisterMutation } from "@/redux/services/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type EmailFormData = {
    email: string;
};

type OtpFormData = {
    otp: string;
};

type PasswordFormData = {
    newPassword: string;
    confirmPassword: string;
};

const SignUpPage = React.memo(() => {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState<"email" | "otp" | "password">("email");
    const [email, setEmail] = useState("");
    const router = useRouter();

    const [postEmail, { isLoading: isEmailLoading }] = usePostEmailMutation();
    const [postVerifyEmail, { isLoading: isOtpLoading }] = usePostVerifyEmailMutation();
    const [postRegister, { isLoading: isRegisterLoading }] = usePostRegisterMutation();

    // Separate form hooks for each step
    const {
        register: registerEmail,
        handleSubmit: handleSubmitEmail,
        formState: { errors: emailErrors },
        reset: resetEmailForm,
    } = useForm<EmailFormData>();

    const {
        register: registerOtp,
        handleSubmit: handleSubmitOtp,
        formState: { errors: otpErrors },
        reset: resetOtpForm,
    } = useForm<OtpFormData>();

    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        watch,
        formState: { errors: passwordErrors },
    } = useForm<PasswordFormData>();

    const onSubmitEmail: SubmitHandler<EmailFormData> = async (data) => {
        try {
            const response = await postEmail({ email: data.email }).unwrap();
            console.log("OTP sent successfully", response);
            setEmail(data.email);
            resetEmailForm();
            setStep("otp");
            toast.success("OTP sent successfully! Check your email.");
        } catch (error: any) {
            console.error("Failed to send OTP:", error);
            let errorMessage = "Failed to send OTP. Please try again.";

            if (error.data) {
                errorMessage = error.data.message || errorMessage;
            } else if (error.status) {
                errorMessage = `Server error: ${error.status}`;
            }

            toast.error(errorMessage);
        }
    };

    const onSubmitOtp: SubmitHandler<OtpFormData> = async (data) => {
        try {
            const response = await postVerifyEmail({ email, otp: data.otp }).unwrap();
            console.log("OTP verified successfully", response);
            resetOtpForm();
            setStep("password");
            toast.success("Email verified successfully!");
        } catch (error: any) {
            console.error("OTP verification failed:", error);
            let errorMessage = "OTP verification failed. Please try again.";

            if (error.data) {
                errorMessage = error.data.message || errorMessage;
            } else if (error.status) {
                errorMessage = `Server error: ${error.status}`;
            }

            toast.error(errorMessage);
        }
    };

    const onSubmitPassword: SubmitHandler<PasswordFormData> = async (data) => {
        try {
            const response = await postRegister({ email, newPassword: data.newPassword }).unwrap();
            console.log("Registration successful", response);
            toast.success("Registration successful! Redirecting to login...");
            setTimeout(() => router.push("/login"), 2000);
        } catch (error: any) {
            console.error("Registration failed:", error);
            let errorMessage = "Registration failed. Please try again.";

            if (error.data) {
                errorMessage = error.data.message || errorMessage;
            } else if (error.status) {
                errorMessage = `Server error: ${error.status}`;
            }

            toast.error(errorMessage);
        }
    };

    return (
        <div className="w-11/12 z-40 h-fit flex justify-center items-center">
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

                    {/* Email Step */}
                    {step === "email" && (
                        <form
                            onSubmit={handleSubmitEmail(onSubmitEmail)}
                            className="flex flex-col items-center gap-3 w-full"
                        >
                            <div className="relative w-full">
                                <input
                                    type="email"
                                    {...registerEmail("email", {
                                        required: "អ៊ីមែលត្រូវបានទាមទារ",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "អាសយដ្ឋានអ៊ីមែលមិនត្រឹមត្រូវ",
                                        },
                                    })}
                                    placeholder="បញ្ចូលអុីម៉ែល"
                                    className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none"
                                />
                                {emailErrors.email && (
                                    <div className="h-2 text-xs pl-4 text-red-500">
                                        {emailErrors.email.message}
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isEmailLoading}
                                className="w-full text-white px-4 py-3 border-black rounded-3xl bg-primary hover:bg-opacity-70"
                            >
                                {isEmailLoading ? "កំពុងផ្ញើ..." : "ផ្ញើលេខកូដ OTP"}
                            </button>
                        </form>
                    )}

                    {/* OTP Verification Step */}
                    {step === "otp" && (
                        <div className="w-full">
                            <p className="text-center mb-4">We've sent a verification code to <strong>{email}</strong></p>
                            <form
                                onSubmit={handleSubmitOtp(onSubmitOtp)}
                                className="flex flex-col items-center gap-3 w-full"
                            >
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        {...registerOtp("otp", {
                                            required: "លេខកូដ OTP ត្រូវបានទាមទារ",
                                        })}
                                        placeholder="បញ្ចូលលេខកូដ OTP"
                                        className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none"
                                    />
                                    {otpErrors.otp && (
                                        <div className="h-2 text-xs pl-4 text-red-500">
                                            {otpErrors.otp.message}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isOtpLoading}
                                    className="w-full text-white px-4 py-3 border-black rounded-3xl bg-primary hover:bg-opacity-70"
                                >
                                    {isOtpLoading ? "កំពុងផ្ទៀងផ្ទាត់..." : "ផ្ទៀងផ្ទាត់ OTP"}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Password Step */}
                    {step === "password" && (
                        <div className="w-full">
                            <p className="text-center mb-4">Create password for <strong>{email}</strong></p>
                            <form
                                onSubmit={handleSubmitPassword(onSubmitPassword)}
                                className="flex flex-col items-center gap-3 w-full"
                            >
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...registerPassword("newPassword", {
                                            required: "ពាក្យសម្ងាត់ត្រូវបានទាមទារ",
                                            minLength: {
                                                value: 6,
                                                message: "ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងតិច ៦ តួអក្សរ",
                                            },
                                        })}
                                        placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី"
                                        className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none"
                                    />
                                    {passwordErrors.newPassword && (
                                        <div className="h-2 text-xs pl-4 text-red-500">
                                            {passwordErrors.newPassword.message}
                                        </div>
                                    )}
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...registerPassword("confirmPassword", {
                                            required: "សូមបញ្ជាក់ពាក្យសម្ងាត់",
                                            validate: (value) =>
                                                value === watch("newPassword") || "ពាក្យសម្ងាត់មិនដូចគ្នា",
                                        })}
                                        placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
                                        className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none"
                                    />
                                    {passwordErrors.confirmPassword && (
                                        <div className="h-2 text-xs pl-4 text-red-500">
                                            {passwordErrors.confirmPassword.message}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center w-full">
                                    <input
                                        type="checkbox"
                                        id="showPassword"
                                        checked={showPassword}
                                        onChange={() => setShowPassword(!showPassword)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="showPassword">បង្ហាញពាក្យសម្ងាត់</label>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isRegisterLoading}
                                    className="w-full text-white px-4 py-3 border-black rounded-3xl bg-primary hover:bg-opacity-70"
                                >
                                    {isRegisterLoading ? "កំពុងចុះឈ្មោះ..." : "ចុះឈ្មោះ"}
                                </button>
                            </form>
                        </div>
                    )}

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