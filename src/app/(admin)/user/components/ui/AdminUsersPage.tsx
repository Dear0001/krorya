'use client';

import { useEffect, useState } from 'react';
import Table from '../Table';
import { useGetUsersQuery } from "@/redux/services/user";
import Image from 'next/image';
import {convertRomanToKhmer} from "@/lib/constants";

type User = {
    id: number;
    fullName: string;
    profileImage: string;
    role: string;
    deleted: boolean;
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, error, isLoading } = useGetUsersQuery({
        page: 0,
        pageSize: 10,
    });

    useEffect(() => {
        if (data) {
            setUsers(data.payload.users);
            setLoading(false);
        }
    }, [data]);

    const filteredUsers = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="bg-white h-screen w-full rounded-lg p-4 dark:bg-white text-black">
            <div>
                <h1 className="font-semibold mb-2">ព័ត៌មានអ្នកប្រើប្រាស់ទាំងអស់</h1>
                    <span className="mt-2">
                      អ្នកប្រើប្រាស់{" "}
                                        <span className="text-secondary text-[27px]">
                        {convertRomanToKhmer(users.length > 99 ? "99+" : users.length.toString())}
                      </span>{" "}
                        បន្ថែមទៀត
                    </span>

                <label className="input input-bordered flex items-center gap-2 mt-4 w-fit dark:bg-white text-black">
                    {/* Input Field */}
                    <input
                        type="text"
                        className="w-full px-4 py-1.5 pl-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:bg-white text-black placeholder:text-gray-500"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="Search users"
                    />

                    {/* Search Icon */}
                    <div className="left-0 flex items-center pl-3 pointer-events-none ml-[-48px]">
                        <Image
                            src="/icons/search.svg"
                            alt="Search Icon"
                            width={20}
                            height={20}
                            className="text-gray-500"
                        />
                    </div>
                </label>
            </div>
            <div className="mt-4 h-full">
                {loading ? (
                        <p className="h-screen grid place-content-center font-moulpali text-secondary">
                            កំពុងទាញអ្នកប្រើប្រាស់...
                        </p>
                ) : filteredUsers.length > 0 ? (
                    <Table users={filteredUsers} />
                ) : (
                    <p className="h-screen grid place-content-center font-moulpali text-secondary">
                        មិនមានឈ្មោះអ្នកប្រើប្រាស់ទេ
                    </p>
                )}
            </div>
        </section>
    );
}