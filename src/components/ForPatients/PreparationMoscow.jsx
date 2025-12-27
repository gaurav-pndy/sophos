import React from "react";
import { useTranslation } from "react-i18next";

const PreparationMoscow = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-white rounded-2xl border border-[#f3eee7] p-6 md:p-8 shadow-lg">
      <h2
        className="subheading font-semibold mb-6"
        style={{ color: "var(--color-brand1)" }}
      >
        {t("ultrasound.prepTitle")}
      </h2>
      <p className="base-text text-gray-700 mb-6">
        {t("ultrasound.prepIntro")}
      </p>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-brand2/10 rounded-xl">
          <div className="w-2 h-2 bg-brand1 rounded-full mt-2 flex-shrink-0" />
          <p
            className="base-text text-gray-700 flex-1"
            dangerouslySetInnerHTML={{
              __html: t("ultrasound.prepAbdominal"),
            }}
          ></p>
        </div>
        <div className="flex items-start gap-3 p-4 bg-brand2/10 rounded-xl">
          <div className="w-2 h-2 bg-brand1 rounded-full mt-2 flex-shrink-0" />
          <p
            className="base-text text-gray-700 flex-1"
            dangerouslySetInnerHTML={{
              __html: t("ultrasound.prepPelvis"),
            }}
          ></p>
        </div>
        <div className="flex items-start gap-3 p-4 bg-brand2/10 rounded-xl">
          <div className="w-2 h-2 bg-brand1 rounded-full mt-2 flex-shrink-0" />
          <p
            className="base-text text-gray-700 flex-1"
            dangerouslySetInnerHTML={{
              __html: t("ultrasound.prepBreast"),
            }}
          ></p>
        </div>

        <div className="flex items-start gap-3 p-4 bg-brand2/10 rounded-xl">
          <div className="w-2 h-2 bg-brand1 rounded-full mt-2 flex-shrink-0" />
          <p
            className="base-text text-gray-700 flex-1"
            dangerouslySetInnerHTML={{
              __html: t("ultrasound.prepLymph"),
            }}
          ></p>
        </div>
        <div className="flex items-start gap-3 p-4 bg-brand2/10 rounded-xl">
          <div className="w-2 h-2 bg-brand1 rounded-full mt-2 flex-shrink-0" />
          <p
            className="base-text text-gray-700 flex-1"
            dangerouslySetInnerHTML={{
              __html: t("ultrasound.prepVessels"),
            }}
          ></p>
        </div>
      </div>
    </section>
  );
};

export default PreparationMoscow;
