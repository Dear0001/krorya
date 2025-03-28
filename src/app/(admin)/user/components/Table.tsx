import React, { useEffect, useState } from 'react';
import { formatDateToKhmer } from '@/components/ConvertDateToKhmer';
import Pagination from "@/app/(admin)/user/components/Pagination";
import { convertRomanToKhmerWithIndex, getImageUrl } from "@/lib/constants";
import Image from "next/image";
import { useDeleteUserByIdMutation } from "@/redux/services/user";
import { RiCloseLargeLine } from "react-icons/ri";

type User = {
    id: number;
    fullName: string;
    profileImage?: string;
    role: string;
    deleted: boolean;
};

export default function Table({ users: initialUsers = [] }: { users: User[] }) {
    const pageSize = 6;
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
    const paginatedUsers = users?.slice(startIndex, startIndex + pageSize) || [];

    const handleStatusClick = (user: User, type: 'suspend' | 'approve') => {
        setSelectedUser(user);
        setConfirmType(type);
        setShowConfirmation(true);
    };

    const handleConfirm = async () => {
        if (!selectedUser || !confirmType) return;

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
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        setSelectedUser(null);
        setConfirmType(null);
    };

    console.log("user profiles", users.map((user) => getImageUrl(user.profileImage)));

    return (
        <div className="overflow-x-auto w-full">
            <div className="min-w-[600px] md:min-w-0">
                <table className="table shadow-md w-full rounded-lg overflow-hidden">
                    <thead>
                    <tr className="text-lg text-left bg-[#F9FAFB] h-[55px] text-color-2">
                        <th className="font-light px-5">លេខរៀង</th>
                        <th className="font-light px-5 hidden md:table-cell">កាលបរិច្ឆេទបង្កើតគណនី</th>
                        <th className="font-light px-5">ឈ្មោះអ្នកប្រើប្រាស់</th>
                        <th className="font-light px-5 hidden sm:table-cell">ស្ថានភាពអ្នកប្រើប្រាស់</th>
                        <th className="font-light px-5">សកម្មភាព</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedUsers?.map((user, index) => (
                        <tr
                            key={user?.id}
                            className="text-left border-b border-gray-300 hover:bg-gray-100 transition duration-200"
                        >
                            <td className="text-color-2 pl-5 py-3">{convertRomanToKhmerWithIndex(startIndex + index + 1)}</td>
                            <td className="text-color-2 pl-5 py-3 hidden md:table-cell">
                                <div className="text-sm opacity-50">{formatDateToKhmer(new Date().toISOString())}</div>
                            </td>
                            <td className="text-color-2 py-3">
                                <div className="flex items-center">
                                    <div className="avatar mr-2">
                                        <Image
                                            src={user?.profileImage === "default.jpg" || !user?.profileImage
                                                ? "/man.png"
                                                : getImageUrl(user.profileImage)}
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
                            <td className="text-color-2 pl-5 py-3 hidden sm:table-cell">
                                <span className={`px-3 py-2.5 rounded-lg ${user?.deleted ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {user?.deleted ? 'ផ្អាកដំណើរការ' : 'ធម្មតា'}
                                </span>
                            </td>
                            <td className="pl-5 flex gap-2 py-3">
                                {!user.deleted ? (
                                    <button
                                        onClick={() => handleStatusClick(user, 'suspend')}
                                        className="px-3 py-2 bg-red-500 text-white rounded-lg"
                                    >
                                        ផ្អាក
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleStatusClick(user, 'approve')}
                                        className="px-3 py-2 bg-green-500 text-white rounded-lg"
                                    >
                                        អនុម័ត
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Popup */}
            {showConfirmation && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-[310px] p-5 rounded-lg shadow-lg">
                        <div className="flex justify-end">
                            <button
                                onClick={handleCancel}
                                className="text-2xl text-slate-400 hover:shadow-custome"
                            >
                                <RiCloseLargeLine />
                            </button>
                        </div>

                        <article className="flex gap-2 items-center justify-start text-center">
                                <Image
                                    src="/icons/flower.png"
                                    alt="border"
                                    width={35}
                                    height={35}
                                />
                                <h3 className="text-xl font-semibold leading-5 font-moulpali text-secondary lg:text-xl mt-2">
                                    {selectedUser?.fullName || 'មិនមានឈ្មោះ'}
                                </h3>
                            </article>
                        <p className="mt-2 text-sm leading-4 text-slate-600 flex justify-center">
                            <Image
                                src="/icons/Kbach.svg"
                                alt="border"
                                width={100}
                                height={13}
                            />
                        </p>
                        <h2 className="text-lg font-kantumruy py-4">
                            {confirmType === 'suspend'
                                ? 'តើអ្នកចង់ផ្អាកដំណើរការអ្នកប្រើប្រាស់នេះមែនទេ?'
                                : 'តើអ្នកចង់អនុម័តអ្នកប្រើប្រាស់នេះមែនទេ?'}
                        </h2>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleCancel}
                                className="px-4 rounded-lg py-2 text-primary border border-amber-300 hover:bg-primary hover:text-white"
                            >
                                ទេ
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 bg-primary text-white rounded-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'កំពុងដំណើរការ...' : 'បញ្ជាក់'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Pagination
                className="mt-4 flex"
                onPageChange={handlePageChange}
                pageSize={pageSize}
                totalCount={users.length || 0}
                currentPage={currentPage}
            />
        </div>
    );
}