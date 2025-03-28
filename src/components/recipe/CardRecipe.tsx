
"use client";
import React, {useState} from "react";
import {getImageUrl, levelBgColors} from "@/lib/constants";
import {convertRomanToKhmer} from "@/app/(user)/recipe/components/ui/CookingStep";
import {useAddFavoriteMutation, useRemoveFavoriteMutation} from "@/redux/services/favorite";

// Define the props for the component
type RecipeProps = {
    recipe: {
        id: number;
        name: string;
        photo: { photo: string; photoId: number }[];
        description: string;
        level: string;
        isFavorite: boolean;
        durationInMinutes?: string | number;
    };
    isLoading: boolean;
};

const CardRecipe: React.FC<RecipeProps> = ({ recipe }) => {
    const [favorite, setFavorite] = useState(recipe?.isFavorite || false);
    // add favorite with RTK Query
    const [addFavorite] = useAddFavoriteMutation();
    //remove favorite with RTK Query
    const [removeFavorite] = useRemoveFavoriteMutation();

    // Handle favorite toggle with API call
    const handleFavorite = async () => {
        try {
            if (favorite) {
                await removeFavorite({ id: recipe.id }).unwrap();
                setFavorite(false);
            } else {
                await addFavorite({ id: recipe.id }).unwrap();
                setFavorite(true);
            }
        } catch (error) {
            console.error("Error updating favorite:", error);
        }
    };

    const photoFileName = recipe.photo?.[0]?.photo;
    // Use the getImageUrl function to construct the full image URL
    const imageUrl = getImageUrl(photoFileName);

    // Background color mapping for levels
    const bgColor = levelBgColors;

    // Get the corresponding background color class
    const levelClass = bgColor[recipe.level] || "bg-gray-100 text-gray-800";

    return (
        <div
            onClick={() => window.location.href = `/recipe/${recipe.id}`}
            className="recipe-card w-full h-[90px] flex bg-white rounded-lg overflow-hidden shadow-md carousel-item m-0 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            style={{ margin: 0 }}
        >
            <div
                className="w-[90px] h-[90px] bg-cover bg-center rounded-l-lg"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>

            <section className="flex flex-grow items-center justify-between p-3">
                <div className="flex flex-col gap-1">
                    <h1 className="text-xs font-medium text-slate-700 truncate">
                        {recipe.name}
                    </h1>
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
                        <span className="text-xs">
                    {typeof recipe.durationInMinutes === "number"
                        ? `${convertRomanToKhmer(recipe.durationInMinutes.toString())} នាទី`
                        : recipe.durationInMinutes || "N/A"}
                </span>
                    </div>
                    <div className={`text-center rounded-[8px] text-[13px] py-[2px] w-[70px] ${levelClass}`}>
                        <span className={"text-xs"}> {recipe.level}</span>
                    </div>
                </div>

                <div className="flex justify-center items-center w-[19px] h-[17px]">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleFavorite();
                        }}
                        className="hover:bg-gray-100"
                    >
                        {favorite ? (
                            <svg width="16" height="16" viewBox="0 0 18 16" fill="#D7AD45" stroke="#D7AD45" strokeWidth="1.5">
                                <path d="M8.45135 2.57069L9 3.15934L9.54865 2.57068C11.3843 0.601168 13.2916 0.439002 14.6985 1.10313C16.1598 1.79292 17.25 3.44662 17.25 5.43913C17.25 7.47271 16.4446 9.03777 15.2916 10.3785C14.3397 11.4854 13.1884 12.4021 12.06 13.3006C11.7913 13.5145 11.524 13.7273 11.261 13.9414C10.7867 14.3275 10.3684 14.6623 9.96682 14.9047C9.56435 15.1475 9.25342 15.25 9 15.25C8.74657 15.25 8.43565 15.1475 8.03319 14.9047C7.63158 14.6623 7.21329 14.3275 6.73906 13.9414C6.47602 13.7273 6.20868 13.5144 5.94004 13.3006C4.81163 12.4021 3.66029 11.4854 2.7084 10.3785C1.5554 9.03777 0.75 7.47271 0.75 5.43913C0.75 3.44662 1.84018 1.79292 3.30146 1.10313C4.70838 0.439003 6.61569 0.601167 8.45135 2.57069Z" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 18 16" fill="white" stroke="black" strokeWidth="1.5">
                                <path d="M8.45135 2.57069L9 3.15934L9.54865 2.57068C11.3843 0.601168 13.2916 0.439002 14.6985 1.10313C16.1598 1.79292 17.25 3.44662 17.25 5.43913C17.25 7.47271 16.4446 9.03777 15.2916 10.3785C14.3397 11.4854 13.1884 12.4021 12.06 13.3006C11.7913 13.5145 11.524 13.7273 11.261 13.9414C10.7867 14.3275 10.3684 14.6623 9.96682 14.9047C9.56435 15.1475 9.25342 15.25 9 15.25C8.74657 15.25 8.43565 15.1475 8.03319 14.9047C7.63158 14.6623 7.21329 14.3275 6.73906 13.9414C6.47602 13.7273 6.20868 13.5144 5.94004 13.3006C4.81163 12.4021 3.66029 11.4854 2.7084 10.3785C1.5554 9.03777 0.75 7.47271 0.75 5.43913C0.75 3.44662 1.84018 1.79292 3.30146 1.10313C4.70838 0.439003 6.61569 0.601167 8.45135 2.57069Z" />
                            </svg>
                        )}
                    </button>
                </div>
            </section>
        </div>
    );

}

export default CardRecipe;