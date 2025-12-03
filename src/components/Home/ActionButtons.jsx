import React from "react";
import { useTranslation } from "react-i18next";
import { FaCalendarCheck, FaPhoneAlt, FaRegSmile } from "react-icons/fa";
import { Link } from "react-router-dom";

const ActionButtons = ({ setShowPopup }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full  bg-gray-300 py-5 px-4">
      <div className="flex flex-wrap gap-5 justify-between max-w-7xl mx-auto">
        {/* Book an appointment */}
        <button
          onClick={() => setShowPopup(true)}
          className="
        flex items-center gap-2 w-full md:w-fit
        px-8 py-3 
        bg-brand1
        text-white
        text-lg font-semibold
        rounded-xl
        shadow
        hover:bg-brand5/90
        transition-all duration-300 cursor-pointer
        border-none
        focus:outline-none
      "
        >
          <FaCalendarCheck />
          {t("actionBtns.btn1")}
        </button>
        {/* Hotline/Feedback */}
        <Link
          to={"/leave-a-feedback"}
          className="
        flex items-center gap-2 w-full md:w-fit
        px-8 py-3 
        bg-white
        bg-opacity-20
        border border-white border-opacity-40
        text-brand1
        text-lg font-semibold
        rounded-xl
        hover:bg-brand4/10
        transition-all duration-300 cursor-pointer
        focus:outline-none
      "
        >
          <FaPhoneAlt />
          {t("actionBtns.btn2")}{" "}
        </Link>
        <Link
          to="/thank-you-hdmc"
          className="
        flex items-center gap-2 w-full  md:w-fit
        px-8 py-3
        bg-brand2
        border-none
        text-white
        text-lg font-semibold
        rounded-xl
        hover:bg-brand2/60
        transition-all duration-300 cursor-pointer
        focus:outline-none
      "
        >
          <FaRegSmile />
          {t("actionBtns.btn3")}{" "}
        </Link>
      </div>
    </div>
  );
};

export default ActionButtons;
