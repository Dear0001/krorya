import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { formatDateToKhmer } from '@/components/ConvertDateToKhmer';
import Pagination from "@/app/(admin)/admin/user/components/Pagination";
import { getImageUrl } from "@/lib/constants";
import Image from "next/image";
import {useDeleteUserByIdMutation} from "@/redux/services/user";

type User = {
    id: number;
    fullName: string;
    profileImage?: string;
    role: string;
    deleted: boolean;
};

export default function Table({ users: initialUsers }: { users: User[] }) {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmType, setConfirmType] = useState<'suspend' | 'approve' | null>(null);
    const [users, setUsers] = useState<User[]>(initialUsers);

    const [updateUserStatus, { isLoading }] = useDeleteUserByIdMutation();

    useEffect(() => {
        setUsers(initialUsers);
    }, [initialUsers]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedUsers = users.slice(startIndex, startIndex + pageSize);

    const handleStatusClick = (user: User, type: 'suspend' | 'approve') => {
        setSelectedUser(user);
        setConfirmType(type);
        setShowConfirmation(true);
    };

    const handleConfirm = async () => {
        if (selectedUser && confirmType) {
            const newStatus = confirmType === 'suspend';
            try {
                await updateUserStatus({ id: selectedUser.id, deleted: newStatus }).unwrap();
                setUsers(users.map((u) => (u.id === selectedUser.id ? { ...u, deleted: newStatus } : u)));
                setShowConfirmation(false);
                setSelectedUser(null);
                setConfirmType(null);
            } catch (error) {
                console.error("Failed to update user status:", error);
            }
        }
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        setSelectedUser(null);
        setConfirmType(null);
    };

    return (
        <div className="overflow-x-auto w-full">
            <table className="table shadow-md w-full rounded-lg overflow-hidden">
                <thead>
                <tr className="text-lg text-left bg-[#F9FAFB] h-[55px] text-color-2">
                    <th className="font-light px-5">លេខរៀង</th>
                    <th className="font-light px-5">កាលបរិច្ឆេទបង្កើតគណនី</th>
                    <th className="font-light px-5">ឈ្មោះអ្នកប្រើប្រាស់</th>
                    <th className="font-light px-5">ស្ថានភាពអ្នកប្រើប្រាស់</th>
                    <th className="font-light px-5">សកម្មភាព</th>
                </tr>
                </thead>
                <tbody>
                {paginatedUsers?.map((user, index) => (
                    <tr key={user?.id} className="text-left px-5">
                        <td className="text-color-2 pl-5">{startIndex + index + 1}</td>
                        <td className="text-color-2 pl-5">
                            <div className="text-sm opacity-50">{formatDateToKhmer(new Date().toISOString())}</div>
                        </td>
                        <td className="text-color-2">
                            <div className="flex items-center">
                                <div className="avatar mr-2">
                                    <Image
                                        src={user?.profileImage && user.profileImage.includes("default.jpg")
                                            ? "/man.png"
                                            : getImageUrl(user?.profileImage) || "/man.png"
                                        }
                                        width={100}
                                        height={100}
                                        alt="Avatar"
                                        className="w-12 h-12 object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="text-sm opacity-50">{user?.fullName || "No Name"}</div>
                                </div>
                            </div>
                        </td>
                        <td className="text-color-2 pl-5">
                                <span className={`px-3 py-2.5 rounded ${user.deleted ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {user.deleted ? 'ផ្អាកដំណើរការ' : 'ធម្មតា'}
                                </span>
                        </td>
                        <td className="pl-5 flex gap-2">
                            {!user.deleted ? (
                                <button
                                    onClick={() => handleStatusClick(user, 'suspend')}
                                    className="px-3 py-2 bg-red-500 text-white rounded"
                                >
                                    ផ្អាក
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleStatusClick(user, 'approve')}
                                    className="px-3 py-2 bg-green-500 text-white rounded"
                                >
                                    អនុម័ត
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Confirmation Popup */}
            {showConfirmation && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">
                            {confirmType === 'suspend'
                                ? 'តើអ្នកចង់ផ្អាកដំណើរការអ្នកប្រើប្រាស់នេះមែនទេ?'
                                : 'តើអ្នកចង់អនុម័តអ្នកប្រើប្រាស់នេះមែនទេ?'}
                        </h2>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                ទេ
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 bg-primary text-white rounded"
                                disabled={isLoading}
                            >
                                {isLoading ? 'កំពុងដំណើរការ...' : 'បាទ/ចាស'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Pagination className="mt-4 flex" onPageChange={handlePageChange} pageSize={pageSize} totalCount={users.length} currentPage={currentPage} />
        </div>
    );
}
