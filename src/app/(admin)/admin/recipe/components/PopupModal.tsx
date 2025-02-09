"use client";
import React, { useState } from "react";

const PopupModal = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            {/* Button to Show Modal */}
            <button
                className="bg-primary text-white px-4 py-2 rounded-lg"
                onClick={toggleModal}
            >
                Show Error Popup
            </button>

            {/* Modal */}
            <div
                className={`fixed z-10 inset-0 overflow-y-auto ${showModal ? "" : "hidden"}`}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
                    <div
                        className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div>
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                <svg
                                    className="h-6 w-6 text-red-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <h3 className="text-lg leading-6 font-medium text-red-500">
                                    បរាជ័យ
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-red-500">
                                        មានបញ្ហាក្នុងការធ្វើប្រតិបត្តិ។ សូមព្យាយាមម្ដងទៀត!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:text-sm"
                                onClick={toggleModal}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopupModal;
