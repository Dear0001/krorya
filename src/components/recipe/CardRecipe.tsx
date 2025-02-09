
"use client";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "@/components/Skeleton";
import React from "react";
import {getImageUrl} from "@/lib/constants";

// Define the props for the component
type RecipeProps = {
    recipe: {
        id: number;
        name: string;
        photo: { photo: string; photoId: number }[];
        description: string;
        level: string;
        durationInMinutes?: string;
    };
    isLoading: boolean;
};

const CardRecipe: React.FC<RecipeProps> = ({ recipe, isLoading }) => {
    const photoFileName = recipe.photo?.[0]?.photo;
    // Use the getImageUrl function to construct the full image URL
    const imageUrl = getImageUrl(photoFileName);

    // Background color mapping for levels
    const levelBgColors: { [key: string]: string } = {
        Easy: "bg-[#FFEBBB] text-[12px] text-[#AE7C00]",
        Medium: "bg-[#ddd6fe] text-[##8b5cf6]",
        Hard: "bg-[#f4d4d4] text-[#cf6464]",
    };

    // Get the corresponding background color class
    const levelClass = levelBgColors[recipe.level] || "bg-gray-100 text-gray-800"; // Default color

    if (isLoading) {
        return (
            <main className="w-[373px] h-[90px] my-5">
                <Skeleton className="h-20 w-full rounded-md mb-4" />
                <Skeleton className="h-20 w-full rounded-md mb-4" />
                <Skeleton className="h-20 w-full rounded-md mb-4" />
                <Skeleton className="h-20 w-full rounded-md mb-4" />
                <Skeleton className="h-20 w-full rounded-md mb-4" />
                <Skeleton className="h-20 w-full rounded-md mb-4" />
                <Skeleton className="h-20 w-full rounded-md mb-4" />
            </main>
        );
    }
    return (
        <Link
            href={`/admin/recipe/${recipe.id}`}
            className="recipe-card w-full h-[90px] flex bg-white rounded-lg overflow-hidden shadow-md sha  carousel-item m-0"
            style={{ margin: 0 }}
        >
            <div className="w-[90px] h-[90px] relative">
                <Image
                    src={imageUrl}
                    alt="recipe-image"
                    className="rounded-l-lg object-cover"
                    fill
                />
            </div>
            <section className="flex flex-grow items-center justify-between p-3">
                <div className="flex flex-col gap-1">
                    <h1 className="text-xs font-medium text-slate-700">{recipe.name}</h1>
                    <div className="flex items-center gap-2">
                        <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.5 0C5.64641 0 4.80117 0.168127 4.01256 0.494783C3.22394 0.821439 2.50739 1.30023 1.90381 1.90381C0.684819 3.12279 0 4.77609 0 6.5C0 8.22391 0.684819 9.87721 1.90381 11.0962C2.50739 11.6998 3.22394 12.1786 4.01256 12.5052C4.80117 12.8319 5.64641 13 6.5 13C8.22391 13 9.87721 12.3152 11.0962 11.0962C12.3152 9.87721 13 8.22391 13 6.5C13 5.64641 12.8319 4.80117 12.5052 4.01256C12.1786 3.22394 11.6998 2.50739 11.0962 1.90381C10.4926 1.30023 9.77606 0.821439 8.98744 0.494783C8.19883 0.168127 7.35359 0 6.5 0ZM9.23 9.23L5.85 7.15V3.25H6.825V6.63L9.75 8.385L9.23 9.23Z"
                                fill="#FFD233"
                            />
                        </svg>
                        <span className="text-xs">{recipe.durationInMinutes || "N/A"} នាទី</span>
                    </div>
                    <div className="bg-[#FFEBBB] text-center rounded-[6px] w-[80px]">
                        <span className={`text-[#AE7C00] text-xs ${levelClass}`}> {recipe.level}</span>
                    </div>
                </div>
                <div className="w-[19px] h-[17px] self-start">
                    <svg
                        width="19"
                        height="17"
                        viewBox="0 0 34 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6.96448 0.012619C4.69873 0.235142 2.90364 1.34775 1.61752 3.31708C-0.270608 6.21544 -0.522358 10.0428 0.949834 13.6477C2.72851 18.0203 6.67989 21.97 12.7493 25.4358C13.718 25.9921 13.9095 26.0589 14.216 25.9643C14.6155 25.8419 16.5967 24.6737 18.047 23.7001C25.7527 18.5376 29.2718 11.9899 27.5861 5.9651C27.3125 4.986 26.9349 4.16266 26.3547 3.2837C25.6269 2.16553 24.5159 1.18086 23.3885 0.641245C22.4252 0.185074 21.6262 0.012619 20.4277 0.012619C18.1838 0.0181828 16.1534 0.891582 14.3966 2.61057L13.9971 2.99998L13.603 2.61057C12.2239 1.26431 10.6641 0.42985 8.92376 0.118317C8.4312 0.0293083 7.35853 -0.0263214 6.96448 0.012619ZM8.67748 2.01532C10.3029 2.31017 11.9776 3.38384 13.0174 4.79685C13.4279 5.35316 13.6195 5.48667 13.9971 5.48667C14.3528 5.48667 14.5553 5.35316 14.9165 4.88586C16.3176 3.06118 17.9594 2.10989 19.9953 1.92631C22.2611 1.72604 24.1437 2.87203 25.2656 5.14733C26.0647 6.75505 26.3164 8.70769 25.9826 10.6659C25.3094 14.6546 22.1297 18.6823 16.8703 22.2037C15.9618 22.8156 14.6921 23.6 14.2269 23.8392L13.9971 23.956L13.7672 23.8392C13.2856 23.5889 11.786 22.6599 10.9487 22.0869C5.68931 18.5042 2.64094 14.5656 1.97325 10.5157C1.84738 9.72017 1.84738 8.23483 1.97873 7.48938C2.31257 5.57568 3.25937 3.84001 4.45792 2.93879C5.7112 1.99863 7.01921 1.70935 8.67748 2.01532Z"
                            fill="#D7AD45"
                        />
                    </svg>
                </div>
            </section>
        </Link>
    );
}

