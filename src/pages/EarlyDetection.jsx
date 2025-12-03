import React from "react";
import HeroSection from "../components/EarlyDetection/HeroSection";
import EarlyAbout from "../components/EarlyDetection/EarlyAbout";
import EarlyWhy from "../components/EarlyDetection/EarlyWhy";
import OncoInsurance from "../components/EarlyDetection/OncoInsurance";
import { useTranslation } from "react-i18next";

const EarlyDetection = ({ setShowPopup }) => {
  const { t } = useTranslation();
  return (
    <div>
      <HeroSection />
      <EarlyAbout />
      <EarlyWhy />
      <OncoInsurance />
      <div className="flex w-full justify-center my-10">
        <button
          onClick={() => setShowPopup(true)}
          className="  bg-[#125e84] text-white px-10 py-2.5 base-text text-lg rounded-lg  hover:bg-brand5/90 cursor-pointer transition-all duration-300 whitespace-nowrap "
        >
          {t("earlyDetection.insurance.appointmentBtn")}
        </button>
      </div>
    </div>
  );
};

export default EarlyDetection;
