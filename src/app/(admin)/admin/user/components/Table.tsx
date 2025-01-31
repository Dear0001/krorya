import React, { useState } from 'react';
import Link from 'next/link';
import { formatDateToKhmer } from '@/components/ConvertDateToKhmer';
import Pagination from "@/app/(admin)/admin/user/components/Pagination";

type User = {
    id: number;
    fullName: string;
    profileImage?: string;
    role: string;
    deleted: boolean;
};

export default function Table({ users }: { users: User[] }) {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

    return (
        <div className="overflow-x-auto">
            <table className="table shadow-md w-full rounded-lg overflow-hidden">
                <thead>
                <tr className="text-lg text-center bg-[#F9FAFB] h-[55px] text-color-2">
                    <th className="font-light">លេខរៀង</th>
                    <th className="font-light">កាលបរិច្ឆេទបង្កើតគណនី</th>
                    <th className="font-light">ឈ្មោះអ្នកប្រើប្រាស់</th>
                    <th className="font-light">ស្ថានភាពអ្នកប្រើប្រាស់</th>
                </tr>
                </thead>
                <tbody>
                {paginatedUsers.map((user, index) => (
                    <tr key={user.id} className="text-center">
                        <td className="text-color-2">{startIndex + index + 1}</td>
                        <td className="text-color-2">
                            <div className="text-sm opacity-50">{formatDateToKhmer(new Date().toISOString())}</div>
                        </td>
                        <td className="text-color-2">
                            <div className="flex items-center">
                                <div className="avatar mr-2">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={user.profileImage || '/default-avatar.jpg'} alt="Avatar" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="text-sm opacity-50">{user.fullName}</div>
                                </div>
                            </div>
                        </td>
                        <td className="text-color-2">
                            <Link href="#" className={`flex-1 px-4 py-2 rounded text-center ${user.deleted ? 'bg-red-500 border-red-600 text-white' : 'bg-green-500 border-green-600 text-white'}`}>
                                {user.deleted ? 'ផ្អាកដំណើរការ' : 'ធម្មតា'}
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                className="mt-4 flex"
                onPageChange={handlePageChange}
                pageSize={pageSize}
                totalCount={users.length}
                currentPage={currentPage}
            />
        </div>
    );
}