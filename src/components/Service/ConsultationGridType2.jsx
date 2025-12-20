// components/Service/ConsultationProceduresGrid.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeInUpStagger,
  hoverFloat,
} from "../../lib/motionVariants";

const ConsultationGridType2 = ({
  titleKey,
  itemsKey,
  imageSrc,
  imageAltKey,
  imageLeft = false,
}) => {
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

  const TextColumn = () => (
    <div className="w-full">
      <div className="grid gap-2">
        {items.map((raw, idx) => {
          const { title, text } = splitItem(raw);
          return (
            <motion.div
              key={idx}
              className="flex items-start hover:shadow-md transition-all duration-300 hover:scale-101 gap-3 rounded-xl px-4 py-3 md:px-5 md:py-4 bg-brand2/10"
              variants={fadeInUp}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="mt-0.5 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-brand3/20">
                <FaCheck
                  className="text-xs"
                  style={{ color: "var(--color-brand3)" }}
                />
              </div>
              <div
                className="base-text leading-snug"
                style={{ color: "var(--color-brand1)" }}
              >
                {title && <span className="font-semibold">{title}: </span>}
                <span className="small-text"> {text}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const ImageColumn = () => (
    <motion.div
      className="w-full flex h-full items-center justify-center"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={imageAltKey ? t(imageAltKey) : ""}
          className="w-full h-full max-h-52 md:max-h-80 lg:max-h-132 rounded-2xl object-cover shadow-sm"
        />
      )}
    </motion.div>
  );

  return (
    <section className="w-full">
      <motion.div
        className="rounded-2xl bg-white border border-[#f3eee7] p-4 md:p-6"
        variants={fadeInUpStagger}
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

        <div className="grid gap-6 lg:grid-cols-2 items-center">
          {imageLeft ? (
            <>
              <ImageColumn />
              <TextColumn />
            </>
          ) : (
            <>
              <TextColumn />
              <ImageColumn />
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default ConsultationGridType2;
