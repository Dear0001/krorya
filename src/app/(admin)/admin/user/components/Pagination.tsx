import React from "react";
import classnames from "classnames";
import {DOTS, usePagination} from "@/app/(admin)/admin/user/components/UsePagination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = (props: { onPageChange: any; totalCount: any; siblingCount?: 1 | undefined; currentPage: any; pageSize: any; className: any; }) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
    } = props;


    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    // Calculate start and end index
    const startIndex = (currentPage - 1) * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, totalCount);

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <div className="pagination-wrapper flex items-center justify-between border-t-2 mt-4">
            <div className="results-info text-sm mt-4">
                Showing {startIndex} to {endIndex} of {totalCount} results
            </div>
            <ul
                className={classnames(
                    "pagination-container",
                    "my-custom-class rounded-md border border-gray-300",
                    { [className]: className }
                )}
            >
                <li
                    className={classnames(
                        "pagination-item rounded-none border-r border-gray-300 w-10 h-10 flex items-center justify-center m-0",
                        {
                            disabled: currentPage === 1,
                            "pointer-events-none": currentPage === 1,  // Disable click event when at the first page
                        }
                    )}
                    style={{ borderRadius: 0, margin: 0 }}
                    onClick={onPrevious}
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
                                        pageNumber === currentPage, // Highlight active item
                                    border: pageNumber === currentPage, // Add border to the active item
                                    "border-primary text-primary": pageNumber === currentPage, // Specific border color for the active item
                                }
                            )}
                            style={{ borderRadius: 0, margin: 0 }}
                            onClick={() => onPageChange(pageNumber)}
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
                            "pointer-events-none": currentPage === lastPage,  // Disable click event when at the last page
                        }
                    )}
                    onClick={onNext}
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
