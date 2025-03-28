"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {getImageUrl} from "@/lib/constants";

export type CommentatorType = {
    username: string;
    profileImage: string;
};

export type ReplyType = {
    commentator: CommentatorType;
    comment: string;
};

export type CommentDataType = {
    commentator: CommentatorType;
    comment: string;
    feedbackDate: string;
    reply?: ReplyType | null;
};

export const CommentComponent: React.FC<{ commentData: CommentDataType }> = ({ commentData }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    console.log("fafafa", commentData);

    const [replyText, setReplyText] = useState("");

    const handleReplyButtonClick = () => {
        setShowReplyInput(!showReplyInput);
    };

    const handleReplyTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReplyText(e.target.value);
    };

    const handleReplySubmit = () => {
        toast.success("Your reply has been added!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Slide,
        });
    };

    const timeAgo = (feedbackDate: string): string => {
        const current = new Date();
        const previous = new Date(feedbackDate);
        const diff = current.getTime() - previous.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} days ago`;
        if (hours > 0) return `${hours} hours ago`;
        return `${minutes} minutes ago`;
    };

    return (
        <>
            <ToastContainer />
            <div className="w-full p-4 bg-white rounded-lg shadow-md mb-4">
                <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 border rounded-full overflow-hidden relative">
                        <Image
                            className="rounded-full"
                            fill
                            src={
                                commentData.commentator.profileImage === "default.jpg"
                                    ? "/man.png"
                                    : getImageUrl(commentData.commentator.profileImage)
                            }
                            alt={commentData.commentator.username || "Profile Image"}
                        />

                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                            <p className="text-secondary font-medium">
                                {commentData.commentator.username}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {timeAgo(commentData.feedbackDate)}
                            </p>
                        </div>
                        <p className="w-full text-color-2 mt-2">{commentData.comment}</p>
                        <div className="flex gap-2 items-center mt-2">
                            <Image
                                className="cursor-pointer"
                                width={15}
                                height={15}
                                src="/icons/reply.svg"
                                alt="Reply"
                                onClick={handleReplyButtonClick}
                            />
                            <p
                                className="text-gray-300 cursor-pointer"
                                onClick={handleReplyButtonClick}
                            >
                                Reply
                            </p>
                        </div>
                    </div>
                </div>

                {showReplyInput && (
                    <div className="flex pl-14 py-5 bg-gray-50 gap-5 mt-4 rounded-md">
                        <input
                            type="text"
                            className="focus:border-b-2 focus:outline-none border-b-2 w-full pb-4 bg-white text-color-2"
                            value={replyText}
                            onChange={handleReplyTextChange}
                            placeholder="Write a reply..."
                        />
                        <button
                            className="bg-primary py-2 px-5 rounded-lg text-white"
                            onClick={handleReplySubmit}
                        >
                            Reply
                        </button>
                    </div>
                )}
                {/*show reply commetor*/}
                {commentData.reply && (
                    <div className="flex pl-14 py-5 mt-4 bg-gray-50 rounded-md">
                        <div className="w-11 h-11 border rounded-full overflow-hidden relative">
                            <Image
                                className="rounded-full"
                                src={commentData.reply.commentator.profileImage}
                                alt={commentData.reply.commentator.username}
                                fill
                                objectFit="cover"
                            />
                        </div>
                        <div className="flex flex-col pl-3 gap-1">
                            <div className="flex justify-between items-center">
                                <p className="text-secondary font-medium">
                                    {commentData.reply.commentator.username}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {timeAgo(commentData.feedbackDate)}
                                </p>
                            </div>
                            <p className="text-color-2">{commentData.reply.comment}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};