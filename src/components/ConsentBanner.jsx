import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const accepted = localStorage.getItem("cookieConsentAccepted");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsentAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Popup dialog */}
      <div className="absolute z-50 top-20 left-1/2 translate-x-[-50%]  bg-white border border-brand4 shadow-black/70 shadow-2xl rounded-lg px-6 py-5 w-[95%] max-w-lg text-center flex flex-col items-center">
        <p className="text-lg  font-semibold text-brand1 mb-3">
          {t("cookie.message")}
          <Link
            to="/cookie-policy"
            target="_blank"
            className="underline text-blue-600 dark:text-blue-400"
          >
            {t("cookie.link")}
          </Link>
          .
        </p>
        <button
          onClick={handleAccept}
          className="bg-brand1 text-white font-semibold rounded-lg px-6 py-2 hover:bg-brand5 transition-all duration-300 cursor-pointer"
        >
          {t("cookie.accept")}
        </button>
      </div>
    </>
  );
};

export default ConsentBanner;
