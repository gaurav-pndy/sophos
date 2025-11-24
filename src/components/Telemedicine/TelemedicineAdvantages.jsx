import React from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe, FaVideo, FaClock, FaShieldAlt } from "react-icons/fa";

const ADVANTAGES = [
  {
    icon: <FaGlobe className="text-white text-3xl" />,
    titleKey: "telemedicine.advantages.intlExperts.title",
    descKey: "telemedicine.advantages.intlExperts.desc",
  },
  {
    icon: <FaVideo className="text-white text-3xl" />,
    titleKey: "telemedicine.advantages.onlineConsult.title",
    descKey: "telemedicine.advantages.onlineConsult.desc",
  },
  {
    icon: <FaClock className="text-white text-3xl" />,
    titleKey: "telemedicine.advantages.fastBooking.title",
    descKey: "telemedicine.advantages.fastBooking.desc",
  },
  {
    icon: <FaShieldAlt className="text-white text-3xl" />,
    titleKey: "telemedicine.advantages.confidentiality.title",
    descKey: "telemedicine.advantages.confidentiality.desc",
  },
];

const TelemedicineAdvantages = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-[#f6fcfd] py-6">
      <div className="max-w-[87rem] mx-auto px-4">
        <h2 className="text-brand1 text-[2rem] leading-10 text-center font-bold mb-8">
          {t("telemedicine.advantages.header")}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {ADVANTAGES.map((item, idx) => (
            <div
              key={item.titleKey}
              className="bg-white rounded-xl px-8 py-7 flex flex-col hover:scale-105 hover:bg-brand4/20 hover:shadow-lg cursor-pointer shadow-md transition-all duration-300 group"
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-lg bg-[#255b94] mb-4">
                {item.icon}
              </span>
              <div className="mt-2 mb-4 text-xl font-semibold text-black group-hover:text-brand2 transition-all duration-300 ">
                {t(item.titleKey)}
              </div>
              <div className="text-brand1 group-hover:text-brand2 transition-all duration-300 ">
                {t(item.descKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TelemedicineAdvantages;
