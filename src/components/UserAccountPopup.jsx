import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const UserAccountPopup = ({ show, onClose }) => {
  // Prevent scrolling when popup is open
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm "
      onClick={onClose}
    >
      {/* Popup Container */}
      <div className="bg-white rounded-xl w-[95%] max-w-3xl overflow-hidden shadow-2xl pt-12 relative animate-[popup_0.25s_ease]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer  rounded-full"
        >
          <IoClose size={24} />
        </button>

        {/* Iframe */}
        <iframe
          src="https://app.1denta.ru/booking/booking?orgid=22284&networkid=767#/auth"
          className="w-full h-[70vh] md:h-[80vh]"
          //   loading="lazy"
          title="Booking Widget"
          allow="camera; microphone"
        />
      </div>

      {/* Popup Animation Keyframe */}
      <style>{`
        @keyframes popup {
          0% { transform: scale(0.85); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default UserAccountPopup;
