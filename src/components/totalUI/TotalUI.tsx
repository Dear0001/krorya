import React from 'react';

type TotalUiType = {
    title: string;
    count?: number;
}

const TotalUi: React.FC<TotalUiType> = ({ title, count = 0 }) => {
    // Define a mapping for background colors based on the title
    const getBackgroundColor = (title: string): string => {
        switch (title.toLowerCase()) {
            case 'recipes':
                return 'bg-[#FFEBBB] text-[12px] text-[#AE7C00]';
            case 'categories':
                return 'bg-[#ddd6fe] text-[#8b5cf6]';
            case 'users':
                return 'bg-[#b7c2f0] text-[#625ecd]';
            case 'cuisines':
                return 'bg-[#b7e2f0] text-[#2fa7c8]';
            default:
                return 'bg-gray-200';
        }
    };
    // Convert title to Khmer
    const getKhmerTitle = (title: string): string => {
        switch (title.toLowerCase()) {
            case 'recipes':
            case 'រូបមន្តម្ហូប':
                return 'រូបមន្តម្ហូប';
            case 'categories':
            case 'ប្រភេទ':
                return 'ប្រភេទ';
            case 'users':
            case 'អ្នកប្រើ':
                return 'អ្នកប្រើ';
            case 'cuisines':
            case 'ម្ហូប':
                return 'ម្ហូប';
            default:
                return title;
        }
    };

    const backgroundColor = getBackgroundColor(title);
    const khmerTitle = getKhmerTitle(title);

    return (
        <div
            className={`flex flex-col gap-2 self-stretch p-4 rounded-2xl flex-[1_0_0] ${backgroundColor} min-w-[170px] max-md:min-w-[150px] max-sm:p-3 max-sm:min-w-full`}
        >
            <span className="text-lg font-bold tracking-normal leading-5 max-sm:text-sm max-sm:leading-5">
                {khmerTitle}
            </span>
            <span className="text-5xl">{count}</span>
        </div>
    );
};

export default TotalUi;