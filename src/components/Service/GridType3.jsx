// components/service/GridType3.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const GridType3 = ({ titleKey, stepsKey }) => {
  const { t } = useTranslation();
  // steps: [{ title: "", text: "" }, ...]
  const steps = t(stepsKey, { returnObjects: true }) || [];

  return (
    <section className="w-full">
      <div className="rounded-2xl bg-white border border-[#f3eee7] px-4 py-5 md:px-8 md:py-6">
        {/* Heading */}
        <h2
          className="subheading font-semibold mb-6"
          style={{ color: "var(--color-brand1)" }}
        >
          {t(titleKey)}
        </h2>

        {/* Steps row */}
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridType3;
