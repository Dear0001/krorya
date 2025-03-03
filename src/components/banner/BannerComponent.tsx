import React from 'react';
import Link from "next/link";

const BannerComponent = () => {
    return (
        <section className="w-full h-auto lg:h-[268px] bg-white rounded-[15px] grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column (Text) */}
            <div className="flex flex-col gap-3 w-full lg:w-[400px] sm:text-3xl md:w-[300px] p-6 lg:p-[40px] justify-center order-2 lg:order-1">
                <h1 className="gradient-text md:text-4xl font-bold sm:text-3xl text-slate-700" style={styles.typingText}>
                    ស្វាគមន៍មកកាន់ក្រយ៉ា
                </h1>
                <p className="text-[18px] lg:w-[400px] md:w-[300px] leading-loose pb-1">
                    ម្ហូបខ្មែរ មានច្រើនសណ្ឋានដូចជា ស្ល ឆា ចៀន ស្ងោរ ជាដើម និងមានរសជាតិប្លែកៗពីគ្នា។
                </p>

                <Link href={"/admin/recipe"} data-layer="Button"
                      className="text-white text-[17px] font-medium font-['Kantumruy Pro'] leading-normal w-[165px] h-12 p-3 bg-[#d6ad45] rounded-lg justify-center items-center gap-2 inline-flex overflow-hidden">
                    ស្វែងរកមុខម្ហូប
                </Link>
            </div>

            {/* Right Column (Image) */}
            <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-t-[15px] lg:rounded-r-[15px] lg:rounded-tl-none order-1 lg:order-2">
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

const styles = {
    typingText: {
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        borderRight: "3px solid #d6ad45",
        width: "100%",
        animation: "typing 3s steps(20, end) infinite alternate, blink 0.6s step-end infinite",
    },
    "@keyframes typing": {
        from: { width: "0" },
        to: { width: "100%" },
    },
    "@keyframes blink": {
        "50%": { borderColor: "transparent" },
    },
};