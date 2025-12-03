import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import WaveBackground from "../WaveBackground";

const HeroSection = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const features = [
    t("earlyDetection.hero.benefit1"),
    t("earlyDetection.hero.benefit2"),
    t("earlyDetection.hero.benefit3"),
  ];

  // Cycle through features every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="relative max-w-[87rem]  rounded-xl mx-auto grid md:grid-cols-2 items-center mt-20 lg:mt-52 overflow-hidden md:min-h-80">
      <WaveBackground
        stroke="rgb(33, 139, 161,"
        custStyle="md:w-1/2 h-1/2 left-0 top-0"
      />

      {/* Rest of your content */}
      <div
        className={` w-full md:min-h-80 flex flex-col justify-center h-full  p-6 pb-16 md:p-6 lg:p-10 xl:p-12 bg-gradient-to-b md:bg-gradient-to-r from-[#0d7431] to-[#e2cfc8]  `}
      >
        <div className="flex justify-center z-40 md:justify-start">
          <span className="flex items-center gap-2 px-6 py-2 small-text rounded-full bg-[#c4c1af] text-white shadow">
            {t("earlyDetection.hero.programBadge")}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-white heading1 relative z-40  font-bold mb-4">
          {t("earlyDetection.hero.title")}
        </h1>

        {/* ✨ Animated feature slideshow */}
        <div className="relative h-4 w-full z-40 text-center md:h-6 mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute  mx-auto  w-full text-center  md:text-left text-[#e8dcda] drop-shadow-lg drop-shadow-black/30 subheading font-semibold"
            >
              {features[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtitle + Description */}
        <div className="text-white subheading z-40  font-medium mb-2 drop-shadow">
          {t("earlyDetection.hero.subtitle")}
        </div>
        <div className="text-white/90 base-text z-40 font-normal max-w-2xl mx-auto mb-6 drop-shadow">
          {t("earlyDetection.hero.description")}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6  justify-center md:justify-start">
          <button className="bg-white text-brand1 z-40 font-semibold px-8 py-2.5 base-text  rounded-lg hover:bg-transparent hover:text-white transition shadow cursor-pointer border border-white">
            {t("earlyDetection.hero.programButton")}
          </button>
          {/*
          <button className="bg-transparent text-white z-40 font-semibold px-8 py-3  rounded-lg hover:bg-white hover:text-brand1 transition shadow cursor-pointer border border-white">
            {t("earlyDetection.hero.moreButton")}
          </button>
          */}
        </div>
      </div>

      <div className="w-full   h-full z-30 -mt-[3px] md:-mt-0">
        <div className="relative w-full  h-full">
          <img
            src="https://www.shutterstock.com/shutterstock/photos/2056742117/display_1500/stock-photo-hiring-recruitment-design-find-job-hire-medical-doctor-nurse-pharmacist-retirement-hand-2056742117.jpg"
            alt="Services illustration"
            className=" w-full md:min-h-80   h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
          />
          <div
            className={`absolute   inset-0 bg-gradient-to-b via-30%  md:bg-gradient-to-r from-[#e2cfc8] via-[#e2cfc8]/40 to-transparent  `}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
