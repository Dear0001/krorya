// components/LoadingFoodCard.js

import React from 'react';

export default function LoadingFoodCard() {
    return (
        <div
            className="card shadow-md p-2 animate-pulse mx-0"
            style={{ width: '14rem', maxWidth: '14rem', minWidth: '14rem' }}
        >
            <div className="relative w-full h-40 bg-gray-300 animate-pulse rounded-md"></div>
            <div className="card-body p-2 bg-white">
                <div className="h-5 bg-gray-300 animate-pulse rounded-md mb-2"></div>
                <div className="h-4 bg-gray-300 animate-pulse rounded-md mb-2 w-3/4"></div>
                <div className="flex flex-row items-center justify-end">
                    <div className="h-6 bg-gray-300 animate-pulse rounded-md w-1/2"></div>
                </div>
            </div>
        </div>
    );
}
