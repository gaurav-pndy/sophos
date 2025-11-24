import React from "react";
import WaveBackground from "../WaveBackground";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="relative max-w-[87rem] rounded-xl mx-auto grid md:grid-cols-2 items-center mt-20 lg:mt-52 overflow-hidden md:min-h-80">
      <WaveBackground
        stroke="rgb(33, 139, 161,"
        custStyle="md:w-1/2 h-1/2 left-0 top-0"
      />
      <div
        className={` w-full md:min-h-80 flex flex-col justify-center h-full  p-6 pb-16 md:p-6 lg:p-10 xl:p-12 bg-gradient-to-b md:bg-gradient-to-r from-brand1 to-[#abb0b6] `}
      >
        <h1 className="text-white relative z-40 text-4xl md:text-5xl xl:text-6xl font-bold mb-4 ">
          {t("care.title")}
        </h1>
      </div>
      <div className="w-full   h-full z-30 -mt-[3px] md:-mt-0">
        <div className="relative w-full  h-full">
          <img
            src="/onco-care.avif"
            alt="Services illustration"
            className=" w-full md:min-h-80  max-h-96 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
          />
          <div
            className={`absolute   inset-0 bg-gradient-to-b via-30%  md:bg-gradient-to-r from-[#abb0b6] via-[#abb0b6]/40 to-transparent  `}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
