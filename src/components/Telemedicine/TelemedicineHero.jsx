import React from "react";
import { useTranslation } from "react-i18next";
import { FaUserMd, FaStethoscope, FaClock, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import WaveBackground from "../WaveBackground";

const TelemedicineHero = ({ setShowPopup }) => {
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 1, // delay between each stat
        repeat: Infinity, // loop the animation
        repeatDelay: 2, // wait before repeating
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 4,
      },
    },
  };

  return (
    <section className="relative max-w-[87rem] rounded-xl mx-auto grid md:grid-cols-2 items-center mt-20 lg:mt-52 overflow-hidden md:min-h-80">
      <WaveBackground
        stroke="rgb(33, 139, 161,"
        custStyle="md:w-1/2 h-1/2 left-0 top-0"
      />

      {/* LEFT SIDE */}
      <div className="w-full md:min-h-80 flex flex-col justify-center h-full p-6 pb-16 md:p-6 lg:p-10 xl:p-12 bg-gradient-to-b md:bg-gradient-to-r from-brand1 to-[#8abfcf]">
        <h1 className="text-white relative z-40 text-3xl md:text-5xl xl:text-6xl font-bold mb-4">
          {t("telemedicine.hero.titleLine1")}
          <br />
          <span>{t("telemedicine.hero.titleLine2")}</span>
        </h1>

        <p className="text-white relative z-40 text-lg md:text-xl font-medium mb-6 drop-shadow">
          {t("telemedicine.hero.subtitle")}
        </p>

        <div className="flex flex-col md:flex-row md:justify-start gap-4">
          <button
            onClick={() => setShowPopup(true)}
            className="flex relative z-40 items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-lg bg-white text-brand1 font-medium hover:text-white hover:bg-transparent cursor-pointer transition-all duration-300 border border-white"
          >
            {t("telemedicine.hero.ctaConsult")}
            <FaArrowRight className="ml-2" />
          </button>
          <button className="flex relative z-40 items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-lg border border-white text-white font-medium bg-transparent hover:bg-white hover:text-brand1 transition-all duration-300 cursor-pointer">
            {t("telemedicine.hero.ctaMore")}
          </button>
        </div>

        {/* 🌟 Animated Stats */}
        <motion.div
          className="flex flex-col xl:flex-row items-center justify-between mt-6 gap-1 "
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center leading-5 gap-2 text-white/90  text-lg  font-semibold"
          >
            <FaUserMd className="text-white text-xl" />
            50+ {t("telemedicine.hero.stats.experts")}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 leading-5 text-white/90  text-lg  font-semibold"
          >
            <FaStethoscope className="text-white text-xl" />
            40+ {t("telemedicine.hero.stats.specialties")}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 leading-5 text-white/90 text-lg   font-semibold"
          >
            <FaClock className="text-white text-xl" />
            {t("telemedicine.hero.stats.time")}
          </motion.div>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full h-full z-30 -mt-[3px] md:-mt-0">
        <div className="relative w-full h-full">
          <img
            src="https://www.shutterstock.com/shutterstock/photos/2560873155/display_1500/stock-photo-doctor-holding-glowing-globe-in-hand-with-a-medical-theme-background-symbolizing-global-2560873155.jpg"
            alt="Services illustration"
            className="w-full md:min-h-80 h-full object-cover md:rounded-tr-2xl md:rounded-br-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-b via-30% md:bg-gradient-to-r from-[#8abfcf] via-[#8abfcf]/40 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default TelemedicineHero;
