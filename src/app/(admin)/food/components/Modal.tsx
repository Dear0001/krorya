import React, { useState } from "react";
import style from "@/app/style/recipe-form.module.css"

interface ModalProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onSubmit: (name: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, onClose, onSubmit }) => {
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (name.trim() === "") return;

        setIsSubmitting(true);
        await onSubmit(name);
        setIsSubmitting(false);

        setName(""); // Clear input
        onClose(); // Close modal
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-80">
                <label className="text-color-2 font-semibold mb-2.5 flex justify-start">
                    {title}
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${style.input} focus:outline-primary`}
                    placeholder={`បញ្ជូល ${title}`}
                />
                <div className="mt-6 text-center text-sm text-slate-600 flex justify-between">
                    <button
                        onClick={onClose}
                        className="btn border-primary py-2.5 rounded-md border bg-white hover:text-white hover:bg-primary hover:outline-amber-200 normal-case w-32 font-normal"
                    >
                        ថយក្រោយ
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="btn bg-primary py-2.5 rounded-md border-none text-white hover:bg-primary hover:outline-amber-200 normal-case w-32 font-normal"
                    >
                        {isSubmitting ? "កំពុងបង្កើត..." : `បង្កើត${title}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
