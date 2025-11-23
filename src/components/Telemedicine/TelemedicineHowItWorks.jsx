import React from "react";
import { useTranslation } from "react-i18next";

const STEPS = [
  {
    number: "01",
    titleKey: "telemedicine.howitworks.step1.title",
    descKey: "telemedicine.howitworks.step1.desc",
  },
  {
    number: "02",
    titleKey: "telemedicine.howitworks.step2.title",
    descKey: "telemedicine.howitworks.step2.desc",
  },
  {
    number: "03",
    titleKey: "telemedicine.howitworks.step3.title",
    descKey: "telemedicine.howitworks.step3.desc",
  },
  {
    number: "04",
    titleKey: "telemedicine.howitworks.step4.title",
    descKey: "telemedicine.howitworks.step4.desc",
  },
];

const TelemedicineHowItWorks = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-brand1 mx-auto text-center text-4xl md:text-5xl font-bold mb-6">
          {t("telemedicine.howitworks.header")}
        </h2>
        <p className="md:text-lg text-center text-brand1/80 mb-10 max-w-3xl mx-auto">
          {t("telemedicine.howitworks.subtitle")}
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 relative">
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center flex-1 px-2"
            >
              <div className="relative flex flex-col items-center mb-2 w-full">
                {/* Step circle */}
                <div className="w-16 z-10 h-16 bg-brand3 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2 shadow">
                  {step.number}
                </div>
                {/* Horizontal line (skip for last) */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-1/2 w-full border-t border-brand3/50 z-0" />
                )}
              </div>
              <div className=" text-xl font-semibold mb-2">
                {t(step.titleKey)}
              </div>
              <div className="text-brand1/70 text-base">{t(step.descKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TelemedicineHowItWorks;
