// components/service/GridType4.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { FaUserFriends, FaCheck } from "react-icons/fa";

const GridType4 = ({ titleKey, itemsKey }) => {
  const { t } = useTranslation();
  // items: [{ title: "", text: "" }, ...]
  const items = t(itemsKey, { returnObjects: true }) || [];

  return (
    <section
      className="w-full rounded-2xl px-4 py-5 md:px-8 md:py-6 "
      style={{ backgroundColor: "var(--color-brand1)" }}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl flex bg-brand3/20 items-center justify-center flex-shrink-0">
          <FaUserFriends
            className="text-lg md:text-xl"
            style={{ color: "var(--color-brand3)" }}
          />
        </div>
        <h2 className="subheading font-semibold text-white">{t(titleKey)}</h2>
      </div>

      {/* Items grid */}
      <div className="grid gap-4 md:gap-5 md:grid-cols-2">
        {items.map((item, idx) => (
          <article
            key={idx}
            className="rounded-2xl px-4 py-3 md:px-5 md:py-4 flex items-start gap-3"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="mt-0.5 w-7 h-7 rounded-full flex items-center bg-brand3/20 justify-center flex-shrink-0">
              <FaCheck
                className="text-xs"
                style={{ color: "var(--color-brand3)" }}
              />
            </div>

            <div>
              <h3 className="base-text font-semibold text-white mb-1">
                {item.title}
              </h3>
              {item.text && (
                <p className="small-text leading-relaxed text-white/85">
                  {item.text}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default GridType4;
