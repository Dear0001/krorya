"use client";
import React, { useRef, useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";
import { useUpdateUserProfileMutation } from "@/redux/services/user";
import { useUploadFileMutation } from "@/redux/services/file";
import * as Yup from "yup";
import {SUPPORTED_FORMATS, FILE_SIZE, getImageUrl} from "@/lib/constants";
import {toast, ToastContainer} from "react-toastify";
import Loading from "@/components/loading/Loading";

type UserProfile = {
    id: string;
    profileImage: string;
    fullName: string;
    phoneNumber: string;
};

type UploadFileResponse = {
    message: string;
    payload: string[];
};

const fileValidationSchema = Yup.object().shape({
    file: Yup.mixed()
        .test("fileFormat", "Unsupported Format", (value: any) => {
            if (!value) return true;
            return SUPPORTED_FORMATS.includes(value.type);
        })
        .test("fileSize", "File Size is too large (max 2MB)", (value: any) => {
            if (!value) return true;
            return value.size <= FILE_SIZE;
        })
        .required("File is required"),
});

type EditProfileProps = {
    onSubmit?: (formData: any) => Promise<void>;
    userData: UserProfile;
};

const EditProfile: React.FC<EditProfileProps> = ({ onSubmit, userData }) => {
    const [updateProfile, { isLoading: isUpdating }] = useUpdateUserProfileMutation();
    const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState<UserProfile>({
        id: "",
        profileImage: "",
        fullName: "",
        phoneNumber: "",
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userData) {
            setFormData({
                id: userData.id,
                profileImage: userData.profileImage,
                fullName: userData.fullName,
                phoneNumber: userData.phoneNumber,
            });
            // Update the image preview logic to match your desired implementation
            setImagePreview(
                userData?.profileImage === "default.jpg" || !userData?.profileImage
                    ? "/man.png"
                    : getImageUrl(userData.profileImage)
            );
        }
    }, [userData]);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            await fileValidationSchema.validate({ file });

            const formData = new FormData();
            formData.append("files", file);

            const response = await uploadFile(formData).unwrap() as unknown as UploadFileResponse;
            const fileUrl = response.payload[0];
            const fileName = fileUrl.split("/").pop();

            setFormData((prevFormData) => ({
                ...prevFormData,
                profileImage: fileName || ""
            }));

            // Use the object URL for immediate preview
            setImagePreview(URL.createObjectURL(file));
            setError(null);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                setError(error.message);
            } else {
                console.error("Image upload failed:", error);
                if (typeof error === "object" && error !== null && "status" in error) {
                    const typedError = error as { status: number; data?: { message?: string } };
                    if (typedError.status === 413) {
                        setError("Error: The uploaded file is too large. Please upload a smaller file.");
                    } else if (typedError.status === 405) {
                        setError("Error: The server does not support the selected method. Please contact support.");
                    } else {
                        setError(`An unexpected error occurred: ${typedError.data?.message || "Unknown error"}`);
                    }
                } else {
                    setError("An unexpected error occurred while uploading the file.");
                }
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await updateProfile({
                id: userData?.id,
                updatedUser: {
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber,
                    profileImage: formData.profileImage,
                },
            }).unwrap();

            if (response.statusCode === "200") {
                toast.success(response.message || "Profile updated successfully", { autoClose: 3000 });
                setIsOpen(false);
            } else {
                toast.error(response.message || "Failed to update profile", { autoClose: 3000 });
            }

        } catch (error: any) {
            console.error("Update Profile Error:", error);
            toast.dismiss();
            toast.error(error?.data?.message || "An error occurred while updating the profile", { autoClose: 3000 });
        }
    };

    return (
        <main>
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

            <button onClick={() => setIsOpen(true)}>
                <Image src="/icons/pancel.svg" width={25} height={25} alt="Edit Profile" />
            </button>
            {isOpen && (
                <section className="bg-black/50 fixed inset-0 flex items-center justify-center z-50">
                    <article className="relative py-8 px-4 w-full max-w-md bg-white rounded-lg shadow-lg">
                        <button
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 hover:text-gray-900 p-1.5"
                            onClick={() => setIsOpen(false)}
                        >
                            <MdOutlineCancel size={24} />
                        </button>
                        <div className="text-center">
                            <h3 className="mb-3 text-2xl font-semibold leading-5 font-moulpali text-secondary lg:text-2xl">កែប្រែព័ត៍មាន</h3>
                            <p className="mt-2 text-sm leading-4 text-slate-600 flex justify-center">
                                <Image
                                    src="/icons/Kbach.svg"
                                    alt="border"
                                    width={100}
                                    height={13}
                                />
                            </p>
                        </div>
                        <div className="mt-5 flex flex-col items-center">
                            <div
                                className="w-[150px] h-[150px] rounded-full border-2 border-gray-300"
                                style={{
                                    backgroundImage: `url(${
                                        formData.profileImage === "default.jpg" || !formData.profileImage
                                            ? "/man.png"
                                            : imagePreview?.startsWith('blob:')
                                                ? imagePreview
                                                : getImageUrl(formData.profileImage)
                                    })`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <button
                                    className="relative top-[110px] left-[110px] bg-gray-300 rounded-full p-2"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Image
                                        src="/icons/Camera_fill.svg"
                                        alt="Upload"
                                        width={25}
                                        height={25}
                                    />
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                        <form className="w-full mt-10" onSubmit={handleSubmit}>
                            <div>
                                <div className={"mb-5"}>
                                    <label className="text-color-2 font-semibold mb-2.5 flex justify-start">
                                        នាមត្រកូល
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder={"Full Name"}
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full text-color-2 leading-6 bg-transparent flex items-start gap-2.5 pt-3.5 pb-3.5 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300"
                                    />
                                </div>
                                <div className={"mb-5"}>
                                    <label className="text-color-2 font-semibold mb-2.5 flex justify-start">
                                        លេខទូរស័ព្ទ
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder={"Phone Number"}
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full text-color-2 leading-6 bg-transparent flex items-start gap-2.5 pt-3.5 pb-3.5 px-4 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-0 focus:border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className={"mt-6 text-center text-sm text-slate-600 flex justify-end"}>
                                <button
                                    type="submit"
                                    disabled={isUpdating || isUploading}
                                    className="bg-primary py-2 px-5 rounded-lg text-white"
                                >
                                    {isUpdating || isUploading ? <Loading/> : "កែប្រែ"}
                                </button>
                            </div>
                        </form>
                    </article>
                </section>
            )}
        </main>
    );
};

export default EditProfile;