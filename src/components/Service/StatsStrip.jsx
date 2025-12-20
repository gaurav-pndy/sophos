// StatsStrip.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInUpStagger,
  hoverFloat,
} from "../../lib/motionVariants";

const StatsStrip = ({ itemsKey }) => {
  const { t } = useTranslation();
  const items = t(itemsKey, { returnObjects: true }) || [];

  return (
    <section className="w-full">
      <motion.div
        className="grid gap-4 md:gap-6 md:grid-cols-3"
        variants={fadeInUpStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {items.map((item, idx) => (
          <motion.article
            key={idx}
            className="bg-white rounded-2xl border border-[#f3eee7] px-6 py-5 md:px-8 md:py-6 flex flex-col justify-center"
            variants={fadeInUp}
            whileHover="hover"
            initial="rest"
            animate="rest"
            transition={{ duration: 0.25, ease: "easeOut" }}
            {...{ variants: hoverFloat }}
          >
            <div
              className="heading1 font-bold mb-1"
              style={{ color: "var(--color-brand3)" }}
            >
              {item.value}
            </div>
            <div className="base-text" style={{ color: "var(--color-brand1)" }}>
              {item.label}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default StatsStrip;
