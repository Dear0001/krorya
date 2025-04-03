import React from 'react';
import Image from "next/image";

type TotalUiType = {
    title: string;
    count?: number;
}

const TotalUi: React.FC<TotalUiType> = ({ title, count = 0 }) => {
    const getBackgroundColor = (title: string): string => {
        switch (title.toLowerCase()) {
            case 'recipes':
                return 'bg-[#ed1515]'; // Changed to darker shade for better white text contrast
            case 'categories':
                return 'bg-[#8b5cf6]';
            case 'users':
                return 'bg-[#625ecd]';
            case 'cuisines':
                return 'bg-[#2fa7c8]';
            default:
                return 'bg-gray-800'; // Changed to darker shade
        }
    };

    const getKhmerTitle = (title: string): string => {
        switch (title.toLowerCase()) {
            case 'recipes':
            case 'រូបមន្តម្ហូប':
                return 'ចំនួនរូបមន្តម្ហូបសរុប';
            case 'categories':
            case 'ប្រភេទ':
                return 'ចំនួនប្រភេទនៃម្ហូបសរុប';
            case 'users':
            case 'អ្នកប្រើ':
                return 'ចំនួនអ្នកប្រើប្រាស់សរុប';
            case 'cuisines':
            case 'ម្ហូប':
                return 'ចំនួនម្ហូបសរុប';
            default:
                return title;
        }
    };

    const getIconPath = (title: string): string => {
        switch (title.toLowerCase()) {
            case 'recipes':
            case 'រូបមន្តម្ហូប':
                return 'snack.svg';
            case 'categories':
            case 'ប្រភេទ':
                return 'lunch.svg';
            case 'users':
            case 'អ្នកប្រើ':
                return 'user-dashboard.svg';
            case 'cuisines':
            case 'ម្ហូប':
                return 'cuisine.svg';
            default:
                return 'snack.svg';
        }
    };

    const icons = getIconPath(title);
    const backgroundColor = getBackgroundColor(title);
    const khmerTitle = getKhmerTitle(title);

    return (
        <div
            className={`flex flex-col justify-center items-center gap-4 self-stretch rounded-[10px] ${backgroundColor} w-full min-h-[140px] sm:min-h-[160px] p-6 relative text-white`}
        >
            {/* Icon - Slightly larger */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                <Image
                    src={`/icons/${icons}`}
                    alt={title}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain filter brightness-0 invert"
                />
            </div>

            {/* Title - Balanced size */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-normal text-center text-white">
                {khmerTitle}
            </h1>

            {/* Count - Prominent but not overwhelming */}
            <span className="text-5xl sm:text-6xl md:text-7xl font-semibold text-white">
                 {count}
            </span>
            </div>
    );
};

export default TotalUi;