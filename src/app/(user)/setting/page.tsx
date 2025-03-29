"use client";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectToken } from "@/redux/features/auth/authSlice";
import { usePostResetPasswordMutation } from "@/redux/services/auth";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";
import {GoEyeClosed} from "react-icons/go";
import {FaRegEye} from "react-icons/fa";
import NotAuthorize from "@/components/NotAuthorize";

type FormValues = {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export default function SettingsPage() {
    const token = useSelector(selectToken);
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false
    });
    const [postResetPassword, { isLoading, isSuccess, error }] = usePostResetPasswordMutation();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        mode: "onBlur",
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await postResetPassword({
                email: data.email,
                newPassword: data.newPassword
            }).unwrap();
            toast.success("ពាក្យសម្ងាត់ត្រូវបានផ្លាស់ប្តូរដោយជោគជ័យ");
            reset(); // Reset form after successful submission
        } catch (err) {
            toast.error("កំហុសក្នុងការផ្លាស់ប្តូរពាក្យសម្ងាត់");
        }
    };

    const togglePasswordVisibility = (field: 'newPassword' | 'confirmPassword') => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const renderErrorMessage = (
        error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    ) => {
        return error?.message as string | undefined;
    };

    return (
        <>
            <ToastContainer/>
            {token ? (
                <div className="bg-white rounded-md flex flex-col gap-4 overflow-hidden h-screen">
                    <div className="border border-primary lg:h-[350px] sm:py-5 flex flex-col md:flex-row lg:justify-around md:justify-around justify-start items-center bg-white rounded-md my-8 mx-7 p-5">
                        <div className="md:self-start">
                            <span className={"bg-yellow-100"}>
                               <Image src={"/reset.svg"} className={"p-2"} width={44} height={44} alt={"password"} />
                            </span>

                            <h1 className="font-semibold text-2xl text-primary  mb-4">
                                កែប្រែពាក្យសម្ងាត់
                            </h1>
                            <p className="text-sm">
                                ពួកយើងណែនាំអោយប្រើប្រាស់កម្មវិធីគ្រប់គ្រងលេខកូដសម្ងាត់ ឬ<br />
                                ប្រើប្រាស់លេខសម្ងាត់ណាដែលមានលេខ អក្សរ និងអក្សរពិសេស
                            </p>
                        </div>
                        <div className="w-full md:self-start sm:w-1/2 md:w-2/5 lg:w-1/2">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col items-center w-full mt-4"
                            >
                                {/* Email Field */}
                                <div className="relative w-full">
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "អ៊ីមែលត្រូវបានទាមទារ",
                                        })}
                                        placeholder="បញ្ចូលអ៊ីមែល"
                                        className="w-full px-4 py-3 rounded-lg border "
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs ml-4 mt-1">
                                            {renderErrorMessage(errors.email)}
                                        </p>
                                    )}
                                </div>

                                {/* New Password Field */}
                                <div className="relative w-full mt-4">
                                    <div className="relative">
                                        <input
                                            type={showPassword.newPassword ? "text" : "password"}
                                            {...register("newPassword", {
                                                required: "ពាក្យសម្ងាត់ថ្មីត្រូវបានទាមទារ",
                                                minLength: {
                                                    value: 6,
                                                    message: "ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ ៦ តួអក្សរ",
                                                },
                                            })}
                                            placeholder="បញ្ចូលពាក្យសម្ងាត់ថ្មី"
                                            className="w-full px-4 py-3 rounded-lg border "
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility('newPassword')}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        >
                                            {showPassword.newPassword ? (
                                                <FaRegEye className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <GoEyeClosed className="h-5 w-5 text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.newPassword && (
                                        <p className="text-red-500 text-xs ml-4 mt-1">
                                            {renderErrorMessage(errors.newPassword)}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div className="relative w-full mt-4">
                                    <div className="relative">
                                        <input
                                            type={showPassword.confirmPassword ? "text" : "password"}
                                            {...register("confirmPassword", {
                                                required: "សូមបញ្ជាក់ពាក្យសម្ងាត់ថ្មី",
                                                validate: value =>
                                                    value === watch("newPassword") || "ពាក្យសម្ងាត់មិនដូចគ្នា",
                                            })}
                                            placeholder="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
                                            className="w-full px-4 py-3 rounded-lg border "
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility('confirmPassword')}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        >
                                            {showPassword.confirmPassword ? (
                                                <FaRegEye className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <GoEyeClosed className="h-5 w-5 text-gray-500" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 text-xs ml-4 mt-1">
                                            {renderErrorMessage(errors.confirmPassword)}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-fit self-end text-sm text-white px-4 py-3 border-black rounded-md bg-primary hover:bg-opacity-70 mt-4"
                                >
                                    {isLoading ? "កំពុងដំណើរការ..." : "ផ្លាស់ប្តូរពាក្យសម្ងាត់"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
             <NotAuthorize/>
            )}
        </>
    );
}