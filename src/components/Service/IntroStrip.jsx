// components/service/IntroStrip.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosOptions } from "react-icons/io"; // you can swap icon if needed
import { LuTarget } from "react-icons/lu";
import { motion } from "framer-motion";
import { fadeInUp } from "../../lib/motionVariants";

const IntroStrip = ({ titleKey, textKey }) => {
  const { t } = useTranslation();

  return (
    <motion.section
      className="w-full rounded-2xl px-4 py-5 md:px-8 md:py-6"
      style={{ backgroundColor: "var(--color-brand1)" }}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-col md:flex-row items-start gap-4">
        {/* Icon badge */}
        <div className="flex-shrink-0 w-14 h-14   rounded-lg flex items-center justify-center bg-brand3/20">
          <LuTarget
            className="text-2xl md:text-3xl"
            style={{ color: "var(--color-brand3)" }}
          />
        </div>

        {/* Text */}
        <div className="flex-1">
          {titleKey && (
            <h2
              className="subheading font-semibold mb-2"
              style={{ color: "#ffffff" }}
            >
              {t(titleKey)}
            </h2>
          )}

          <p className="base-text leading-relaxed" style={{ color: "#f9fafb" }}>
            {t(textKey)}
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default IntroStrip;
