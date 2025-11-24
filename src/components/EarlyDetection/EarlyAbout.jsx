import React from "react";
import { useTranslation } from "react-i18next";
import { FaShieldAlt, FaUsers, FaHeartbeat, FaAward } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="text-3xl text-[#125e84]" />,
    title: "earlyDetection.about.evidenceTitle",
    desc: "earlyDetection.about.evidenceDesc",
  },
  {
    icon: <FaUsers className="text-3xl text-[#125e84]" />,
    title: "earlyDetection.about.teamTitle",
    desc: "earlyDetection.about.teamDesc",
  },
  {
    icon: <FaHeartbeat className="text-3xl text-[#125e84]" />,
    title: "earlyDetection.about.personalTitle",
    desc: "earlyDetection.about.personalDesc",
  },
  {
    icon: <FaAward className="text-3xl text-[#125e84]" />,
    title: "earlyDetection.about.experienceTitle",
    desc: "earlyDetection.about.experienceDesc",
  },
];

const EarlyAbout = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-[87rem] mx-auto py-6 px-4">
      <div className="max-w-[87rem] mx-auto px-4 flex flex-col md:flex-row items-center  gap-8 md:gap-16">
        {/* Left side: Text */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-brand1 text-[2rem] leading-10 font-bold mb-4">
            {t("earlyDetection.about.heading")}
          </h2>
          <p className="md:text-lg text-brand1/90">
            {" "}
            {t("earlyDetection.about.topText")}
          </p>
        </div>

        {/* Right side: Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <img
            src="/early-about.png"
            alt="Doctors illustration"
            className="mx-auto w-full max-h-80 rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="bg-brand1/10 p-4 mt-10 md:p-12 rounded-xl mb-10">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-bold text-[2rem] leading-10 text-brand2 mb-4">
            {t("earlyDetection.about.missionTitle")}
          </h3>
          <div className="text-brand1/90 text-base md:text-lg mb-4">
            {t("earlyDetection.about.missionText")}
          </div>
          <div className="text-brand2 font-semibold md:text-xl mt-2">
            {t("earlyDetection.about.missionHighlight")}
          </div>
        </div>
      </div>

      {/* Features icons row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10 ">
        {features.map((feat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl px-8 py-7 flex flex-col hover:scale-105 hover:bg-brand4/20 hover:shadow-lg cursor-pointer shadow-md transition-all duration-300 group"
          >
            <span className="flex items-center justify-center w-14 h-14 rounded-lg bg-brand1/30 mb-4">
              {feat.icon}
            </span>
            <div className="mt-2 mb-4 text-xl font-semibold text-black group-hover:text-brand2 transition-all duration-300 ">
              {t(feat.title)}
            </div>
            <div className="text-brand1 group-hover:text-brand2 transition-all duration-300 ">
              {t(feat.desc)}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-brand1/90  max-w-4xl mx-auto mt-10 text-xl leading-relaxed">
        {t("earlyDetection.about.bottomText")}
      </div>
    </section>
  );
};

export default EarlyAbout;
