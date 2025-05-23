"use client";
import React, {useState} from "react";
import Image from "next/image";
import {toast, ToastContainer} from "react-toastify";
import { useParams } from "next/navigation";
import {useGetDetailFoodByIdQuery} from "@/redux/services/guest";
import {useGetRateFeedbackQuery, usePostRateFeedbackMutation} from "@/redux/services/ratefeedback";
import {CommentComponent} from "@/app/(user)/explore/components/CommentComponent";
import {convertRomanToKhmer, getImageUrl, } from "@/lib/constants";
import StarRating from "@/app/(user)/explore/components/recipeListUi/StarRating";
import {useGetUserProfileQuery} from "@/redux/services/user";
import Loading from "@/components/loading/Loading";

export default function FoodDetailPage() {
    const params = useParams();
    const foodId = params?.foodId as string;

    const { data: users } = useGetUserProfileQuery();
    const photoFileName = getImageUrl(users?.payload?.profileImage);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // get food detail by id
    const {
        data: foodData,
        isLoading,
        isError,
        refetch: refetchFoodDetails
    } = useGetDetailFoodByIdQuery(
        { id: Number(foodId) },
        { skip: !foodId }
    );
    // get feedback by food id
    const {
        data: feedbackData,
        refetch: refetchFeedback
    } = useGetRateFeedbackQuery(
        { id: Number(foodId) },
        {
            skip: !foodId,
            refetchOnMountOrArgChange: true
        }
    );

    const handleCommentUpdated = async () => {
        try {
            // Immediately refetch both food details and feedback
            await Promise.all([
                refetchFoodDetails(),
                refetchFeedback()
            ]);
        } catch (error) {
            console.error("Error refetching after update:", error);
        }
    };

    const handleCommentDeleted = async () => {
        try {
            await Promise.all([
                refetchFoodDetails(),
                refetchFeedback()
            ]);
        } catch (error) {
            console.error("Error refetching after delete:", error);
        }
    };
    // Post feedback mutation
    const [postFeedback] = usePostRateFeedbackMutation();

    // Transform food data
    const foodDetail = foodData?.payload ? {
        foodImage: foodData.payload.photo[0]?.photo || '',
        foodName: foodData.payload.name,
        foodDescription: foodData.payload.description,
        durationInMinutes: foodData.payload.durationInMinutes,
        foodLevel: foodData.payload.level,
        sellerInfo: {
            username: foodData.payload.user?.fullName || 'Unknown',
            userId: foodData.payload.user?.id || 0
        },
        starAverage: foodData.payload.averageRating || 0,
        totalRater: foodData.payload.totalRaters || 0
    } : null;

    // Local state
    const [selectedRate, setSelectedRate] = useState<string>();
    const [num] = useState(1);
    const [rated, setRated] = useState(false);
    const [newFeedback, setNewFeedback] = useState("");


    // Background color mapping for levels
    // const bgColor = levelBgColors;
    //
    // console.log("test", foodData?.payload.level);
    // // // Get the corresponding background color class
    // const levelClass = bgColor[ foodData?.payload?.level || "Easy"] || "bg-gray-100 text-gray-800";
    type DifficultyLevel = "Easy" | "Medium" | "Hard";

    const levelStyles: Record<DifficultyLevel, { bg: string; text: string }> = {
        Easy: {
            bg: "bg-[#fff9eb]",
            text: "text-primary",
        },
        Medium: {
            bg: "bg-[#f5f3ff]",
            text: "text-[#713aed]",
        },
        Hard: {
            bg: "bg-[#fef2f3]",
            text: "text-[#ff2323]",
        },
    };

    // In your component, ensure the level is typed
    const level = (foodData?.payload?.level as DifficultyLevel) || "Easy";
    const { bg: levelBg, text: levelText } = levelStyles[level];

    if (isLoading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    if (isError || !foodDetail) {
        return <div className="w-full h-screen flex items-center justify-center">Error loading food details</div>;
    }


    const handleRateClick = async (index: number) => {
        const ratingValue = ["ONE", "TWO", "THREE", "FOUR", "FIVE"][index - 1];
        setSelectedRate(ratingValue);
        toast.success("អ្នកបានវាយតម្លៃរួចហើយ");
        setRated(true);
    };

    // Then modify your handlePostFeedback function:
    const handlePostFeedback = async () => {
        if (!selectedRate) {
            toast.error("សូមជ្រើសរើសពិន្ទុវាយតម្លៃ");
            return;
        }
        if (!newFeedback.trim()) {
            toast.error("សូមបញ្ចូលមតិយោបល់");
            return;
        }

        try {
            setIsSubmitting(true);
            const ratingMap = {
                "ONE": 1,
                "TWO": 2,
                "THREE": 3,
                "FOUR": 4,
                "FIVE": 5
            };
            const numericRating = ratingMap[selectedRate as keyof typeof ratingMap];

            await postFeedback({
                foodId: Number(foodId),
                ratingValue: numericRating.toString(),
                commentText: newFeedback
            }).unwrap();

            // Immediately refetch data after successful post
            await Promise.all([
                refetchFoodDetails(),
                refetchFeedback()
            ]);

            toast.success("បានប្រគល់មតិរួចរាល់");
            setNewFeedback("");
            setSelectedRate(undefined);
            setRated(false);
        } catch (error) {
            toast.error("កំហុសក្នុងការប្រគល់មតិ");
            console.error("Failed to post feedback:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="w-full flex flex-col justify-center pt-5 items-center gap-5">
                {/* Food Detail Section */}
                <div className="bg-white shadow-sm rounded-lg lg:h-[460px] lg:w-[85%] md:h-96 md:w-full h-1/2 w-[90%] px-1">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 p-4 h-full gap-x-4">
                        <div className="m-1 w-full h-[200px] sm:h-full rounded-md relative overflow-hidden">
                            <Image
                                src={foodDetail.foodImage ? getImageUrl(foodDetail.foodImage) : '/assets/banner-dashboard.png'}
                                alt={foodDetail.foodName}
                                fill
                                className="object-cover"
                                priority={true}
                                sizes="(max-width: 640px) 100vw, 50vw"
                                unoptimized={true}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/assets/banner-dashboard.png';
                                    target.onerror = null;
                                }}
                            />
                        </div>
                        <div className="w-full flex flex-col gap-4 justify-between">
                            <div>
                                <div className="flex justify-between">
                                    <h2 className="text-2xl text-black font-kantumruy font-medium">
                                        {foodDetail.foodName}
                                    </h2>
                                    <div className="flex items-center gap-2 text-h3">
                                        <svg
                                            width="13"
                                            height="13"
                                            viewBox="0 0 13 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.5 0C5.64641 0 4.80117 0.168127 4.01256 0.494783C3.22394 0.821439 2.50739 1.30023 1.90381 1.90381C0.684819 3.12279 0 4.77609 0 6.5C0 8.22391 0.684819 9.87721 1.90381 11.0962C2.50739 11.6998 3.22394 12.1786 4.01256 12.5052C4.80117 12.8319 5.64641 13 6.5 13C8.22391 13 9.87721 12.3152 11.0962 11.0962C12.3152 9.87721 13 8.22391 13 6.5C13 5.64641 12.8319 4.80117 12.5052 4.01256C12.1786 3.22394 11.6998 2.50739 11.0962 1.90381C10.4926 1.30023 9.77606 0.821439 8.98744 0.494783C8.19883 0.168127 7.35359 0 6.5 0ZM9.23 9.23L5.85 7.15V3.25H6.825V6.63L9.75 8.385L9.23 9.23Z"
                                                fill="#FFD233"
                                            />
                                        </svg>
                                        <span>{convertRomanToKhmer((num * foodDetail.durationInMinutes).toString())} នាទី</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-7 pt-5">
                                    {/* Admin Info */}
                                    <div className="w-full h-auto sm:h-20 bg-gray-50 rounded-lg grid grid-cols-1 sm:grid-cols-3 p-2 gap-4 sm:gap-0">
                                        {/* Row 1 - Creator Info (full width on mobile, spans 2 cols on desktop) */}
                                        <div className="flex items-center gap-2 sm:col-span-2">
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    width={20}
                                                    height={20}
                                                    src="/icons/flower2.svg"
                                                    alt="flower"
                                                    className="flex-shrink-0"
                                                />
                                                <p className="text-secondary font-medium whitespace-nowrap">បង្កើតដោយ</p>
                                            </div>
                                            <p className="truncate">{foodDetail.sellerInfo.username}</p>
                                        </div>

                                        {/* Row 2 - Rating (full width on mobile, last col on desktop) */}
                                        <div className="flex flex-row justify-start sm:justify-end items-center">
                                            <StarRating starAverage={Number(foodDetail.starAverage)} />
                                            <p className="text-black font-medium pl-1">
                                                {convertRomanToKhmer(Number(foodDetail.starAverage).toFixed(1))}
                                            </p>
                                        </div>

                                        {/* Row 3 - Rater count (always full width) */}
                                        <div className="flex justify-start sm:justify-end text-[14px] text-black col-span-1 sm:col-span-3">
                                            ផ្អែកលើចំនួន {convertRomanToKhmer(foodDetail.totalRater.toString())} នាក់នៃការវាយតម្លៃ
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="flex gap-2">
                                        <Image width={20} height={20} src="/icons/flower2.svg" alt="flower" />
                                        <p className="text-secondary">អំពីមុខម្ហូប</p>
                                    </div>
                                    <p className="text-black ps-8">{foodDetail.foodDescription}</p>
                                </div>
                            </div>
                            {/*level*/}
                            <div className="card-actions flex flex-row items-center justify-end">
                                <div
                                    className={`badge rounded-[8px] border-none py-[1px] px-2 text-[13px] font-medium ${levelBg} ${levelText}`}
                                >
                                    {level}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Feedback Section */}
                <div className="bg-white rounded-lg w-[90%] md:w-full lg:w-[85%]">
                    <h2 className="text-black text-[18px] font-medium px-5 py-8">បញ្ចេញមតិ</h2>

                    <div className="w-full px-5 flex flex-col justify-start">
                        {/* Rating */}
                        <div className="flex gap-2 px-5 pb-5">
                            <Image width={20} height={20} src="/icons/flower2.svg" alt="flower" />
                            <p className="text-secondary">វាយតម្លៃ</p>
                            <div className="pl-1 flex gap-1">
                                {[...Array(5)].map((_, index) => (
                                    <label key={`star-${index}`}>
                                        <input
                                            className="hidden"
                                            type="radio"
                                            name="rating"
                                            value={index + 1}
                                            disabled={rated}
                                            onClick={() => handleRateClick(index + 1)}
                                        />
                                        <Image
                                            className="cursor-pointer"
                                            width={21}
                                            height={21}
                                            src={
                                                index < (selectedRate ? ["ONE", "TWO", "THREE", "FOUR", "FIVE"].indexOf(selectedRate) + 1 : 0)
                                                    ? "/icons/star2.svg"
                                                    : "/icons/Star-noFill.svg"
                                            }
                                            alt={`Star ${index + 1}`}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3 justify-start">
                            <div className="flex gap-2">
                                <div
                                    className="w-10 h-10 rounded-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${photoFileName || "/man.png"})` }}
                                ></div>
                            </div>

                            <input
                                className="focus:border-b-2 focus:outline-none border-b-2 w-full pb-4 focus:pb-0 active:border-none dark:bg-white text-color-2"
                                placeholder="បញ្ចូលមតិ..."
                                type="text"
                                value={newFeedback}
                                onChange={(e) => setNewFeedback(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex justify-end pt-5">
                            <button
                                onClick={handlePostFeedback}
                                className="bg-primary py-2 px-5 rounded-lg text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Loading/> : "ផ្តល់មតិ"}
                            </button>
                        </div>
                    </div>

                    {/* Feedback List */}
                    <div className="w-full px-5 pb-5">
                        {feedbackData?.payload?.map((comment: any) => (
                            <CommentComponent
                                key={comment.feedbackId}
                                commentData={{
                                    commentator: {
                                        username: comment.user.fullName,
                                        profileImage: comment.user.profileImage === "default.jpg"
                                            ? "/man.png"
                                            : comment.user.profileImage,
                                        userId: comment.user.id
                                    },
                                    feedbackId: comment.feedbackId,
                                    comment: comment.commentText,
                                    feedbackDate: comment.createdAt,
                                    ratingValue: comment.ratingValue
                                }}
                                onCommentUpdated={handleCommentUpdated}
                                onCommentDeleted={handleCommentDeleted}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}