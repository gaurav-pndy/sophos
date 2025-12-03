import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCalendarCheck } from "react-icons/fa";

const FloatingButton = ({ onClick }) => {
  const [overFooter, setOverFooter] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        setOverFooter(footerTop < window.innerHeight);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 z-40 w-fit right-6 px-4 py-2.5 base-text md:px-6 flex justify-center items-center gap-3 rounded-full font-semibold shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 ${
        overFooter
          ? "bg-white text-brand1 hover:bg-gray-200"
          : "bg-brand1 text-white hover:bg-brand5/90"
      }`}
    >
      <FaCalendarCheck className="text-2xl" />
      {/* Hide text on small screens, show on medium and above */}
      <span className="hidden md:inline">{t("header.bookAppointment")}</span>
    </button>
  );
};

export default FloatingButton;
