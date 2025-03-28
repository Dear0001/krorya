"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Bounce, toast } from "react-toastify";
import { useParams } from "next/navigation";
import {useGetDetailFoodByIdQuery} from "@/redux/services/guest";
import {useGetRateFeedbackQuery, usePostRateFeedbackMutation} from "@/redux/services/ratefeedback";
import {CommentComponent} from "@/app/(admin)/explore/components/CommentComponent";
import {convertRomanToKhmer, getImageUrl} from "@/lib/constants";
import StarRating from "@/app/(admin)/explore/components/recipeListUi/StarRating";
import {useGetUserProfileQuery} from "@/redux/services/user";

export default function FoodDetailPage() {
    const params = useParams();
    const foodId = params?.foodId as string;

    const { data: users } = useGetUserProfileQuery();
    const photoFileName = getImageUrl(users?.payload?.profileImage);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch food data
    const { data: foodData, isLoading, isError } = useGetDetailFoodByIdQuery(
        { id: Number(foodId) },
        { skip: !foodId }
    );

    // Fetch feedback data
    const { data: feedbackData, refetch: refetchFeedback } = useGetRateFeedbackQuery(
        { id: Number(foodId) },

        { skip: !foodId }
    );

    console.log("commentData", feedbackData);

    // Post feedback mutation
    const [postFeedback] = usePostRateFeedbackMutation();

    // Transform food data
    const foodDetail = foodData?.payload ? {
        foodImage: foodData.payload.photo[0]?.photo || '',
        foodName: foodData.payload.name,
        foodDescription: foodData.payload.description,
        foodPrice: 10000,
        sellerInfo: {
            username: foodData.payload.user?.fullName || 'Unknown',
            userId: foodData.payload.user?.id || 0
        },
        starAverage: foodData.payload.averageRating || 0,
        totalRater: foodData.payload.totalRaters || 0
    } : null;

    // Local state
    const [selectedRate, setSelectedRate] = useState<string>();
    const [num, setNum] = useState(1);
    const [rated, setRated] = useState(false);
    const [love, setLove] = useState(false);
    const [newFeedback, setNewFeedback] = useState("");

    if (isLoading) {
        return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
    }

    if (isError || !foodDetail) {
        return <div className="w-full h-screen flex items-center justify-center">Error loading food details</div>;
    }

    const handleChangeLove = async () => {
        setLove(!love);
        toast.success(!love ? "បានរក្សាទុក" : "បានលុបចេញ");
    };

    const handleRateClick = async (index: number) => {
        const ratingValue = ["ONE", "TWO", "THREE", "FOUR", "FIVE"][index - 1];
        setSelectedRate(ratingValue);
        toast.success("អ្នកបានវាយតម្លៃរួចហើយ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
        });
        setRated(true);
    };

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

            toast.success("បានប្រគល់មតិរួចរាល់");
            setNewFeedback("");
            setSelectedRate(undefined);
            await refetchFeedback();
        } catch (error) {
            toast.error("កំហុសក្នុងការប្រគល់មតិ");
            console.error("Failed to post feedback:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="w-full flex flex-col justify-center pt-5 items-center gap-5">
                {/* Food Detail Section */}
                <div className="bg-white shadow-sm rounded-lg lg:h-[460px] lg:w-[85%] md:h-96 md:w-2/3 h-1/2 w-[90%]">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 p-4 h-full gap-x-4">
                        <div className="w-full h-full rounded-md relative overflow-hidden object-cover">
                            <Image
                                src={foodDetail.foodImage ? getImageUrl(foodDetail.foodImage) : '/assets/banner-dashboard.png'}
                                alt={foodDetail.foodName}
                                fill
                                className="object-cover"
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
                                    <h2 className="text-2xl text-secondary font-kantumruy font-medium">
                                        {convertRomanToKhmer((num * foodDetail.foodPrice).toString())} រៀល
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-7 pt-5">
                                    {/* Seller Info */}
                                    <div className="w-full h-20 bg-gray-50 rounded-lg grid grid-cols-3 p-2 items-center">
                                        <div className="flex gap-2 col-span-2">
                                            <div className="flex gap-2 items-center">
                                                <Image
                                                    width={20}
                                                    height={20}
                                                    src="/icons/flower2.svg"
                                                    alt="flower"
                                                />
                                                <p className="text-secondary font-medium">បង្កើតដោយ</p>
                                            </div>
                                            <p className="inline-block">{foodDetail.sellerInfo.username}</p>
                                        </div>

                                        <div className="flex flex-row justify-end items-center">
                                            <StarRating starAverage={Number(foodDetail.starAverage)} />
                                            <p className="text-black font-medium pl-1">
                                                {convertRomanToKhmer(Number(foodDetail.starAverage).toFixed(1))}
                                            </p>
                                        </div>

                                        <div className="flex justify-end text-[14px] text-black col-span-3">
                                            ផ្អែកលើចំនួន {convertRomanToKhmer(foodDetail.totalRater.toString())} នាក់នៃការវាយតម្លៃ
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex gap-2">
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

                                    {/* Description */}
                                    <div className="flex gap-2">
                                        <Image width={20} height={20} src="/icons/flower2.svg" alt="flower" />
                                        <p className="text-secondary">អំពីមុខម្ហូប</p>
                                    </div>
                                    <p className="text-black ps-8">{foodDetail.foodDescription}</p>
                                </div>
                            </div>




                            {/* Quantity and Bookmark */}
                            <div className="flex gap-3 justify-end items-center">
                                <div className="flex justify-center items-center">
                                    <Image
                                        onClick={handleChangeLove}
                                        className="cursor-pointer"
                                        width={25}
                                        height={25}
                                        src={!love ? "/icons/heart_outline.svg" : "/icons/heart_fill.svg"}
                                        alt="heart"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*card food related*/}
                <div className="bg-white rounded-md p-4 w-[90%] md:w-2/3 lg:w-[85%]">
                    <div className="flex p-4">
                        <Image
                            width={20}
                            height={20}
                            src="/icons/flower2.svg"
                            alt="flower"
                        />
                        <p className="text-[18px] pl-2 text-black font-medium ">
                            ម្ហូបទាំងអស់របស់
                            <span className="text-secondary font-medium ps-4">
                                Recommendation
                              </span>
                        </p>
                    </div>

                    {/*<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ps-10 lg:ps-10">*/}
                    {/*    {currentItems?.map((food, index) => (*/}
                    {/*        <div className="carousel-item" key={index}>*/}
                    {/*            <FoodCard key={index} {...food} href={index} />*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    {/*{foodUser?.length > itemsPerPage && (*/}
                    {/*    <div className="w-full flex justify-center py-5">*/}
                    {/*        <div className="join gap-1 items-center rounded">*/}
                    {/*            <button*/}
                    {/*                className={`w-10 h-10 ${*/}
                    {/*                    currentPage === 1 ? "bg-gray-200" : "bg-white"*/}
                    {/*                } text-black rounded-lg `}*/}
                    {/*                onClick={() => handlePageChange(currentPage - 1)}*/}
                    {/*                disabled={currentPage === 1}*/}
                    {/*            >*/}
                    {/*                ត្រឡប់*/}
                    {/*            </button>*/}
                    {/*            {[*/}
                    {/*                ...Array(Math.ceil(foodUser.length / itemsPerPage)).keys(),*/}
                    {/*            ].map((number) => (*/}
                    {/*                <button*/}
                    {/*                    key={number + 1}*/}
                    {/*                    className={`w-10 h-10 ${*/}
                    {/*                        currentPage === number + 1*/}
                    {/*                            ? "bg-primary text-white"*/}
                    {/*                            : "bg-white text-black"*/}
                    {/*                    } rounded-lg border`}*/}
                    {/*                    onClick={() => handlePageChange(number + 1)}*/}
                    {/*                >*/}
                    {/*                    {number + 1}*/}
                    {/*                </button>*/}
                    {/*            ))}*/}
                    {/*            <button*/}
                    {/*                className={`w-10 h-10 ${*/}
                    {/*                    currentPage === Math.ceil(foodUser.length / itemsPerPage)*/}
                    {/*                        ? "bg-gray-200"*/}
                    {/*                        : "bg-white"*/}
                    {/*                } text-black rounded-lg `}*/}
                    {/*                onClick={() => handlePageChange(currentPage + 1)}*/}
                    {/*                disabled={*/}
                    {/*                    currentPage === Math.ceil(foodUser.length / itemsPerPage)*/}
                    {/*                }*/}
                    {/*            >*/}
                    {/*                បន្ទាប់*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>

                {/* Feedback Section */}
                <div className="bg-white rounded-lg w-[90%] md:w-2/3 lg:w-[85%]">
                    <h2 className="text-black text-[18px] font-medium px-5 py-8">បញ្ចេញមតិ</h2>
                    <div className="w-full px-5 flex flex-col justify-start">
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
                                {isSubmitting ? "Submitting..." : "ផ្តល់មតិ"}
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
                                        profileImage: comment.user.profileImage || "man.png"
                                    },
                                    comment: comment.commentText,
                                    feedbackDate: comment.createdAt,
                                    reply: null
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}