export default CardRecipe;
// import React from "react";
// import Image from "next/image";
// import { FaClock } from "react-icons/fa";
// import Skeleton from "@/components/Skeleton";
//
// // Define the props for the component
// type RecipeProps = {
//     recipe: {
//         id: number;
//         name: string;
//         photo: { photo: string; photoId: number }[];
//         description: string;
//         level: string;
//         durationInMinutes?: string;
//     };
//     isLoading: boolean;
// };
//
// const CardRecipe: React.FC<RecipeProps> = ({ recipe, isLoading }) => {
//     const photoFileName = recipe.photo?.[0]?.photo;
//
//     // Construct the full image URL
//     const imageUrl = photoFileName
//         ? `${process.env.NEXT_PUBLIC_SPRING_API_URL}/api/v1/fileView/${photoFileName}`
//         : "/assets/image_login.png";
//
//     // Background color mapping for levels
//     const levelBgColors: { [key: string]: string } = {
//         Easy: "bg-[#FFEBBB] text-[12px] text-[#AE7C00]",
//         Medium: "bg-[#ddd6fe] text-[##8b5cf6]",
//         Hard: "bg-[#f4d4d4] text-[#cf6464]",
//     };
//
//     // Get the corresponding background color class
//     const levelClass = levelBgColors[recipe.level] || "bg-gray-100 text-gray-800"; // Default color
//
//     if (isLoading) {
//         return (
//             <main className="w-[373px] h-[90px] my-5">
//                 <Skeleton className="h-20 w-full rounded-md mb-4" />
//                 <Skeleton className="h-20 w-full rounded-md mb-4" />
//                 <Skeleton className="h-20 w-full rounded-md mb-4" />
//                 <Skeleton className="h-20 w-full rounded-md mb-4" />
//                 <Skeleton className="h-20 w-full rounded-md mb-4" />
//                 <Skeleton className="h-20 w-full rounded-md mb-4" />
//                 <Skeleton className="h-20 w-full rounded-md mb-4" />
//             </main>
//         );
//     }
//
//     return (
//         <main className="w-[373px] h-[90px] my-5 flex gap-3 justify-start items-center text-center">
//             <article>
//                 <Image
//                     width={90}
//                     height={90}
//                     src={imageUrl}
//                     alt={recipe.name}
//                     className="rounded-md object-cover"
//                 />
//             </article>
//             <article>
//                 <h2>{recipe.name}</h2>
//                 <div className="flex flex-1 gap-2 py-2">
//                     <span className="w-[15px] text-[#FFEBBB]">
//                         <FaClock />
//                     </span>
//                     <span className="text-[12px]">{recipe.durationInMinutes || "N/A"} នាទី</span>
//                 </div>
//                 <p className={`rounded-md text-[12px] px-2 py-1 ${levelClass}`}>
//                     {recipe.level}
//                 </p>
//             </article>
//         </main>
//     );
// };
//
// export default CardRecipe;