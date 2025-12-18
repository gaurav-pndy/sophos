// components/service/StatsStrip.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const StatsStrip = ({ itemsKey }) => {
  const { t } = useTranslation();
  // items: [{ value: "500+", label: "..." }, ...]
  const items = t(itemsKey, { returnObjects: true }) || [];

  return (
    <section className="w-full ">
      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        {items.map((item, idx) => (
          <article
            key={idx}
            className="bg-white rounded-2xl border border-[#f3eee7] px-6 py-5 md:px-8 md:py-6 flex flex-col justify-center"
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
          </article>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;
