// components/service/GridType2.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";

const GridType2 = ({ titleKey, itemsKey }) => {
  const { t } = useTranslation();
  const items = t(itemsKey, { returnObjects: true }) || [];
  // items: simple array of strings

  return (
    <section className="w-full ">
      {/* Section heading */}

      <div className="rounded-2xl bg-white border border-[#f3eee7] p-4 md:p-6">
        <h2
          className="subheading font-semibold mb-6"
          style={{ color: "var(--color-brand1)" }}
        >
          {t(titleKey)}
        </h2>
        <div className="grid gap-3 md:gap-4 md:grid-cols-2">
          {items.map((text, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl px-4 py-3 md:px-5 md:py-4 bg-brand2/10"
              // brand2 tint
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
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridType2;
