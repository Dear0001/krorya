"use client";
import React, { useState } from "react";
import Image from "next/image";

type CookingStepProps = {
    cookingSteps?: { id: number; description: string }[];
};

// Dummy Function to Convert Numbers to Khmer Numerals
const convertRomanToKhmer = (num: string) => {
    const khmerNumbers = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    return num
        .split("")
        .map((digit) => khmerNumbers[parseInt(digit, 10)] || digit)
        .join("");
};

const CookingStep: React.FC<CookingStepProps> = ({ cookingSteps = [] }) => {
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

    return (
        <div className="bg-white shadow-md rounded-md h-fit w-full p-4">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                {/* Image Section */}
                <div className="w-full h-full hidden lg:block md:block">
                    <Image
                        className="w-full h-96"
                        width={500}
                        height={500}
                        src={"/assets/banner-dashboard.png"}
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
                    <Image className="w-24" width={25} height={25} src="/icons/underline.svg" alt="Underline" />
                    <div className="flex w-full justify-start gap-2 items-center lg:mt-2 md:mt-2 pl-5 lg:pl-0 md:pl-0">
                        <Image width={19} height={19} src="/icons/flower2.svg" alt="Flower" />
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
                    <div className="flex justify-between lg:w-full lg:h-full md:w-fit md:h-full w-full h-full items-end px-5 py-5 lg:px-0 lg:py-0 md:px-0 md:py-0">
                        <div className="relative">
                            <button
                                id="dropdownDefaultButton"
                                onClick={handleDropdown}
                                className="px-3 text-slate-700 outline-primary w-24 rounded h-6 flex justify-between items-center text-[10px] border-2 border-primary border-[1px]"
                                type="button"
                            >
                                {convertRomanToKhmer(selected.toString())}
                                <Image className="ml-4" width={10} height={10} src="/icons/arrowup.svg" alt="Arrow" />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute bottom-full z-10 bg-white divide-y divide-gray-100 rounded shadow w-24 dark:bg-gray-700 h-32 overflow-scroll hide-scrollbar border-[1px] border-primary">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 flex flex-col-reverse gap-1 bg-background-white rounded">
                                        {cookingSteps.map((step) => (
                                            <li key={step.id}>
                                                <button
                                                    className="text-black w-full px-2 py-0 hover:bg-background-1 dark:hover:bg-gray-600 dark:hover:text-black flex justify-start"
                                                    onClick={() => handleSelect(step.id)}
                                                >
                                                    {convertRomanToKhmer(step.id.toString())}
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
                                <Image src="/icons/Expand_left_double_light.svg" alt="Previous" width={24} height={24} />
                                <span>ថយក្រោយ</span>
                            </button>
                            <p className="text-primary">|</p>
                            <button onClick={handleIncreaseStep} className="text-primary text-sm flex items-center">
                                <span>បន្ទាប់</span>
                                <Image src="/icons/Expand_right_double_light.svg" alt="Next" width={24} height={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookingStep;
