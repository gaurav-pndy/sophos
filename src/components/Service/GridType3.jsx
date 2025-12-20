// components/service/GridType3.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeInUp, fadeInUpStagger } from "../../lib/motionVariants";

const GridType3 = ({ titleKey, stepsKey }) => {
  const { t } = useTranslation();
  // steps: [{ title: "", text: "" }, ...]
  const steps = t(stepsKey, { returnObjects: true }) || [];

  return (
    <section className="w-full">
      <motion.div
        className="rounded-2xl bg-white border border-[#f3eee7] px-4 py-5 md:px-8 md:py-6"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.h2
          className="subheading text-center font-semibold mb-6"
          style={{ color: "var(--color-brand1)" }}
          variants={fadeInUp}
        >
          {t(titleKey)}
        </motion.h2>

        {/* Steps row */}
        <motion.div
          className="grid gap-6 md:grid-cols-4"
          variants={fadeInUpStagger}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-3"
              variants={fadeInUp}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Number circle */}
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full flex bg-brand3/20 items-center justify-center flex-shrink-0">
                <span
                  className="font-semibold base-text"
                  style={{ color: "var(--color-brand3)" }}
                >
                  {index + 1}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3
                  className="base-text font-semibold mb-1"
                  style={{ color: "var(--color-brand1)" }}
                >
                  {step.title}
                </h3>
                {step.text && (
                  <p
                    className="small-text leading-relaxed"
                    style={{ color: "#4b5563" }}
                  >
                    {step.text}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GridType3;
