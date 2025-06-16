
import React, { useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    // const handleOutsideClick = (event) => {
    //   if (modalRef.current && !modalRef.current.contains(event.target)) {
    //     onClose();
    //   }
    // };

    // Close modal when pressing Escape key
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      // document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      // document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`w-full max-w-md rounded-lg bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-300 ${className}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
            aria-label="Close modal"
          >
            <MdClose className="h-5 w-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;