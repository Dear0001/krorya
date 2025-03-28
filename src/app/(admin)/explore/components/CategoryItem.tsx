import React from "react";
import Image from "next/image";

type CategoryItemProps = {
    id: string;
    name: string;
    icon: string;
    isActive: boolean;
    onClick: (categoryId: string) => void;
};

const CategoryItem: React.FC<CategoryItemProps> = ({ id, name, icon, isActive, onClick }) => {
    return (
        <div
            className="w-[94px] h-[90px] relative flex flex-col justify-end group carousel-ite"
            onClick={() => onClick(id)}
        >
            <div
                className={`w-[94px] rounded-b-[20px] rounded-t-[7px] h-[60px] flex flex-col items-center justify-center transition-all duration-500 ${
                    isActive ? "bg-primary text-white" : "bg-white shadow-custom text-black"
                } group-hover:bg-primary`}
            >
                <div className="w-[54px] h-[54px] bg-white flex items-center justify-center rounded-2xl absolute top-0 left-0 right-0 mx-auto transform shadow-2xl">
                    <div className="relative w-[28px] h-[28px]">
                        <div className="flex items-center justify-center">
                            <div className="w-full h-full">
                                <Image
                                    src={`/icons/${icon}`}
                                    alt={name}
                                    layout="fill"
                                    objectFit="contain"
                                    className={`${isActive ? "filter-gold" : ""}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <span
                    className={`mt-4 text-[15px] transition-all duration-10 lg:duration-2 md:duration-10 ${
                        isActive ? "text-white" : "text-black"
                    } group-hover:text-white`}
                >
                    {name}
                </span>
            </div>
        </div>
    );
};

export default CategoryItem;