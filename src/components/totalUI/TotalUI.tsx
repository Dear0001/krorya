import React from 'react';

interface TotalUiProps {
    title: string;
    count: number;
}

const TotalUi: React.FC<TotalUiProps> = ({ title, count }) => {
    console.log("TotalUi -> title:", title, "count:", count); // Debugging log
    return (
        <div className="flex flex-col gap-2 self-stretch p-4 gap-5 rounded-2xl flex-[1_0_0] bg-[#EDEEFC] min-w-[200px] max-md:min-w-[180px] max-sm:p-3 max-sm:min-w-full">
            <span className="text-md font-bold tracking-normal leading-5 text-black max-sm:text-sm max-sm:leading-5">
                {title}
            </span>
            <span className="text-2xl">
                {count}
            </span>
        </div>
    );
};

export default TotalUi;