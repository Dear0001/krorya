'use client';

import { useEffect, useState } from 'react';
import Table from '../Table';

type User = {
    userId: number;
    createdDate: string;
    profileImage: string;
    username: string;
    email: string;
    followersCount: number;
    followingsCount: number;
    isDeactivated: boolean;
}
// Static user data
const initialUsers: User[] = [
    {
        userId: 1,
        createdDate: '2024-01-01',
        profileImage: '',
        username: 'johndoe',
        email: 'john@example.com',
        followersCount: 100,
        followingsCount: 50,
        isDeactivated: false
    },
    {
        userId: 2,
        createdDate: '2023-12-15',
        profileImage: '',
        username: 'janesmith',
        email: 'jane@example.com',
        followersCount: 200,
        followingsCount: 80,
        isDeactivated: false
    },
    {
        userId: 3,
        createdDate: '2023-11-20',
        profileImage: '',
        username: 'alicejohnson',
        email: 'alice@example.com',
        followersCount: 300,
        followingsCount: 150,
        isDeactivated: true
    },{
        userId: 4,
        createdDate: '2023-11-20',
        profileImage: '',
        username: 'alicejohnson',
        email: 'alice@example.com',
        followersCount: 300,
        followingsCount: 150,
        isDeactivated: true
    },
    {
        userId: 5,
        createdDate: '2023-11-20',
        profileImage: '',
        username: 'alicejohnson',
        email: 'alice@example.com',
        followersCount: 300,
        followingsCount: 150,
        isDeactivated: true
    },
    {
        userId: 6,
        createdDate: '2023-11-20',
        profileImage: '',
        username: 'alicejohnson',
        email: 'alice@example.com',
        followersCount: 300,
        followingsCount: 150,
        isDeactivated: true
    },
    {
        userId: 7,
        createdDate: '2023-11-20',
        profileImage: '',
        username: 'alicejohnson',
        email: 'alice@example.com',
        followersCount: 300,
        followingsCount: 150,
        isDeactivated: true
    }
    ,{
        userId: 8,
        createdDate: '2023-11-20',
        profileImage: '',
        username: 'alicejohnson',
        email: 'alice@example.com',
        followersCount: 300,
        followingsCount: 150,
        isDeactivated: true
    },
    {
        userId: 9,
        createdDate: '2023-11-20',
        profileImage: '',
        username: 'alicejohnson',
        email: 'alice@example.com',
        followersCount: 300,
        followingsCount: 150,
        isDeactivated: true
    },
    {
        userId: 10,
        createdDate: '2023-11-20',
        profileImage: '',
        username: 'alicejohnson',
        email: 'alice@example.com',
        followersCount: 300,
        followingsCount: 150,
        isDeactivated: true
    },
    {
        userId: 11,
        createdDate: '2023-11-20',
        profileImage: '',
        username: 'alicejohnson',
        email: 'alice@example.com',
        followersCount: 300,
        followingsCount: 150,
        isDeactivated: true
    },{
        userId: 12,
        createdDate: '2023-11-20',
        profileImage: '',
        username: 'alicejohnson',
        email: 'alice@example.com',
        followersCount: 300,
        followingsCount: 150,
        isDeactivated: true
    }
];

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setUsers(initialUsers);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
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
