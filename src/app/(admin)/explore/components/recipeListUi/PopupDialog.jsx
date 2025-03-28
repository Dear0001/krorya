// PopupDialog.jsx
import React from "react";
import Link from "next/link";

const PopupDialog = ({ showModal, closeModal }) => {
  return (
    <dialog id="my_modal_3" className={`modal ${showModal ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <form method="dialog">
          <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-2xl text-center text-secondary">
          លោកអ្នកមិនទាន់គណនីនៅឡើយ
        </h3>
        <p className="py-4 text-center text-black">
          សូមធ្វើការចុះឈ្មោះជាមុនសិន
        </p>
        <div className="flex flex-col justify-center w-full gap-4 items-center">
          <Link href="/auth/signup" className="text-white text-center bg-primary w-[75%] py-4 rounded-lg">
            បង្កើតគណនី
          </Link>
          <Link href="/auth/signin" className="border border-primary text-center text-primary w-[75%] py-4 rounded-lg">
            ចូលគណនី
          </Link>
        </div>
      </div>
    </dialog>
  );
};

export default PopupDialog;
