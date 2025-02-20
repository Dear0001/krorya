import React from 'react';
import Link from "next/link";

const BannerComponent = () => {
    return (
        <section
            className="w-full h-[268px] bg-white rounded-[15px] grid grid-cols-2 gap-4"
        >
            {/* Left Column */}
            <div className="flex flex-col p-[40px] w-[600px] justify-start">
                <h1 data-layer="Title" className="Title text-[46px] font-bold">
                    ស្វាគមន៍មកកាន់ក្រយ៉ា
                </h1>
                <p className="text-[18px] pb-5">
                    ម្ហូបខ្មែរ មានច្រើនសណ្ឋានដូចជា ស្ល ឆា ចៀន ស្ងោរ ជាដើម និងមានរសជាតិប្លែកៗពីគ្នា។
                </p>

                <Link href={"/admin/recipe"} data-layer="Button"
                     className="text-white text-[17px] font-medium font-['Kantumruy Pro'] leading-normal w-[165px] h-12 p-3 bg-[#d6ad45] rounded-lg justify-center items-center gap-2 inline-flex overflow-hidden">
                    ស្វែងរកមុខម្ហូប
                </Link>
            </div>

            {/* Right Column */}
            <div className="flex items-center justify-center overflow-hidden rounded-r-[15px]">
                <img
                    src="/assets/banner-dashboard.png"
                    alt="Banner Image"
                    className="w-full h-full object-cover"
                />
            </div>
        </section>
    );
};

export default BannerComponent;