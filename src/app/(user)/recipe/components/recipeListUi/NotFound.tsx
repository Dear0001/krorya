"use client";
import React from "react";
import Image from "next/image";

// Define Props Type
type NotFoundProps = {
    props: string;
};

const NotFound: React.FC<NotFoundProps> = ({ props }) => (
    <div className="flex flex-col items-center justify-center mx-auto">
        <Image src="/icons/BACKGROUND.svg" alt="404" width={300} height={300} />
        <div className="text-lg mt-10 font-moulpali text-[#979797]">{props}</div>
    </div>
);

export default NotFound;
