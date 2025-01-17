import React from 'react';
import Image from "next/image";
import { FaClock } from "react-icons/fa";

const CardRecipe = () => {
    return (
        <main className={"w-[373px] h-[90px] my-5 flex gap-3 justify-start items-center text-center"}>
            <article>
                <Image width={90} height={90} src={"/assets/recipe_data.png"} alt={"image"}/>
            </article>
            <article>
                <h2>ប្រហុកចំហុយ</h2>
                <div className={"flex flex-1 gap-2 py-2"}>
                    <span className={"w-[15px] text-[#FFEBBB]"}>
                        <FaClock/>
                    </span>
                    <span className={"text-[12px]"}>
                    55 នាទី
                    </span>
                </div>
                    <p className={"bg-[#FFEBBB] rounded-md text-[12px] text-[#AE7C00]"}>ងាយស្រួល</p>
            </article>
        </main>
    );
};

export default CardRecipe;