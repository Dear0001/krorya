import React from 'react';
import RawImage from "@/components/foodPopular/RawImage";
import ActionButton from "@/components/foodPopular/ActionButton";

const CardFood = () => {
    const actionButtons = [
        {
            image: "https://cdn.builder.io/api/v1/image/assets/2f013c53cc004a938ce597cfa1a4f4fb/9bac381cd96bf2165c56dfe5ce8620e05b2adc6f651bb1d129162ad1306af36a?apiKey=2f013c53cc004a938ce597cfa1a4f4fb&",
            altText: "Share food item",
            className: "top-3 right-3"
        },
        {
            image: "https://cdn.builder.io/api/v1/image/assets/2f013c53cc004a938ce597cfa1a4f4fb/01035ff10f1a4f86c29afbf59ab6de66e298a6f9dc72b306e5b1b242408425ee?apiKey=2f013c53cc004a938ce597cfa1a4f4fb&",
            altText: "Save food item",
            className: "top-3 right-14"
        }
    ];

    return (
        <div className="flex flex-col max-w-[263px] max-md:max-w-[230px] max-sm:max-w-full">
            <div className="flex flex-col px-3.5 py-3.5 w-full bg-white rounded-3xl shadow-sm max-sm:px-2.5 max-sm:py-3">
                <div className="flex relative flex-col px-12 pt-3 pb-40 aspect-[1.129]">
                    <RawImage
                        image="https://cdn.builder.io/api/v1/image/assets/2f013c53cc004a938ce597cfa1a4f4fb/f38213a31875de102750fb38b3f444feaab9f01b57b421f25b41d626e5553a78?apiKey=2f013c53cc004a938ce597cfa1a4f4fb&"
                        altText="Food item preview"
                        className="object-cover absolute inset-0 rounded-xl size-full"
                    />
                    {actionButtons.map((button, index) => (
                        <ActionButton
                            key={index}
                            image={button.image}
                            altText={button.altText}
                            className={button.className}
                        />
                    ))}
                </div>
                <div className="self-start mt-2.5 text-xl font-medium text-neutral-700 max-md:text-lg max-sm:text-base">
                    បាយឆាផ្តើមស្នេហ៍
                </div>
                <div className="flex gap-1 items-center self-start mt-2 text-sm leading-none whitespace-nowrap text-neutral-700">
                    <span className="text-lg text-yellow-400">★</span>
                    <span className="font-semibold">4.8</span>
                    <span>(90)</span>
                </div>
                <div className="self-end mt-1.5 text-xl font-medium leading-none text-right text-orange-400 max-md:text-xl max-sm:text-lg">
                    ៨០០០ រៀល
                </div>
            </div>
        </div>
    );
};

export default CardFood;