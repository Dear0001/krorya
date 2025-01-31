'use client';

import { useEffect, useState } from 'react';
import Table from '../Table';
import { useGetUsersQuery } from "@/redux/services/user";

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
        <section className="bg-white w-full rounded-lg p-4 dark:bg-white text-black h-screen">
            <div>
                <h1 className="font-semibold mb-2">ព័ត៌មានការរាយការណ៍រូបមន្តម្ហូបទាំងអស់</h1>
                <span className="mt-2">
                    មានរូបមន្ត <span className="text-secondary">{users.length}+ </span> បន្ថែមទៀត
                </span>
                <label className="input input-bordered flex items-center gap-2 mt-4 w-fit dark:bg-white text-black">
                    <input
                        type="text"
                        className="bg-white border-gray-300 focus:ring-0 dark:bg-white text-black"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </label>
            </div>

            <div className="mt-4">
                {loading ? (
                    <p className="text-center font-moulpali text-secondary">កំពុងទាញអ្នកប្រើប្រាស់...</p>
                ) : filteredUsers.length > 0 ? (
                    <Table users={filteredUsers} />
                ) : (
                    <p className="text-center font-moulpali text-secondary">មិនមានឈ្មោះអ្នកប្រើប្រាស់ទេ</p>
                )}
            </div>
        </section>
    );
}