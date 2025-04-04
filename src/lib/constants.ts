import * as Yup from "yup";
import {DifficultyLevel, FormData} from "@/lib/definition";


export const INITIAL_FETCH_COUNT = 24;
export const FILE_SIZE = 1024 * 1024 * 2; // 2MB
export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

// image preview
export const getImageUrl = (photoFileName?: string): string =>
    photoFileName
        ? `${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/v1/fileView/${photoFileName}`
        : "/assets/image_login.png";

// check email exist or not with
export const checkEmailExistUrl = (email: string): string =>
    `${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/v1/auth/check-email-exist?email=${email}`;

// utils/auth.ts
export const checkEmailExist = async (email: string): Promise<boolean> => {
    try {
        const response = await fetch(checkEmailExistUrl(email));
        if (!response.ok) {
            // If status is 404, email doesn't exist (which is good for registration)
            if (response.status === 404) {
                return false;
            }
            throw new Error('Failed to check email');
        }
        // If status is 200, email exists
        return true;
    } catch (error) {
        console.error('Error checking email:', error);
        throw error;
    }
};

// Then update your levelStyles definition
export const levelStyles: Record<DifficultyLevel, { bg: string; text: string }> = {
    Easy: {
        bg: "bg-[#fff9eb]",
        text: "text-[#fff00b]",
    },
    Medium: {
        bg: "bg-[#f5f3ff]",
        text: "text-[#713aed]",
    },
    Hard: {
        bg: "bg-[#fef2f3]",
        text: "text-[#ff2323]",
    },
};

// convert number to khmer
export const convertRomanToKhmerWithIndex = (num: number) => {
    const khmerNumbers = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    return num.toString().split("").map(digit => khmerNumbers[parseInt(digit)]).join("");
};

export const convertRomanToKhmer = (romanNumeral: string): string => {
    const romanToKhmerDigitMap: Record<string, string> = {
        "1": "១",
        "2": "២",
        "3": "៣",
        "4": "៤",
        "5": "៥",
        "6": "៦",
        "7": "៧",
        "8": "៨",
        "9": "៩",
        "0": "០",
    };

    return romanNumeral
        ?.split("")
        .map((digit) => romanToKhmerDigitMap[digit] || digit) // Handle non-digit cases safely
        .join("");
};

//validate create recipe constant
export const getRecipeSchema = (): Yup.ObjectSchema<FormData> => {
    return Yup.object({
        id: Yup.number().required(),
        photo: Yup.array().of(Yup.object({ photo: Yup.string().required("Photo URL is required") })).required(),
        name: Yup.string()
            .matches(/^[^\d\s]/, "Name cannot start with a number or space")
            .required("Name is required"),
        description: Yup.string().optional(),
        durationInMinutes: Yup.number().min(1, "Duration must be at least 1 minute").required("Duration is required"),
        level: Yup.mixed<"Easy" | "Medium" | "Hard">()
            .oneOf(["Easy", "Medium", "Hard"]).required("Level is required"),
        categoryId: Yup.number().required("Category is required"),
        cuisineId: Yup.number().required("Cuisine is required"),
        ingredients: Yup.array()
            .of(
                Yup.object({
                    id: Yup.number().required(),
                    name: Yup.string().required("Ingredient name is required"),
                    quantity: Yup.string().optional(),
                    price: Yup.number().min(0, "Price must be positive").required("Price is required"),
                })
            )
            .required(),
        cookingSteps: Yup.array()
            .of(
                Yup.object({
                    id: Yup.number().required(),
                    description: Yup.string().required("Cooking step is required"),
                })
            )
            .required(),
    });
};
// lib/constants.ts
export const categoryIconMap: { [key: string]: string } = {
    "Breakfast": "nham.svg",
    "Lunch": "lunch.svg",
    "Dinner": "dinner.svg",
    "Snack": "snack.svg",
};
