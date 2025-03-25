"use client";
import React, {useState} from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/constants";


type CookingStepProps = {
    cookingSteps?: { id: number; description: string }[],
    image: { photo: string; photoId: number }[]
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
        .map((digit) => romanToKhmerDigitMap[digit] || digit)
        .join("");
};


const CookingStep: React.FC<CookingStepProps> = ({cookingSteps = [], image}) => {
    console.log("CookingStep", CookingStep);
    const [selected, setSelected] = useState<number>(1);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const handleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSelect = (step: number) => {
        setSelected(step);
        setDropdownOpen(false);
    };

    const handleIncreaseStep = () => {
        setSelected((prev) => Math.min(prev + 1, cookingSteps.length));
    };

    const handleDecreaseStep = () => {
        setSelected((prev) => Math.max(prev - 1, 1));
    };

    const imageUrl = getImageUrl(image?.[0].photo);
    console.log("imageUrl", imageUrl);

    return (
        <div className="shadow-md h-fit w-full p-4">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                {/* Image Section */}
                <div className="w-full h-full hidden rounded-lg lg:block md:block">
                    <Image
                        className="w-full h-96 rounded-lg"
                        width={500}
                        height={500}
                        src={imageUrl}
                        alt="Step Image"
                    />
                </div>

                {/* Steps Section */}
                <div className="w-full h-full flex flex-col items-center py-4">
                    <div className="w-full flex justify-between px-2">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                ✕
                            </button>
                        </form>
                    </div>
                    <h1 className="text-secondary font-moulpali text-3xl justify-center">
                        ជំហានទី {convertRomanToKhmer(selected.toString())}
                    </h1>
                    <Image className="w-24" width={25} height={25} src="/icons/underline.svg" alt="Underline"/>
                    <div className="flex w-full justify-start gap-2 items-center lg:mt-2 md:mt-2 pl-5 lg:pl-0 md:pl-0">
                        <Image width={19} height={19} src="/icons/flower2.svg" alt="Flower"/>
                        <p className="text-[18px] font-semibold text-secondary">របៀបធ្វើ</p>
                    </div>
                    <div className="pr-3 pt-3 pl-5 md:pl-0 lg:pl-0 text-black font-kantumruy">
                        <p>
                            {cookingSteps.length > 0 && cookingSteps[selected - 1]
                                ? cookingSteps[selected - 1].description
                                : "No description available"}
                        </p>
                    </div>

                    {/* Navigation and Dropdown */}
                    <div
                        className="flex justify-between lg:w-full lg:h-full md:w-fit md:h-full w-full h-full items-end px-5 py-5 lg:px-0 lg:py-0 md:px-0 md:py-0">
                        <div className="relative">
                            <button
                                id="dropdownDefaultButton"
                                onClick={handleDropdown}
                                className="px-3 text-slate-700 outline-primary w-24 rounded h-6 flex justify-between items-center text-[10px] border-primary border-[1px]"
                                type="button"
                            >
                                {convertRomanToKhmer(selected.toString())}
                                <Image className="ml-4" width={10} height={10} src="/icons/arrowup.svg" alt="Arrow"/>
                            </button>
                            {dropdownOpen && (
                                <div
                                    className="absolute bottom-full z-10 bg-white rounded shadow-md w-24 border border-primary">
                                    <ul className="py-2 text-sm text-gray-700 flex flex-col gap-1 bg-white rounded">
                                        {Array.from({length: cookingSteps.length}, (_, i) => i + 1).map((stepNum) => (
                                            <li key={stepNum}>
                                                <button
                                                    className="text-black w-full px-3 py-1 hover:bg-gray-200 flex justify-start"
                                                    onClick={() => handleSelect(stepNum)}
                                                >
                                                    {convertRomanToKhmer(stepNum.toString())}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Next / Previous Buttons */}
                        <div className="flex gap-2 lg:pr-5 md:pr-5 items-center">
                            <button onClick={handleDecreaseStep} className="text-primary text-sm flex items-center">
                                <Image src="/icons/Expand_left_double_light.svg" alt="Previous" width={24} height={24}/>
                                <span>ថយក្រោយ</span>
                            </button>
                            <p className="text-primary">|</p>
                            <button onClick={handleIncreaseStep} className="text-primary text-sm flex items-center">
                                <span>បន្ទាប់</span>
                                <Image src="/icons/Expand_right_double_light.svg" alt="Next" width={24} height={24}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookingStep;
