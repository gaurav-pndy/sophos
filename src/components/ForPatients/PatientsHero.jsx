import React from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const PatientsHero = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full min-h-[40vh] py-20 md:py-24 flex flex-col items-center justify-center text-center relative bg-gradient-to-br from-brand5 to-brand1">
      <h1 className="text-white heading1 font-bold mb-4 ">
        {t("forPatients.hero.title")}
      </h1>
      <p className="text-white base-text font-medium mb-2 drop-shadow">
        {t("forPatients.hero.subtitle")}
      </p>
      <div className="flex flex-col md:flex-row gap-6 md:gap-6 justify-center mt-10">
        <div className="flex items-center gap-3 px-8 py-4 bg-white/15 border border-white/40 rounded-2xl text-white text-lg font-normal backdrop-blur shadow transition">
          <FaPhoneAlt className="text-2xl text-white" />
          <span>+7 (495) 123-45-67</span>
        </div>
        <div className="flex items-center gap-3 px-8 py-4 bg-white/15 border border-white/40 rounded-2xl text-white text-lg font-normal backdrop-blur shadow transition">
          <FaEnvelope className="text-2xl text-white" />
          <span>info@hdmc.info</span>
        </div>
        <div className="flex items-center gap-3 px-8 py-4 bg-white/15 border border-white/40 rounded-2xl text-white text-lg font-normal backdrop-blur shadow transition">
          <FaMapMarkerAlt className="text-2xl text-white" />
          <span>{t("forPatients.hero.address")}</span>
        </div>
      </div>
    </section>
  );
};

export default PatientsHero;
