"use client"
import React, { useState } from "react";
import Modal from "./Modal";
import {convertRomanToKhmerWithIndex} from "@/lib/constants";

type Item = {
    id: number;
    name?: string;
    cuisineName?: string;
    categoryName?: string;
};

type PaginatedListProps = {
    items: Item[];
    title: string;
    onCreate: (name: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
    isLoading: boolean;
};

const PaginatedList: React.FC<PaginatedListProps> = ({
    items,
    title,
    onCreate,
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreate = (name: string) => {
        onCreate(name);
    };

    return (
        <div className="border p-4 bg-white rounded-lg shadow-lg w-full md:w-1/2">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="border border-primary text-primary px-3 py-1 rounded-md hover:bg-primary hover:text-white"
                >
                    បង្កើត
                </button>
            </div>
            {/*Listing items */}
            <ul>
                {items.map((item) => (
                    <li key={item.id} className="border-b py-2">
                        {convertRomanToKhmerWithIndex(item.id)}. {item.name || item.cuisineName || item.categoryName}
                    </li>
                ))}
            </ul>
            {/*Show Prev and Next button*/}
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    className="px-3 py-1 border rounded-md disabled:opacity-50 "
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
                    disabled={currentPage === 0}
                >
                    ថយ
                </button>
                <span className="px-3 py-1 border rounded-md">
                  {convertRomanToKhmerWithIndex(currentPage + 1)} / {convertRomanToKhmerWithIndex(totalPages)}
                </span>

                <button
                    className="border border-primary text-primary px-3 py-1 rounded-md hover:bg-primary hover:text-white disabled:opacity-50"
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                >
                    បន្ទាប់
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                title={`${title}`}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreate}
            />
        </div>
    );
};

export default PaginatedList;