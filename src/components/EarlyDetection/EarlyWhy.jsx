import React from "react";
import { useTranslation } from "react-i18next";
import { FaClock, FaDollarSign, FaHeartbeat, FaArrowUp } from "react-icons/fa";

const stats = [
  {
    icon: <FaClock className="text-[#125e84] text-xl" />,
    title: "earlyDetection.why.timeTitle",
    desc: "earlyDetection.why.timeDesc",
  },
  {
    icon: <FaDollarSign className="text-[#125e84] text-xl" />,
    title: "earlyDetection.why.moneyTitle",
    desc: "earlyDetection.why.moneyDesc",
  },
  {
    icon: <FaHeartbeat className="text-[#125e84] text-xl" />,
    title: "earlyDetection.why.qualityTitle",
    desc: "earlyDetection.why.qualityDesc",
  },
  {
    icon: <FaArrowUp className="text-[#125e84] text-xl" />,
    title: "earlyDetection.why.prognosisTitle",
    desc: "earlyDetection.why.prognosisDesc",
  },
];

const EarlyWhy = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-[87rem] mx-auto px-4 py-6 flex flex-col md:flex-row gap-12 md:gap-16 items-center">
      {/* Left: Image and stat card */}
      <div className="relative w-full max-w-2xl flex-shrink-0">
        <img
          src="/early-doctors.jpg"
          alt=""
          className="rounded-2xl shadow-xl w-full h-auto object-cover"
        />
        <div className="absolute -right-5 -bottom-7 bg-brand3 px-8 py-7 rounded-xl  text-white text-2xl  flex flex-col items-start max-w-xs drop-shadow-xl">
          <span className="text-4xl font-bold">15+</span>
          <span className="text-white/80 text-sm md:text-base mt-1">
            {t("earlyDetection.why.statText")}
          </span>
        </div>
      </div>
      {/* Right: Content */}
      <div className="flex-1 flex flex-col items-start max-w-2xl">
        <h2 className="text-brand1  text-[2rem] leading-10 font-bold mb-4 ">
          {t("earlyDetection.why.heading")}
        </h2>
        <div className="md:text-lg text-brand1/80 mb-8 max-w-3xl mx-auto">
          {t("earlyDetection.why.preamble")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 mb-10 w-full">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl  flex flex-col hover:scale-105  cursor-pointer  transition-all duration-300 group"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand1/30 mb-2">
                {s.icon}
              </span>
              <div>
                <div className="font-semibold text-black group-hover:text-brand2 transition-all duration-300 mb-1">
                  {t(s.title)}
                </div>
                <div className="text-brand1 group-hover:text-brand2 transition-all duration-300 text-sm">
                  {t(s.desc)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-brand1/10 p-4 md:p-6 rounded-xl font-semibold text-brand2 text-base mt-2">
          {t("earlyDetection.why.important")}
        </div>
      </div>
    </section>
  );
};

export default EarlyWhy;
