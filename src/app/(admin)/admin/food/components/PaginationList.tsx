"use clinet"
import React, { useState } from "react";
import Modal from "./Modal";

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
        console.log("Creating item with name:", name); // Log the data being created
        onCreate(name);
    };

    return (
        <div className="border p-4 bg-white rounded-lg shadow-lg w-full md:w-1/2">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                >
                    + Create
                </button>
            </div>

            <ul>
                {items.map((item) => (
                    <li key={item.id} className="border-b py-2">
                        {item.id}. {item.name || item.cuisineName || item.categoryName}
                    </li>
                ))}
            </ul>

            <div className="flex justify-center mt-4 space-x-2">
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
                    disabled={currentPage === 0}
                >
                    Prev
                </button>
                <span className="px-3 py-1 border">{currentPage + 1} / {totalPages}</span>
                <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages - 1))}
                    disabled={currentPage === totalPages - 1}
                >
                    Next
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                title={`New ${title}`}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreate}
            />
        </div>
    );
};

export default PaginatedList;