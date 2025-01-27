import React from 'react';
import RawImage from "@/components/foodPopular/RawImage";

const ActionButton = ({ image, altText, className }) => {
    return (
        <button
            tabIndex={0}
            aria-label={altText}
            className={`absolute cursor-pointer h-[34px] w-[34px] z-[2] ${className}`}
        >
            <RawImage
                image={image}
                altText={altText}
                className="size-full"
            />
        </button>
    );
};

export default ActionButton;