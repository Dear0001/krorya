import * as Yup from "yup";
import { FormData } from "@/lib/definition";


export const INITIAL_FETCH_COUNT = 24;
export const FILE_SIZE = 1024 * 1024 * 2; // 2MB
export const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
// image preview
export const getImageUrl = (photoFileName?: string): string =>
    photoFileName
        ? `${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/v1/fileView/${photoFileName}`
        : "/assets/image_login.png";

//  Background color mapping for levels
export const levelBgColors: { [key: string]: string } = {
        Easy: "bg-[#FFEBBB] text-[12px] text-[#AE7C00]",
        Medium: "bg-[#ddd6fe] text-[12px] text-[##8b5cf6]",
        Hard: "bg-[#f4d4d4] text-[12px] text-[#cf6464]",
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
