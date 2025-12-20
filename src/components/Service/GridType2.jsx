// components/service/GridType2.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const GridType2 = ({ titleKey, itemsKey }) => {
  const { t } = useTranslation();
  const items = t(itemsKey, { returnObjects: true }) || [];

  const splitItem = (raw) => {
    if (typeof raw !== "string") return { title: "", text: String(raw || "") };

    const idx = raw.indexOf(":");
    if (idx === -1) return { title: "", text: raw.trim() };

    const title = raw.slice(0, idx).trim();
    const text = raw.slice(idx + 1).trim();
    return { title, text };
  };

  return (
    <section className="w-full">
      <motion.div
        className="rounded-2xl bg-white border border-[#f3eee7] p-4 md:p-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2
          className="subheading text-center font-semibold mb-6"
          style={{ color: "var(--color-brand1)" }}
        >
          {t(titleKey)}
        </h2>

        <motion.div
          className="grid gap-3 md:gap-4 md:grid-cols-2"
          variants={containerVariants}
        >
          {items.map((raw, idx) => {
            const { title, text } = splitItem(raw);

            return (
              <motion.div
                key={idx}
                className="flex items-start gap-3 rounded-xl px-4 py-3 md:px-5 md:py-4 bg-brand2/10"
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="mt-0.5 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-brand3/20">
                  <FaCheck
                    className="text-xs"
                    style={{ color: "var(--color-brand3)" }}
                  />
                </div>

                <p
                  className="base-text leading-snug"
                  style={{ color: "var(--color-brand1)" }}
                >
                  {title && <span className="font-semibold">{title}: </span>}
                  {text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GridType2;
