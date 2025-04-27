"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getImageUrl } from "@/lib/constants";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useUpdateRateFeedbackMutation, useDeleteRateFeedbackMutation } from "@/redux/services/ratefeedback";
import { useGetUserProfileQuery } from "@/redux/services/user";
import Loading from "@/components/loading/Loading";
import { RiCloseLargeLine } from "react-icons/ri";

export type CommentatorType = {
    username: string;
    profileImage: string;
    userId: number;
};

export type CommentDataType = {
    feedbackId: number;
    commentator: CommentatorType;
    comment: string;
    feedbackDate: string;
    ratingValue?: string;
};

export const CommentComponent: React.FC<{
    commentData: CommentDataType;
    onCommentUpdated?: () => void;
    onCommentDeleted?: () => void;
}> = ({ commentData, onCommentUpdated, onCommentDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(commentData.comment);
    const [selectedRate, setSelectedRate] = useState(commentData.ratingValue || "FIVE");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmType, setConfirmType] = useState<string | null>(null);
    const [showFullComment, setShowFullComment] = useState(false);
    const maxCommentLength = 100; // Characters to show before truncation

    const [updateFeedback, { isLoading }] = useUpdateRateFeedbackMutation();
    const [deleteFeedback] = useDeleteRateFeedbackMutation();
    const { data: userProfile } = useGetUserProfileQuery();

    // Check if comment needs truncation
    const needsTruncation = commentData.comment.length > maxCommentLength;
    const displayedComment = showFullComment
        ? commentData.comment
        : needsTruncation
            ? `${commentData.comment.substring(0, maxCommentLength)}...`
            : commentData.comment;

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedComment(commentData.comment);
        setSelectedRate(commentData.ratingValue || "FIVE");
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleUpdateSubmit = async () => {
        try {
            const ratingMap = {
                "ONE": 1,
                "TWO": 2,
                "THREE": 3,
                "FOUR": 4,
                "FIVE": 5
            };
            await updateFeedback({
                id: commentData.feedbackId,
                ratingValue: ratingMap[selectedRate as keyof typeof ratingMap].toString(),
                commentText: editedComment
            }).unwrap();

            toast.success("បានកែមតិរួចរាល់");
            setIsEditing(false);
            onCommentUpdated?.();
        } catch (error) {
            toast.error("កំហុសក្នុងការកែមតិ");
            console.error("Update error:", error);
        }
    };

    const handleDeleteClick = () => {
        setConfirmType('delete');
        setShowConfirmation(true);
    };

    const handleRateClick = (index: number) => {
        const ratingValue = ["ONE", "TWO", "THREE", "FOUR", "FIVE"][index - 1];
        setSelectedRate(ratingValue);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        setConfirmType(null);
    };

    const handleConfirm = async () => {
        if (confirmType === 'delete') {
            try {
                await deleteFeedback({ id: commentData.feedbackId }).unwrap();
                toast.success("បានលុបមតិរួចរាល់");
                setShowConfirmation(false);
                onCommentDeleted?.();
            } catch (error) {
                toast.error("កំហុសក្នុងការលុបមតិ");
                console.error("Delete error:", error);
            }
        }
    };

    const timeAgo = (feedbackDate: string): string => {
        const previous = new Date(feedbackDate);
        const current = new Date();
        const currentUTC = new Date(current.getTime() + current.getTimezoneOffset() * 60000);

        if (isNaN(previous.getTime())) {
            return "មុននេះបន្តិច";
        }

        const diff = currentUTC.getTime() - previous.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} ថ្ងៃមុន`;
        if (hours > 0) return `${hours} ម៉ោងមុន`;
        if (minutes > 0) return `${minutes} នាទីមុន`;
        return "មុននេះបន្តិច";
    };

    // Check if current user is the comment owner
    const isOwner = userProfile?.payload?.id === commentData.commentator.userId;

    return (
        <>
            <main className="w-full p-4 bg-white rounded-lg shadow-md mb-4">
                <article className="flex items-center space-x-4">
                    <div
                        className="w-10 h-10 sm:w-14 sm:h-14 border rounded-full bg-cover bg-center flex-shrink-0"
                        style={{
                            backgroundImage: `url(${
                                commentData.commentator.profileImage === "default.jpg"
                                    ? "/man.png"
                                    : getImageUrl(commentData.commentator.profileImage)
                            })`,
                        }}
                    />
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between items-center">
                            <p className="text-secondary font-medium">
                                {commentData.commentator.username}
                            </p>
                            <p className="text-gray-400 text-sm">
                                {timeAgo(commentData.feedbackDate)}
                            </p>
                        </div>

                        {isEditing ? (
                            <>
                                <div className="flex gap-1 my-2">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <label key={`edit-star-${index}`}>
                                            <input
                                                className="hidden"
                                                type="radio"
                                                name="edit-rating"
                                                value={index}
                                                checked={index === ["ONE", "TWO", "THREE", "FOUR", "FIVE"].indexOf(selectedRate) + 1}
                                                onChange={() => handleRateClick(index)}
                                            />
                                            <Image
                                                className="cursor-pointer"
                                                width={21}
                                                height={21}
                                                src={index <= ["ONE", "TWO", "THREE", "FOUR", "FIVE"].indexOf(selectedRate) + 1
                                                    ? "/icons/star2.svg"
                                                    : "/icons/Star-noFill.svg"}
                                                alt={`Star ${index}`}
                                            />
                                        </label>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    className="focus:border-b-2 focus:outline-none border-b-2 w-full pb-4 focus:pb-0 active:border-none bg-white text-color-2"
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        className="px-3 py-1 text-primary rounded-lg border border-primary"
                                        onClick={handleCancelEdit}
                                    >
                                        បោះបង់
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-primary text-white rounded-lg disabled:opacity-50"
                                        onClick={handleUpdateSubmit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Loading/> : "រក្សាទុក"}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="w-full text-color-2 mt-1">
                                    {displayedComment}
                                    {needsTruncation && !showFullComment && (
                                        <button
                                            onClick={() => setShowFullComment(true)}
                                            className="text-primary ml-1 hover:underline"
                                        >
                                            ជាច្រើនទៀត
                                        </button>
                                    )}
                                </p>
                                {isOwner && (
                                    <div className="flex gap-3 justify-end items-center mt-2">
                                        <FaRegEdit className="w-4 h-4 cursor-pointer text-gray-400" onClick={handleEditClick} />
                                        <FaRegTrashAlt
                                            className="w-4 h-4 cursor-pointer text-red-500"
                                            onClick={handleDeleteClick}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </article>
            </main>

            {showConfirmation && (
                <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white w-[310px] p-5 rounded-lg shadow-lg">
                        <div className="flex justify-end">
                            <button
                                onClick={handleCancel}
                                className="text-h4 text-slate-400 hover:shadow-custome"
                            >
                                <RiCloseLargeLine />
                            </button>
                        </div>
                        <article className="flex gap-2 items-center justify-center text-center">
                            <h1 className={"mb-3 text-h4 font-semibold leading-5 font-moulpali text-secondary lg:text-h3"}>លុបការបញ្ជេញមតិ</h1>
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
                                ? ''
                                : ' តើអ្នកចង់លុបមតិរបស់អ្នកមែនទេ?'}
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
                                className="px-4 py-2 bg-secondary text-white rounded-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loading/> : 'បញ្ជាក់'}
                            </button>
                        </div>
                    </div>
                </section>
            )}
            <ToastContainer />
        </>
    );
};