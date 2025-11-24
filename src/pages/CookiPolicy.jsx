import React from "react";
import { useTranslation } from "react-i18next";

const CookiPolicy = () => {
  const { t } = useTranslation();
  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl text-brand1 font-bold mb-4">
        {t("cookie.heading")}
      </h1>
      <p className="mb-6 text-brand3">{t("cookie.lastUpdated")}</p>

      <p className="mb-4 text-brand1 text-lg">{t("cookie.para1")}</p>

      <p className="mb-4 text-brand1 text-lg">{t("cookie.para2")}</p>

      <p className="mb-4 text-brand1 text-lg">{t("cookie.para3")}</p>

      <p className="mb-4 text-brand1 text-lg">{t("cookie.para4")}</p>

      <p className="mb-4 font-semibold text-xl text-brand1 ">
        {t("cookie.footer")}
      </p>
    </main>
  );
};

export default CookiPolicy;
