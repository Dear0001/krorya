"use client";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import React from "react";
import { usePostEmailMutation, usePostVerifyEmailMutation, usePostRegisterMutation } from "@/redux/services/auth";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {checkEmailExist} from "@/lib/constants";

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

// Add this type
type OtpInputs = {
    [key: number]: string;
};




const SignUpPage = React.memo(() => {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState<"email" | "otp" | "password">("email");
    const [email, setEmail] = useState("");
    const router = useRouter();

    const [postEmail, { isLoading: isEmailLoading }] = usePostEmailMutation();
    const [postVerifyEmail, { isLoading: isOtpLoading }] = usePostVerifyEmailMutation();
    const [postRegister, { isLoading: isRegisterLoading }] = usePostRegisterMutation();

    // Add this state
    const [emailChecking, setEmailChecking] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);

    // handle OTP input
    const [otp, setOtp] = useState<OtpInputs>({ 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" });
    const [timeLeft, setTimeLeft] = useState<number>(180); // 3 minutes in seconds
    const [canResend, setCanResend] = useState<boolean>(false);
    const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer effect
    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    // validate email
    useEffect(() => {
        const checkEmail = async () => {
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setEmailAvailable(null);
                return;
            }

            setEmailChecking(true);
            try {
                const exists = await checkEmailExist(email);
                setEmailAvailable(!exists);
            } catch (error) {
                console.error("Email check failed:", error);
                setEmailAvailable(null);
                toast.error("មិនអាចពិនិត្យអ៊ីមែលបានទេ។ សូមព្យាយាមម្តងទៀត។");
            } finally {
                setEmailChecking(false);
            }
        };

        const timer = setTimeout(checkEmail, 500); // Debounce for 500ms
        return () => clearTimeout(timer);
    }, [email]);



    // Auto submit when all OTP fields are filled
    useEffect(() => {
        const allFilled = Object.values(otp).every(val => val.length === 1);
        if (allFilled) {
            onSubmitOtp({ otp: Object.values(otp).join("") });
        }
    }, [otp]);

    // Format time to mm:ss and convert to Khmer numerals
    const formatTimeWithKhmerNumerals = (seconds: number) => {
        // First format to mm:ss (Roman numerals)
        const formatToRoman = (sec: number) => {
            const mins = Math.floor(sec / 60);
            const secs = sec % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

        // Convert Roman numerals to Khmer
        const convertToKhmer = (timeString: string) => {
            const khmerNumbers = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
            return timeString.split('').map(char => {
                // Handle colon separator
                if (char === ':') return ':';
                // Convert digits
                const digit = parseInt(char);
                return khmerNumbers[digit] || char;
            }).join('');
        };

        const romanTime = formatToRoman(seconds);
        return convertToKhmer(romanTime);
    };


    const handleOtpChange = (index: number, value: string) => {
        if (!/^[0-9]*$/.test(value)) return;

        const newOtp = { ...otp, [index]: value };
        setOtp(newOtp);

        // Move to next input if a digit was entered
        if (value.length === 1 && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }

        // Move to previous input if backspace was pressed and current input is empty
        if (value.length === 0 && index > 0) {
            otpInputRefs.current[index - 1]?.focus();
        }
    };

    // handle resend OTP request when timer expires
    const handleResendOtp = async () => {
        try {
            const response = await postEmail({ email }).unwrap();
            setTimeLeft(180);
            setCanResend(false);
            setOtp({ 0: "", 1: "", 2: "", 3: "", 4: "", 5: "" });
            otpInputRefs.current[0]?.focus();
            toast.success("OTP resent successfully!");
        } catch (error: any) {
            console.error("Failed to resend OTP:", error);
            toast.error(error.data?.message || "Failed to resend OTP. Please try again.");
        }
    };
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
            // First check if email exists
            const emailExists = await checkEmailExist(data.email);
            if (emailExists) {
                toast.error("អ៊ីមែលនេះធ្លាប់បានប្រើរួចហើយ។ សូមប្រើអ៊ីមែលផ្សេង ឬចូលគណនី។");
                return;
            }

            // If email doesn't exist, proceed with sending OTP
            const response = await postEmail({ email: data.email }).unwrap();
            setEmail(data.email);
            resetEmailForm();
            setStep("otp");
            toast.success("លេខកូដ OTP ត្រូវបានផ្ញើដោយជោគជ័យ! សូមពិនិត្យអ៊ីមែលរបស់អ្នក។");
        } catch (error: any) {
            console.error("Failed to send OTP:", error);
            let errorMessage = "មិនអាចផ្ញើ OTP បានទេ។ សូមព្យាយាមម្តងទៀត។";

            if (error.data) {
                errorMessage = error.data.message || errorMessage;
            } else if (error.status) {
                errorMessage = `កំហុសម៉ាស៊ីនបម្រើ: ${error.status}`;
            }

            toast.error(errorMessage);
        }
    };

    const onSubmitOtp: SubmitHandler<OtpFormData> = async (data) => {
        try {
            const response = await postVerifyEmail({ email, otp: data.otp }).unwrap();
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
            // console.log("Registration successful", response);
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
                            {/*Then modify your email input to show feedback:*/}
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="បញ្ចូលអុីម៉ែល"
                                    className="w-full px-4 py-3 border rounded-3xl bg-background-1 shadow-inner outline-none"
                                />
                                {emailChecking && (
                                    <div className="absolute right-3 top-3">
                                        {/* Loading spinner */}
                                        <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                )}
                                {emailAvailable === false && (
                                    <div className="h-2 text-xs pl-4 text-red-500">
                                        អ៊ីមែលនេះធ្លាប់បានប្រើរួចហើយ
                                    </div>
                                )}
                                {emailAvailable === true && (
                                    <div className="h-2 text-xs pl-4 text-green-500">
                                        អ៊ីមែលនេះអាចប្រើបាន
                                    </div>
                                )}
                                {emailErrors.email && (
                                    <div className="h-2 text-xs pl-4 text-red-500">
                                        {emailErrors.email.message}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isEmailLoading || emailAvailable === false}
                                className="w-full text-white px-4 py-3 border-black rounded-3xl bg-primary hover:bg-opacity-70 disabled:opacity-50"
                            >
                                {isEmailLoading ? "កំពុងផ្ញើ..." : "ផ្ញើលេខកូដ OTP"}
                            </button>
                        </form>
                    )}

                    {/* OTP Verification Step */}
                    {step === "otp" && (
                        <div className="w-full">
                            <p className="text-center mb-4">
                                យើងបានផ្ញើលេខកូដផ្ទៀងផ្ទាត់ទៅ <strong className={"text-secondary"}>{email}</strong>
                            </p>
                            <form
                                onSubmit={handleSubmitOtp(onSubmitOtp)}
                                className="flex flex-col items-center gap-2 px-1 w-full"
                            >
                                <div className="flex justify-center gap-2 mb-4">
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <input
                                            key={index}
                                            ref={(el: HTMLInputElement | null) => {
                                                otpInputRefs.current[index] = el;
                                            }}
                                            type="text"
                                            maxLength={1}
                                            value={otp[index]}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            className="w-10 h-10 lg:w-12 lg:h-12 md:w-12 md:h-12 text-center border rounded-lg bg-background-1 shadow-inner outline-none text-xl"
                                            inputMode="numeric"
                                        />
                                    ))}
                                </div>

                                <div className="text-center mb-4">
                                    {canResend ? (
                                        <button
                                            type="button"
                                            onClick={handleResendOtp}
                                            className="text-primary  py-1.5 px-3 rounded-lg border border-primary"
                                        >
                                            ផ្ញើ OTP ម្តងទៀត
                                        </button>
                                    ) : (
                                        <p>ផ្ញើ OTP ឡើងវិញ <span className={"text-secondary font-bold"}>{formatTimeWithKhmerNumerals(timeLeft)} </span> នារទី</p>
                                    )}
                                </div>

                                {timeLeft <= 0 && (
                                    <p className="text-red-500 text-sm mb-2">OTP has expired. Please request a new one.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isOtpLoading || Object.values(otp).some(val => val.length !== 1)}
                                    className="w-full text-white px-4 py-3 border-black rounded-3xl bg-primary hover:bg-opacity-70 disabled:opacity-50"
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
                    <div className={"mt-2"}>
                        <span>តើអ្នកមានគណនីឬនៅ?</span>
                        <Link href={"/login"} className={"text-primary"}>
                            {" "}
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