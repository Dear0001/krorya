import React from "react";
import classnames from "classnames";
import { DOTS, usePagination } from "@/app/(admin)/admin/user/components/UsePagination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type PaginationProps = {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
    className?: string;
};

const Pagination = ({
                        onPageChange,
                        totalCount,
                        siblingCount = 1,
                        currentPage,
                        pageSize,
                        className,
                    }: PaginationProps) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
  const onNext = () => {
    if (currentPage < Number(lastPage)) {
        onPageChange(currentPage + 1);
    }
};

    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div className="pagination-wrapper flex items-center justify-between border-t-2 mt-4">
            <div className="results-info text-sm mt-4">
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} results
            </div>
            <ul
                className={classnames(
                    "pagination-container",
                    "my-custom-class rounded-md border border-gray-300",
                    className
                )}
            >
                <li
                    className={classnames(
                        "pagination-item rounded-none border-r border-gray-300 w-10 h-10 flex items-center justify-center m-0",
                        {
                            disabled: currentPage === 1,
                        }
                    )}
                    onClick={currentPage === 1 ? undefined : onPrevious}
                    style={{ borderRadius: 0, margin: 0 }}
                >
                    <div className="arrow left">
                        <IoIosArrowBack />
                    </div>
                </li>
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li
                                key={index}
                                style={{ borderRadius: 0, margin: 0 }}
                                className="pagination-item rounded-none dots border-r border-gray-300 w-10 h-10 flex items-center justify-center"
                            >
                                &#8230;
                            </li>
                        );
                    }

                    return (
                        <li
                            key={index}
                            className={classnames(
                                "pagination-item rounded-none border-r border-gray-300 w-10 h-10 flex items-center justify-center text-primary",
                                {
                                    "bg-primary bg-opacity-60 text-primary":
                                        pageNumber === currentPage,
                                    border: pageNumber === currentPage,
                                    "border-primary text-primary": pageNumber === currentPage,
                                }
                            )}
                            style={{ borderRadius: 0, margin: 0 }}
                            onClick={() => onPageChange(pageNumber as number)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                <li
                    className={classnames(
                        "pagination-item rounded-none border-r border-gray-300 w-10 h-10 flex items-center justify-center m-0",
                        {
                            disabled: currentPage === lastPage,
                        }
                    )}
                    onClick={currentPage === lastPage ? undefined : onNext}
                    style={{ borderRadius: 0, margin: 0 }}
                >
                    <div className="arrow right">
                        <IoIosArrowForward />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;