import React from 'react';
import Image from "next/image";
import Link from "next/link";

const NotAuthorize = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="max-w-96 text-center">
                <Image
                    src={"/Group 1000006054.png"}
                    width={800}
                    height={800}
                    alt="login"
                />
                <div className="mt-4">
                    <h1 className="font-bold text-2xl">
                        លោកអ្នកមិនទាន់មានគណនីនៅឡើយទេ
                    </h1>
                    <span className="text-sm">សូមបង្កើតគណនីជាមុនសិន</span>
                </div>
                <div className="flex gap-4 items-center justify-center mt-4">
                    <Link
                        href="/register"
                        className="text-white text-center bg-primary w-56 py-2 px-6 rounded-lg"
                    >
                        បង្កើតគណនី
                    </Link>
                    <Link
                        href="/login"
                        className="border border-primary text-center text-primary px-6 w-56 py-2 rounded-lg"
                    >
                        ចូលគណនី
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotAuthorize;