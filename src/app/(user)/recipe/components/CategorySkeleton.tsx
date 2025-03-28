import React from 'react';

const CategorySkeleton = () => {
    return (
            <div className="flex gap-4 overflow-x-auto">
                {/* Skeleton loader */}
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-md"></div>
            </div>
    );
};

export default CategorySkeleton;