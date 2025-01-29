'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { formatDateToKhmer } from '@/components/ConvertDateToKhmer';
import Pagination from "@/app/(admin)/admin/user/components/Pagination";

type User = {
    userId: number;
    createdDate: string | Date;
    profileImage?: string;
    username: string;
    followersCount: number;
    followingsCount: number;
    isDeactivated: boolean;
};

type TableProps = {
    users: User[]   ;
};

export default function Table({ users }: TableProps) {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
    };

    // Calculate pagination offsets
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, users.length);
    const paginatedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="overflow-x-auto">
            <table className="table shadow-md w-full rounded-lg overflow-hidden">
                <thead>
                <tr className="text-lg text-center bg-[#F9FAFB] h-[55px] text-color-2">
                    <th className="font-light">លេខរៀង</th>
                    <th className="font-light">កាលបរិច្ឆេទបង្កើតគណនី</th>
                    <th className="font-light">ឈ្មោះអ្នកប្រើប្រាស់</th>
                    <th className="font-light">ចំនួនអ្នកតាមដាន</th>
                    <th className="font-light">ចំនួនអ្នកកំពុងតាមដាន</th>
                    <th className="font-light">ស្ថានភាពអ្នកប្រើប្រាស់</th>
                </tr>
                </thead>
                <tbody>
                {paginatedUsers.map((user, index) => (
                    <tr key={user.userId} className="text-center">
                        <td className="text-color-2">{startIndex + index}</td>
                        <td className="text-color-2">
                            <div className="text-sm opacity-50">{formatDateToKhmer(user.createdDate)}</div>
                        </td>
                        <td className="text-color-2">
                            <div className="flex items-center">
                                <div className="avatar mr-2">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={user.profileImage} alt="Avatar" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="text-sm opacity-50">{user.username}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="flex items-center justify-center gap-3">
                                <div className="text-sm opacity-50 text-black">{user.followersCount}</div>
                            </div>
                        </td>
                        <td className="text-color-2">{user.followingsCount}</td>
                        <td className="text-color-2">
                            <Link href="#" className="flex-1 px-4 bg-[#D1FAE5] border border-[#6EE7B7] text-green-800 py-2 rounded text-center">
                                {user.isDeactivated ? 'មិនធម្មតា' : 'ធម្មតា'}
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
