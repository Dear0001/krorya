import React from "react";
import Image from "next/image";

const StarRating = ({ starAverage }) => {
  // Ensure starAverage is a number and handle potential NaN cases
  const numericAverage = Number(starAverage) || 0;
  const clampedAverage = Math.min(Math.max(numericAverage, 0), 5); // Ensure between 0-5

  const fullStars = Math.floor(clampedAverage);
  const hasHalfStar = clampedAverage % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
            <Image
                key={`full-${index}`}
                width={21}
                height={21}
                src="/icons/Star_fill.svg"
                alt="full star"
            />
        ))}

        {hasHalfStar && (
            <Image
                key="half"
                width={21}
                height={21}
                src="/icons/Star_half.svg"
                alt="half star"
            />
        )}

        {[...Array(emptyStars)].map((_, index) => (
            <Image
                key={`empty-${index}`}
                width={21}
                height={21}
                src="/icons/Star-noFill.svg"
                alt="empty star"
            />
        ))}
      </div>
  );
};

export default StarRating;